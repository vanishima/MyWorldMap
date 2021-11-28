import myAuth from "../../authStatus";

async function drawLabels(setLabels) {
  const resRaw = await myAuth.verifyAuth();

  console.group("drawLabels",resRaw);
  if (resRaw.valid) {
    const labels_list = await resRaw.user.labels;

    for (let obj of labels_list) {
      if (obj.name === "post") {
        console.log("setLabels:", obj.list);
        setLabels(obj.list);
      }
    }
  }
  console.groupEnd();
}

export default drawLabels;
