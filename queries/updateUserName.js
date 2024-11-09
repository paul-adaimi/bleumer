export default updateUserName = async (userIdToken, { userName }) => {
  try {
    const response = await fetch(
      "https://europe-west1-bleumer-d477c.cloudfunctions.net/updateUserName",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userIdToken}`,
        },
        body: JSON.stringify({
          userName,
        }),
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
