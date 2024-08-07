const LogoutUser = async () => {
  const token = JSON.parse(localStorage.getItem("userdata"))?.token;
  if (!token) {
    console.warn("No token found in localStorage");
    return null;
  }

  const response = await fetch(
    "https://cautious-sniffle.netlify.app/.netlify/functions/api/logout",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (response.ok) {
    localStorage.removeItem("userdata");
    return true;
  } else {
    console.warn("Failed to log out");
    return false;
  }
};
export default LogoutUser;
