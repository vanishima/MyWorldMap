import { useState, useEffect } from "react";

import Layout from "../components/Layout";

// API
import fetchLabelCounts from "../components/utils/fetchLabelCounts";

const Home = () => {
  const [labelCounts, setLabelCounts] = useState(null);

  useEffect(() => {
    fetchLabelCounts(setLabelCounts);
  }, []);

  console.log("============ labelCounts", labelCounts);

  return (
    <Layout>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-4">
            <h1 style={{ color: "var(--darkRed)" }}>
              Welcome to My World Map App
            </h1>
            <h2>My tags</h2>
            <ul>
              {labelCounts &&
                labelCounts.map((label, i) => (
                  <li key={i}>
                    <span style={{ color: label.color, fontSize: "18px" }}>
                      {label.label}
                    </span>{" "}
                    {label.count ? label.count : "unknown"} posts
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-8">
            {/*<img
              style={{width: "100%"}}
              src="https://github.com/vanishima/MyWorldMap/blob/main/demo/interactive-map.gif?raw=true"
              alt="map demo"
            ></img>*/}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
