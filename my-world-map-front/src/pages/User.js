import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fetchLabelCounts from "../components/utils/fetchLabelCounts";

const User = () => {
  const [labelCounts, setLabelCounts] = useState(null);

  useEffect(() => {
    fetchLabelCounts(setLabelCounts);
  }, []);

  const handleLabelClick = (label) => {
    console.log(`${label.label} clicked`);
  };

  return (
    <Layout>
      <div className="container">
        <h1>User's page</h1>
        <h2>My tags</h2>
        <div>
          {labelCounts &&
            labelCounts.map((label, i) => (
              <button
                key={i}
                className="btn"
                onClick={() => handleLabelClick(label)}
              >
                <span style={{ fontSize: "18px" }}>{label.label}</span> (
                {label.count ? label.count : "0"})
              </button>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default User;
