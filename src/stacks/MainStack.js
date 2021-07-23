import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/mainStack/Preload';
import SignIn from '../screens/mainStack/SignIn';
import SignUp from '../screens/mainStack/SignUp';
import MainTab from './MainTab';

import AnuncioVaga from '../screens/users/empresa/AnuncioVaga';
import ProfileEmpresa from '../screens/users/empresa/ProfileEmpresa';
import ProfileUpdateEmailPassword from '../screens/users/ProfileUpdateEmailPassword';

import ProfileUsuarioUpdate from '../screens/users/usuario/ProfileUsuarioUpdate';

import ProfileExperienciaFormacao from '../screens/users/usuario/ProfileExperienciaFormacao';
import ProfileUsuarioUpdateExperienciaFormacao from '../screens/users/usuario/ProfileUsuarioUpdateExperienciaFormacao';

import Solicitacao from '../screens/users/Solicitacao';

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

        <Stack.Screen name="ProfileEmpresa" component={ProfileEmpresa} />
        <Stack.Screen name="ProfileUpdateEmailPassword" component={ProfileUpdateEmailPassword} />
        <Stack.Screen name="ProfileUsuarioUpdate" component={ProfileUsuarioUpdate} />

        <Stack.Screen name="ProfileExperienciaFormacao" component={ProfileExperienciaFormacao} />
        <Stack.Screen name="ProfileUsuarioUpdateExperienciaFormacao" component={ProfileUsuarioUpdateExperienciaFormacao} />

        <Stack.Screen name="Solicitacao" component={Solicitacao} />
        
    </Stack.Navigator>
);