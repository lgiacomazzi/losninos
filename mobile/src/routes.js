import React from "react";

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import {
  Dashboard,
  Apartments,
  Customers,
  Bookings,
  Payments,
  ApartmentSingle,
  PaymentsSingle,
  CustomerSingle
} from "./pages/index.js";

import Icon from "react-native-vector-icons/FontAwesome5";

const ApartmentsHandler = createAppContainer(
  createStackNavigator(
    {
      Apartments,
      ApartmentSingle
    },
    { mode: "card", headerMode: "none" }
  )
);

const CustomersHandler = createAppContainer(
  createStackNavigator(
    {
      Customers,
      CustomerSingle
    },
    { mode: "card", headerMode: "none" }
  )
);

const PaymentsHandler = createAppContainer(
  createStackNavigator(
    {
      Payments,
      PaymentsSingle
    },
    { mode: "card", headerMode: "none" }
  )
);

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: Dashboard,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="star" solid size={24} color={tintColor} />
          )
        }
      },
      Book: {
        screen: Bookings,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="bookmark" solid size={24} color={tintColor} />
          )
        }
      },
      Pay: {
        screen: PaymentsHandler,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="money-bill-wave" size={24} color={tintColor} />
          )
        }
      },
      Apt: {
        screen: ApartmentsHandler,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="door-open" size={24} color={tintColor} />
          )
        }
      },
      Hos: {
        screen: CustomersHandler,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="user-friends" size={24} color={tintColor} />
          )
        }
      },
      Not: {
        screen: Customers,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="bell" size={24} solid color={tintColor} />
          )
        }
      }
    },
    {
      tabBarOptions: {
        activeTintColor: "#007bff",
        inactiveTintColor: "#acbcd6",
        showLabel: false,
        style: { height: 45, borderTopColor: "#e2e4e6" }
      }
    }
  )
);

export default Routes;
