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

  User.register = (user) => {
    return fetch(FRONTEND + "/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    });
  };

  return User;
}

export default UserAPI();
