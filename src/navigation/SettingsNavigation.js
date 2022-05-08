import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Contact from './../screens/Authenticated/ApprovedScreens/SettingScreens/Contact';
import About from '../screens/Authenticated/ApprovedScreens/SettingScreens/About';
import TermsAndConditions from '../screens/Authenticated/ApprovedScreens/SettingScreens/TermsAndConditions';

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Contact Us" component={Contact} />

      <Stack.Screen name="About Us" component={About} />
      <Stack.Screen
        name="Terms And Conditions"
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
};
export default SettingsNavigation;
