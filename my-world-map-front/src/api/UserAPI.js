const FRONTEND =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_FRONTEND_PREFIX
    : "";

function UserAPI() {
  const User = {};

  User.login = async (credentials) => {
    return fetch(FRONTEND + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(credentials),
    });
  };

  User.register = async (user) => {
    return fetch(FRONTEND + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    });
  };

  User.addLabel = async (label) => {
    return fetch(FRONTEND + "/auth/newlabel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify({ label: label }),
    });
  };

  // User.incrementLabel = async (label, num) => {
  //   return fetch(FRONTEND + "/auth/incrLabel", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-token": localStorage.getItem("token"),
  //     },
  //     mode: "cors",
  //     body: JSON.stringify({ label: label, num: num }),
  //   });
  // }

  User.getLabelCounts = async ()=> {
    console.log("UserAPI.getLabelCounts");
    // if logged in, get lable counts belonged to user
    if (localStorage.getItem("token")){
      return fetch(FRONTEND + "/auth/labelCounts", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        mode: "cors",
      });
    // get public labels
    } else {
      return fetch(FRONTEND + "/posts/public/labels");
    }
    
  }

  return User;
}

export default UserAPI();
