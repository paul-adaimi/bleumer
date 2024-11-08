// TODO: hanlde errors + test
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

    // await response.json();
  } catch (error) {
    console.error("Error updaing user name", error);
  }
};
