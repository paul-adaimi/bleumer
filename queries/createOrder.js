export default createOrder = async (
  userIdToken,
  { cart, addressId, promoCode }
) => {
  const simplifiedCart = Object.keys(cart).reduce((acc, productId) => {
    acc[productId] = cart[productId].count;
    return acc;
  }, {});

  try {
    // Call the Firebase function 'createOrder'
    const response = await fetch(
      "https://europe-west1-bleumer-d477c.cloudfunctions.net/createOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userIdToken}`,
        },
        body: JSON.stringify({
          cart: simplifiedCart, // Send only the count for each product
          addressId, // Send address id
          promoCode, // Send promo code
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
