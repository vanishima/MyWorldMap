const FRONTEND =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_FRONTEND_PREFIX
    : "";

function myAuth() {
  const auth = {};

  auth.verifyAuth = async () => {
    const resRaw = await fetch(FRONTEND + "/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
    });
    // console.log("[auth.verifyAuth] Got resRaw", resRaw);
    const res = await resRaw.json();
    // console.log(resRaw);
    if (resRaw.ok) {
      // console.log("[authStatus]auth.verifyAuth: user exists");
      localStorage.setItem("user", JSON.stringify(res.user));
    } else {
      // console.log("[authStatus]auth.verifyAuth: token not valid");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    // console.log("[auth.verifyAuth] Got res", res);
    return res;
  };

  auth.logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("cleared token and user");
  };

  return auth;
}

export default myAuth();
