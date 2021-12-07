const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function UserDB() {
  const myDB = {};
  const DB_NAME = "myworldmap";
  const uri = process.env.MONGO_URI;
  const COL_NAME_USER = "Users";

  myDB.findOne = async (query = {}) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    console.group("Connecting to the db");

    try {
      await client.connect();
      console.log("Connected");

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      console.log(COL_NAME_USER, "Collection ready, findOne:", query);

      const user = await col.findOne(query);

      console.groupEnd("Found", user);

      return user;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.getLabelCounts = async (user_id) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    console.group("Connecting to the db");

    try {
      await client.connect();
      console.log("Connected");

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      console.log(COL_NAME_USER, "Collection ready, getLabelCounts:", user_id);

      const labelCount = await col
        .aggregate([
          {
            $match: { _id: ObjectId(user_id) },
          },
          {
            $lookup: {
              from: "Posts",
              pipeline: [
                {
                  $match: {
                    "author.id": ObjectId(user_id),
                  },
                },
                {
                  $project: {
                    label: 1,
                  },
                },
              ],
              as: "labelCount",
            },
          },
          {
            $unwind: {
              path: "$labelCount",
            },
          },
          {
            $group: {
              _id: "$labelCount.label.value",
              count: {
                $sum: 1,
              },
              label: { $first: "$labelCount.label.label" },
              value: { $first: "$labelCount.label.value" },
              color: { $first: "$labelCount.label.color" },
            },
          },
          { $sort: { count: -1 } },
        ])
        .toArray();

      console.log("result:", labelCount);

      return labelCount;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.getUserById = async (query = {}) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    console.group("Connecting to the db");

    try {
      await client.connect();
      console.log("Connected");

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      console.log(COL_NAME_USER, "Collection ready, getUserById:", query);

      const user = await col.findOne(query, { _id: 1, name: 1, email: 1 });
      console.groupEnd("Found:", user);

      return user;
    } finally {
      console.groupEnd("Closing the connection");
      client.close();
    }
  };

  myDB.createOne = async (user) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    // console.log("Connecting to the db");

    try {
      await client.connect();
      // console.log("Connected");

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      console.log(COL_NAME_USER, "Collection ready, createOne:", user);

      const res = await col.insertOne(user);
      // console.log("Inserted", res);

      return res;
    } finally {
      // console.log("Closing the connection");
      client.close();
    }
  };

  myDB.createLabel = async (user_id, newLabel) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    console.group("UserDB.createLabel");
    try {
      await client.connect();

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      newLabel.count = 0;
      console.log(
        COL_NAME_USER,
        "Collection ready, create label for:",
        newLabel + " user:" + user_id
      );

      const res = await col.updateOne(
        { _id: ObjectId(user_id) },
        {
          $push: {
            labels: newLabel,
          },
        }
      );
      console.log("Inserted", res);
      console.groupEnd();
      return res;
    } finally {
      client.close();
    }
  };

  myDB.incrementLabel = async (user_id, label, num) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    console.group("UserDB.incrementLabel");
    try {
      await client.connect();

      const col = client.db(DB_NAME).collection(COL_NAME_USER);
      console.log(
        COL_NAME_USER,
        "Collection ready, increment label for:",
        label + " by " + num + " user:" + user_id
      );

      const res = await col.updateOne(
        { _id: ObjectId(user_id), labels: { $elemMatch: { value: label } } },
        {
          $inc: {
            "labels.$.count": num,
          },
        }
      );
      console.log("incremented", res);
      console.groupEnd();
      return res;
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = UserDB();
