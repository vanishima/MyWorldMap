const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const test = () => {console.log("test")};

module.exports = { delay, test };
