import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0); 

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = () => {
    if (selectedProduct) {
      const existingItem = cart.find((item) => item.id === selectedProduct.id);

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCart([...cart, { ...selectedProduct, quantity: 1 }]);
      }

      setCartCount(cartCount + 1); 
    }
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setCartCount(cartCount + 1); 
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    setCartCount(cartCount - 1); 
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setCartCount(cartCount - 1); 
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, selectProduct, cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartCount }}>
      {children}
    </ProductContext.Provider>
  );
};
