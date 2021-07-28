import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/mainStack/Preload';
import SignIn from '../screens/mainStack/SignIn';
import SignUp from '../screens/mainStack/SignUp';
import MainTab from './MainTab';

import AnuncioVaga from '../screens/users/empresa/AnuncioVaga';
import ProfileUsuario from '../screens/users/usuario/ProfileUsuario';
import ProfileEmpresa from '../screens/users/empresa/ProfileEmpresa';
import ProfileUpdateEmailPassword from '../screens/users/ProfileUpdateEmailPassword';
import ProfileUsuarioUpdateCurriculo from '../screens/users/usuario/ProfileUsuarioUpdateCurriculo'

import ProfileUsuarioUpdate from '../screens/users/usuario/ProfileUsuarioUpdate';

import ProfileExperienciaFormacao from '../screens/users/usuario/ProfileExperienciaFormacao';
import ProfileUsuarioUpdateExperienciaFormacao from '../screens/users/usuario/ProfileUsuarioUpdateExperienciaFormacao';

import Solicitacao from '../screens/users/Solicitacao';
import CreateAnuncioVaga from '../screens/users/empresa/CreateAnuncioVaga'
import CreateSetorCargo from '../screens/users/empresa/CreateSetorCargo';

import SolicitacaoEmpresaUpdate from '../screens/users/SolicitacaoEmpresaUpdate';

import FilterAnuncioVagaSolicitacoes from '../screens/users/FilterAnuncioVagaSolicitacoes';

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

        <Stack.Screen name="ProfileUsuario" component={ProfileUsuario} />
        <Stack.Screen name="ProfileEmpresa" component={ProfileEmpresa} />
        <Stack.Screen name="ProfileUpdateEmailPassword" component={ProfileUpdateEmailPassword} />
        <Stack.Screen name="ProfileUsuarioUpdate" component={ProfileUsuarioUpdate} />
        <Stack.Screen name="ProfileUsuarioUpdateCurriculo" component={ProfileUsuarioUpdateCurriculo} />
        

        <Stack.Screen name="ProfileExperienciaFormacao" component={ProfileExperienciaFormacao} />
        <Stack.Screen name="ProfileUsuarioUpdateExperienciaFormacao" component={ProfileUsuarioUpdateExperienciaFormacao} />

        <Stack.Screen name="Solicitacao" component={Solicitacao} />
        <Stack.Screen name="CreateAnuncioVaga" component={CreateAnuncioVaga} />
        <Stack.Screen name="CreateSetorCargo" component={CreateSetorCargo} />

        <Stack.Screen name="SolicitacaoEmpresaUpdate" component={SolicitacaoEmpresaUpdate} />

        <Stack.Screen name="FilterAnuncioVagaSolicitacoes" component={FilterAnuncioVagaSolicitacoes} />
        
        
    </Stack.Navigator>
);