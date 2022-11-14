import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from 'react';
<<<<<<< HEAD
import Navigation from ".";
=======
>>>>>>> 408626693056213ed887536a062604ce7b3240f4
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Perfil from "../screens/Perfil/Perfil"

const MyTab = createBottomTabNavigator();

export default function MyBottomTab(){
    return(
        <MyTab.Navigator screenOptions={{headerShown: false}}>
            <MyTab.Screen name="Home" component={HomeScreen}/>
            <MyTab.Screen name="Perfil" component={Perfil}/>
        </MyTab.Navigator>
    )
<<<<<<< HEAD
}
=======
}
>>>>>>> 408626693056213ed887536a062604ce7b3240f4
