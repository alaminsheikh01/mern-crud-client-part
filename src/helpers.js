// save login response (user name and toekn ) to session storage
export const authenticate = (response, next) => {
  if (window !== "undefined") {
    console.log(response);
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.name));
  }
  next();
};

// access user name from session storage
export const getName = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

// access token from session storage
export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

// remove token from session storage
export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next();
};
