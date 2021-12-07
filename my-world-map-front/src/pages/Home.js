import { useState, useEffect } from "react";

import Layout from "../components/Layout";

// API
// import fetchLabels from "../components/utils/fetchLabels";
import fetchLabelCounts from "../components/utils/fetchLabelCounts";

const Home = () => {
  // const [labels, setLabels] = useState(null);
  const [labelCounts, setLabelCounts] = useState(null);

  useEffect(() => {
    // fetchLabels(setLabels);
    fetchLabelCounts(setLabelCounts);
  }, []);

  console.log("============ labelCounts", labelCounts);

  return (
    <Layout>
      <div className="container">
        <br/>
        <div className="row">
          <div className="col-4">
            <h3>Welcome to My World Map App</h3>
            <h5>My tags</h5>
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
            <img
              className="fit-content"
              src="https://github.com/vanishima/MyWorldMap/blob/main/demo/interactive-map.gif?raw=true"
              alt="map demo"
            ></img>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
