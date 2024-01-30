import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  addPostScreen,
  dashboardScreen,
  homeScreen,
  loginScreen,
} from '../constants/Screens';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PostInfoScreen from '../screens/Post/PostContentScreen';

const Stack = createNativeStackNavigator();

function MainStackScreen(): JSX.Element {
  const linking = {
    prefixes: ['http://localhost:19006/', 'mychat://'],
    config: {
      screens: {
        HomeScreen: '',
        loginScreen: loginScreen,
        // adminDashboardScreen: '?:id/Search',
        NotFound: '*',
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={homeScreen}>
        <Stack.Screen name={homeScreen} component={HomeScreen} />
        <Stack.Screen name={loginScreen} component={LoginScreen} />
        <Stack.Screen name={dashboardScreen} component={DashboardScreen} />
        <Stack.Screen name={addPostScreen} component={PostInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackScreen;
