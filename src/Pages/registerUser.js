export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const response = await fetch(
    "https://cautious-sniffle.netlify.app/.netlify/functions/api/createform",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};
