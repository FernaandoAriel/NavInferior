import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home.js";
import ShowUser from "../screens/ShowUser.js";
import AddUser from "../screens/AddUser.js";
import EditUser from "../screens/EditUser.js";
import DeleteUser from "../screens/DeleteUser.js";
import TabNavigator from "./TabNavigator";
import { TabBarProvider } from "./scrollAwareNavigator.js";

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <TabBarProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabNavigator"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShowUser" component={ShowUser} />
          <Stack.Screen name="AddUsers" component={AddUser} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="DeleteUser" component={DeleteUser} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarProvider>
  );
}