import { createContext, useEffect, useState } from "react";

// Creating a context object for the cart
export const CartContext = createContext({});

// Defining the CartContextProvider component
export function CartContextProvider({ children }) {
  // Checking if the window object is defined to avoid issues during server-side rendering
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // Initializing a state variable to hold the list of products in the cart
  const [cartProducts, setCartProducts] = useState([]);

  // Using useEffect to update localStorage whenever cartProducts changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      // Saving the cart products to localStorage in JSON format
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]); // This effect runs whenever cartProducts changes

  // Using useEffect to initialize cartProducts from localStorage when the component mounts
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      // Parsing the JSON string from localStorage and setting it to the state
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Function to add a product to the cart
  function addProduct(productID) {
    setCartProducts((prevProducts) => [...prevProducts, productID]);
  }

  // Function to remove a product from the cart
  function removeProduct(productID) {
    setCartProducts((prevProducts) => {
      // Finding the position of the product in the cart
      const position = prevProducts.indexOf(productID);
      if (position !== -1) {
        // Removing the product from the cart
        return prevProducts.filter((value, index) => index !== position);
      }
      return prevProducts;
    });
  }

  // Function to clear the cart
  function clearCart() {
    // Clearing the cartProducts in localStorage
    if (ls) {
      ls.removeItem("cart");
    }
    // clearing the cartProducts state
    setCartProducts([]);
  }

  // Returning the context provider with the cart state and functions as its value
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children} {/* Rendering the children components within the provider */}
    </CartContext.Provider>
  );
}
