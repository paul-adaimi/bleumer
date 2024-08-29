import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a context for the cart
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Load cart data from AsyncStorage when the app starts
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart data:", error);
      }
    };

    loadCartData();
  }, []);

  // Save cart data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCartData = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart data:", error);
      }
    };

    saveCartData();
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (itemId, itemDetails) => {
    setCart((prevCart) => {
      // If the item already exists in the cart, update the count
      if (prevCart[itemId]) {
        return {
          ...prevCart,
          [itemId]: {
            ...prevCart[itemId],
            count: prevCart[itemId].count + itemDetails.count,
          },
        };
      }
      // Otherwise, add the item to the cart
      return {
        ...prevCart,
        [itemId]: itemDetails,
      };
    });
  };

  // Function to remove an item from the cart by item ID
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  // Function to update the count of an item in the cart
  const updateItemCount = (itemId, newCount) => {
    setCart((prevCart) => {
      if (newCount <= 0) {
        const newCart = { ...prevCart };
        delete newCart[itemId]; // Remove the item completely if count is 0 or less
        return newCart;
      }
      return {
        ...prevCart,
        [itemId]: {
          ...prevCart[itemId],
          count: newCount,
        },
      };
    });
  };

  const totalItemCount = useMemo(() => {
    return Object.values(cart).reduce((total, item) => total + item.count, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemCount,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
