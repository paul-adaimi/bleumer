export default deleteAccount = async (userIdToken) => {
  try {
    const response = await fetch(
      "https://europe-west1-bleumer-d477c.cloudfunctions.net/deleteUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userIdToken}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
};
