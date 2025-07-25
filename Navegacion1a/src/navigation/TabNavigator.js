import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTabBar } from "./scrollAwareNavigator";

// Importando las pantallas
import Home from "../screens/Home";
import ShowUser from "../screens/ShowUser";
import AddUser from "../screens/AddUser";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

// Componente personalizado para la barra de pestañas
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { tabBarTranslateY } = useTabBar();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;
  const scaleValues = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;
  const textOpacity = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  // Configuración de iconos
  const getIconName = (routeName, focused) => {
    switch (routeName) {
      case "Home":
        return focused ? "home" : "home-outline";
      case "ShowUser":
        return focused ? "people" : "people-outline";
      case "AddUser":
        return focused ? "person-add" : "person-add-outline";
      default:
        return "home-outline";
    }
  };

  // Configuración de títulos
  const getTitle = (routeName) => {
    switch (routeName) {
      case "Home":
        return "Inicio";
      case "ShowUser":
        return "Usuarios";
      case "AddUser":
        return "Agregar";
      default:
        return "Inicio";
    }
  };

  const animateTab = (index) => {
    // Animar el tab seleccionado
    Animated.parallel([
      // Escalar el ícono
      Animated.spring(scaleValues[index], {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      // Mostrar el texto
      Animated.timing(textOpacity[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      // Animar el indicador
      Animated.spring(animatedValues[index], {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();

    // Animar los otros tabs para volver al estado normal
    state.routes.forEach((_, i) => {
      if (i !== index) {
        Animated.parallel([
          Animated.spring(scaleValues[i], {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(textOpacity[i], {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(animatedValues[i], {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]).start();
      }
    });
  };

  useEffect(() => {
    animateTab(state.index);
    setSelectedIndex(state.index);
  }, [state.index]);

  return (
    <Animated.View 
      style={[
        styles.tabBarContainer,
        {
          transform: [{ translateY: tabBarTranslateY }],
        },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              {/* Indicador animado de fondo */}
              <Animated.View
                style={[
                  styles.activeIndicator,
                  {
                    transform: [
                      {
                        scale: animatedValues[index],
                      },
                    ],
                    opacity: animatedValues[index],
                  },
                ]}
              />

              {/* Contenedor del ícono */}
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [
                      {
                        scale: scaleValues[index],
                      },
                    ],
                  },
                ]}
              >
                <Ionicons
                  name={getIconName(route.name, isFocused)}
                  size={22}
                  color={isFocused ? "#FFFFFF" : "#8B6F47"}
                />
              </Animated.View>

              {/* Texto animado */}
              <Animated.Text
                style={[
                  styles.tabText,
                  {
                    opacity: textOpacity[index],
                    color: isFocused ? "#FFFFFF" : "#8B6F47",
                  },
                ]}
              >
                {getTitle(route.name)}
              </Animated.Text>
            </TouchableOpacity>
          );
        }        )}
      </View>
    </Animated.View>
  );
};

// Componente principal del TabNavigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ShowUser" component={ShowUser} />
      <Tab.Screen name="AddUser" component={AddUser} />
    </Tab.Navigator>
  );
};

// Estilos
const styles = {
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingHorizontal: 25,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#AF8260",
    borderRadius: 20,
    marginHorizontal: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    width: 50,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    top: 2,
  },
  iconContainer: {
    marginBottom: 1,
  },
  tabText: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 1,
  },
};

export default TabNavigator;