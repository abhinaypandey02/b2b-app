import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Address from '../screens/Authenticated/ApprovedScreens/Checkout/Address';
import OrderReview from '../screens/Authenticated/ApprovedScreens/Checkout/OrderReview';
import Payment from '../screens/Authenticated/ApprovedScreens/Checkout/Payment';

const TopTab = createMaterialTopTabNavigator();

const CheckoutNavigation = () => {
  return (
    <TopTab.Navigator tabBarOptions={{style: {height: 0}}} swipeEnabled={false}>
      <TopTab.Screen name="OrderReview" component={OrderReview} />
      <TopTab.Screen name="Payment" component={Payment} />
    </TopTab.Navigator>
  );
};
export default CheckoutNavigation;
