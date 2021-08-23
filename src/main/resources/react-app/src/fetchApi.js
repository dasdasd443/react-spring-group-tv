export const oAuthVerification = async (obj) => {
  const load = JSON.stringify(obj);
  const response = await fetch("http://localhost:5000/api/user/oauthenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: load,
  });
  return response.json();
};

export const getUserByRole = async (role) => {
  const response = await fetch(`http://localhost:5000/api/user/users/${role}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        JSON.parse(localStorage.getItem("user")) !== null
          ? JSON.parse(localStorage.getItem("user")).token
          : "",
    },
  });
  const data = await response.json();
  return data;
};
