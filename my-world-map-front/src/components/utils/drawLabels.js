import myAuth from "../../authStatus";

async function drawLabels(setLabels) {
  // console.log("drawLabels: starting");

  const resRaw = await myAuth.verifyAuth();
  const labels_list = await resRaw.user.labels;
  // console.log("drawLabels: resRaw", resRaw.user.labels);

  for (let obj of labels_list){
    if (obj.name === "post"){
      setLabels(obj.list);
    }
  }
}

export default drawLabels;
