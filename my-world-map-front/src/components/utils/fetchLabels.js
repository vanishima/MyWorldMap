import myAuth from "../../authStatus";

async function drawLabels(setLabels) {
  const resRaw = await myAuth.verifyAuth();

  // console.log("drawLabels", resRaw);
  if (resRaw.valid) {
    const labels_list = await resRaw.user.labels;
    setLabels(labels_list);
  }
  // console.groupEnd();
}

export default drawLabels;
