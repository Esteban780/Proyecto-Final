import { View, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPassword from '../screens/NewPassword';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { Auth, Hub } from 'aws-amplify';
import MyBottomTab from './MyBttomTab';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async() =>{
    try{
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    }catch (e) {
      setUser(null);
    }
  };
  
  useEffect(() =>{
    checkUser();
  }, [])

  useEffect(() =>{
    const listener = (data) =>{
      if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener)
  }, [])
  
  if (user === undefined){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItem: 'center'}}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {user ? (
          <Stack.Screen name="HomeScreen" component={MyBottomTab} />
        ): (
        <>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        </>
        )}
      </Stack.Navigator>   
  )
}

export default Navigation