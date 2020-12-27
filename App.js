import * as React from 'react';
import { Text, View, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import{CustomHeader,CustomDrawerContent} from './src'
import{HomeScreen,HomeScreenDetail,SettingScreen,SettingScreenDetail} from './src/tab'
import{KullanicilarScreen} from './src/drawer'
import{RegisterScreen,LoginScreen} from './src/auth'
import{IMAGE} from './src/constants/image'



const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})
const StackHome = createStackNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home" >
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

const StackSetting = createStackNavigator();

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting" >
      <StackSetting.Screen name="Setting" component={SettingScreen} options={navOptionHandler} />
    
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? IMAGE.ICON_HOME2
              : IMAGE.ICON_HOME;
          } else if (route.name === 'Search') {
            iconName = focused
              ? IMAGE.ICON_SEARCH2
              : IMAGE.ICON_SEARCH;
          }
          return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'orange',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SettingStack} />
    </Tab.Navigator>

  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Kullanıcılar" component={KullanicilarScreen} />
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login" >
        <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler} />
        <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
        <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}