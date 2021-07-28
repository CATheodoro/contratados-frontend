import React, { useEffect, useContext } from 'react'; //useEffect toda vez que a tela abre, executa o código dentro dele
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage'; 
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../../contexts/UserContext';
import Logo from '../../../assets/logoContratados.svg'

export default ()=>{

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()  => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const perfil = await AsyncStorage.getItem('perfil'); 
            
            if(token) {

                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
    
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <Logo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    )
}