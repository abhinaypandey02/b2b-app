import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "./Categories";
import CategoryProduct from "./CategoryProduct";

const Stack = createStackNavigator();

const CategoryNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoryProduct" component={CategoryProduct} />
    </Stack.Navigator>
  );
};
export default CategoryNavigator;