import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold

} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg'
import PersonIcon from '../../assets/person.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

export default ()=>{
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [confirmPasswordField, setConfirmPasswordField] = useState('');

    const handleSignClick = async () => {

        if(nameField != '' && emailField != '' && passwordField != ''){

            if(passwordField === confirmPasswordField){
                let res = await Api.signUp(nameField, emailField, passwordField);

                if(res.message === '' || res.message === null) {
    
                    alert("Cadastro realizado com sucesso !!!");
                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
    
                } else {
                    alert("Erro: " + res.message);
                }
            } else {
                alert ("Senhas diferentes, confirme sua senha novamente");
            }

        } else {
            alert ("Preencha os campos");
        }

    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }



    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>

                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                
                />

                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu E-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                
                />

                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password = {true}
                />
                
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={confirmPasswordField}
                    onChangeText={t=>setConfirmPasswordField(t)}
                    password = {true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Voltar Para o Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}