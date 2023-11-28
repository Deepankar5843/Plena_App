import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { ProductProvider } from './ProductContext';
import CartScreen from './screens/CartScreen';
import BottomTabIcons from './Tab/BottomTabIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ProductProvider>
        <Tab.Navigator tabBar={(props) => <BottomTabIcons {...props} />}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Tab.Navigator>
      </ProductProvider>
    </NavigationContainer>
  );
};

export default App;
