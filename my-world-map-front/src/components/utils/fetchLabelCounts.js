import UserAPI from "../../api/UserAPI";

async function getLabelCounts(setLabels) {
  const resRaw = await UserAPI.getLabelCounts();

  console.log("getLabelCounts", resRaw);
  if (resRaw.ok) {
    const res = await resRaw.json();
    const labelCounts = await res.labels;
    setLabels(labelCounts);
  }
}

export default getLabelCounts;
