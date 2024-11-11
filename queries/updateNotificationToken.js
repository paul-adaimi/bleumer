export default updateNotificationToken = async (
  userIdToken,
  { notificationToken }
) => {
  try {
    const response = await fetch(
      "https://europe-west1-bleumer-d477c.cloudfunctions.net/updateUserNotificationToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userIdToken}`,
        },
        body: JSON.stringify({
          notificationToken,
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
