function myAuth() {
  const auth = {};

  auth.verifyAuth = async () => {
    // if (localStorage.getItem("token") == null) return {};
    console.log("[authStatus]auth.verifyAuth ready to fetch");
    const resRaw = await fetch("./auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log("[auth.verifyAuth] Got resRaw", resRaw);
    const res = await resRaw.json();
    if (resRaw.ok) {
      localStorage.setItem("user", JSON.stringify(res.user));
    } else {
      localStorage.setItem("user", null);
      localStorage.setItem("token", "");
    }
    console.log("[auth.verifyAuth] Got res", res);
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
