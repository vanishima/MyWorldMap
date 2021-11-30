const FRONTEND =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_FRONTEND_PREFIX
    : "";

function UserAPI() {
  const User = {};

  User.login = async (credentials) => {
    return fetch(FRONTEND + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(credentials),
    });
  };

  User.register = async (user) => {
    return fetch(FRONTEND + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    });
  };

  User.addLabel = async (type, label) => {
    return fetch(FRONTEND + "/auth/newlabel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify({ type: type, label: label }),
    });
  };

  return User;
}

export default UserAPI();
