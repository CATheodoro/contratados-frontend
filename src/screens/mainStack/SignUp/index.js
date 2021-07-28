import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
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

import Logo from '../../../assets/logoContratados.svg'
import PersonIcon from '../../../assets/person.svg'
import EmailIcon from '../../../assets/email.svg'
import LockIcon from '../../../assets/lock.svg'
import SignUpModal from '../../../components/SignUpModal';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [confirmPasswordField, setConfirmPasswordField] = useState('');
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleSignClick = async () => {
        setLoading(true);
        if (nameField != '' && emailField != '' && passwordField != '') {
            if (passwordField === confirmPasswordField) {

                setShowModal(true);

            } else {
                alert("Senhas diferentes, confirme sua senha novamente");
            }
        } else {
            alert("Preencha os campos");
        }
        setLoading(false);
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }



    return (
        <Container>
            <Logo width="100%" height="160" />

            <InputArea>
                <TextWhite>Nome: </TextWhite>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}

                />
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
                <TextWhite>Confirme a senha:</TextWhite>
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Confirme sua senha"
                    value={confirmPasswordField}
                    onChangeText={t => setConfirmPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    {loading ?
                        <LoadingIcon size="large" color="#FFF" />
                        :
                        <CustomButtonText>CADASTRAR</CustomButtonText>
                    }
                </CustomButton>
            </InputArea>

            <SignUpModal
                show={showModal}
                setShow={setShowModal}
                password={passwordField}
                email={emailField}
                name={nameField}
            />

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Voltar Para o Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}