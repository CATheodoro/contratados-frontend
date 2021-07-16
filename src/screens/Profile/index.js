import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const handleLogoutClick = async () =>{
        //await Api.logout();
        await AsyncStorage.clear(); //Retirar para testes
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    );
}