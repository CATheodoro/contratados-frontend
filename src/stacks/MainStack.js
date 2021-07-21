import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import AnuncioVaga from '../screens/AnuncioVaga';
import PerfilEmpresa from '../screens/PerfilEmpresa';
import ProfileUpdatePassword from '../screens/ProfileUpdatePassword';
import ProfileUpdateEmail from '../screens/ProfileUpdateEmail';
import ProfileUpdate from '../screens/ProfileUpdate';
import ProfileUpdateExpFor from '../screens/ProfileUpdateExpFor';
import ProfileUpdateFormExpFor from '../screens/ProfileUpdateFormExpFor';

const Stack = createStackNavigator();

export default () =>(
    <Stack.Navigator
        initialRouteName='Preload'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="MainTab" component={MainTab}/>
        <Stack.Screen name="AnuncioVaga" component={AnuncioVaga} />

        <Stack.Screen name="PerfilEmpresa" component={PerfilEmpresa} />
        <Stack.Screen name="ProfileUpdatePassword" component={ProfileUpdatePassword} />
        <Stack.Screen name="ProfileUpdateEmail" component={ProfileUpdateEmail} />
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
        <Stack.Screen name="ProfileUpdateExpFor" component={ProfileUpdateExpFor} />
        <Stack.Screen name="ProfileUpdateFormExpFor" component={ProfileUpdateFormExpFor} />
        
        
        
        
    </Stack.Navigator>
);