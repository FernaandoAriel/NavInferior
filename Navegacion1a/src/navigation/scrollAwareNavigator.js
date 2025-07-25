import React, { createContext, useContext, useRef } from "react";
import { Animated } from "react-native";

// Contexto para manejar la visibilidad del tab bar
const TabBarContext = createContext();

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error("useTabBar must be used within a TabBarProvider");
  }
  return context;
};

// Provider del contexto
export const TabBarProvider = ({ children }) => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isTabBarHidden = useRef(false);

  const hideTabBar = () => {
    if (!isTabBarHidden.current) {
      isTabBarHidden.current = true;
      Animated.timing(tabBarTranslateY, {
        toValue: 100, // Altura aproximada del tab bar
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const showTabBar = () => {
    if (isTabBarHidden.current) {
      isTabBarHidden.current = false;
      Animated.timing(tabBarTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const deltaY = currentScrollY - lastScrollY.current;
    
    if (deltaY > 5 && currentScrollY > 100) {
      // Scrolling down - hide tab bar
      hideTabBar();
    } else if (deltaY < -5) {
      // Scrolling up - show tab bar
      showTabBar();
    }
    
    lastScrollY.current = currentScrollY;
  };

  return (
    <TabBarContext.Provider
      value={{
        tabBarTranslateY,
        handleScroll,
        hideTabBar,
        showTabBar,
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};