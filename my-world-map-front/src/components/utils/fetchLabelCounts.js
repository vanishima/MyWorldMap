import UserAPI from "../../api/UserAPI";

async function getLabelCounts(setLabelCounts) {
  const resRaw = await UserAPI.getLabelCounts();

  console.log("getLabelCounts", resRaw);
  if (resRaw.ok) {
    const res = await resRaw.json();
    const labelCounts = await res.labelCounts;
    setLabelCounts(labelCounts);
  }
}

export default getLabelCounts;
