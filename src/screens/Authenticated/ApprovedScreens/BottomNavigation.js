import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/CartAndOrders";

import Home from "./Home";
import Cart from "./Cart";
import Categories from "./Category/CategoryNavigator";
import Orders from "./Orders";
import Settings from "./Settings";

const Navigator = createBottomTabNavigator();

const BottomNavigation = () => {
  const [message, _setMessage] = React.useState(true);
  const State = useSelector((state) => state.CartAndOrders.message);
  const cart = useSelector((state) => state.CartAndOrders.cart);

  const onDismissSnackBar = () => {
    _setMessage("");
    Dispatch(actions.clearMessage());
  };
  React.useEffect(() => {
    if (State !== undefined) {
      _setMessage(State);
    }
  }, [State]);

  const Dispatch = useDispatch();
  return (
    <>
      <Navigator.Navigator tabBarOptions={{ style: { paddingBottom: 3 } }}>
        <Navigator.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Navigator.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cards-variant"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Navigator.Screen
          name={"Cart"}
          component={Cart}
          options={{
            tabBarLabel: "Cart ("+cart.length+")",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            ),
          }}
        />
        <Navigator.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="reorder-horizontal"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Navigator.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Navigator.Navigator>
      <Snackbar
        visible={message !== ""}
        onDismiss={onDismissSnackBar}
        duration={1200}
      >
        {message}
      </Snackbar>
    </>
  );
};
export default BottomNavigation;
