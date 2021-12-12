import myAuth from "../../authStatus";
import PostsAPI from "../../api/PostsAPI";

async function drawLabels(setLabels) {
  const resRaw = await myAuth.verifyAuth();

  // console.log("drawLabels", resRaw);
  if (resRaw.valid) {
    const labels_list = await resRaw.user.labels;
    setLabels(labels_list);
  } else {
    const resRaw = await PostsAPI.getPublicLabelCounts();
    console.log("getPublicLabelCounts", resRaw);
    if (resRaw.ok) {
      const res = await resRaw.json();
      const labelCounts = await res.labels;
      console.log("labelCounts", labelCounts);
      console.log("getPublicLabelCounts", labelCounts);
      setLabels(labelCounts);
    }
    
    // setLabels(labels_list);
  }
  // console.groupEnd();
}

export default drawLabels;
