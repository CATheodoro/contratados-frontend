import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    LoadingIcon,
    TextWhite

} from './styles';

import Api from '../../../Api';

import SignInput from '../../../components/SignInput';

import Logo from '../../../assets/logoContratados.svg';
import EmailIcon from '../../../assets/email.svg';
import LockIcon from '../../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSignClick = async () => {
        setLoading(true);
        if (emailField != '' && passwordField != '') {

            let json = await Api.signIn(emailField, passwordField);

            if (json.token) {
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('perfil', json.perfil);
                await AsyncStorage.setItem('id', json.id);

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });

            } else {
                alert('E-mail e/ou senha incorreto! ');
            }
        } else {
            alert("Preencha os campos!");
        }
        setLoading(false)
    }

    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
    }

    return (
        <Container>
            <Logo width="100%" height="160" />

            <InputArea>
                <TextWhite>E-mail:</TextWhite>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu E-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                    keyboardType='email-address'
                />
                <TextWhite>Senha:</TextWhite>
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    {loading ?
                        <LoadingIcon size="large" color="#FFF" />
                        :
                        <CustomButtonText>ENTRAR</CustomButtonText>
                    }

                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}