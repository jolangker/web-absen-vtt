const getToken = async () => {
  const url = "https://absenvttv3.herokuapp.com/api/token/";
  const cors = "https://proxyabsenvtt.herokuapp.com/";

  const res = await fetch(`${cors}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "admin",
      password: "solu5758",
    }),
  });

  return await res.json();
};

export default getToken;
