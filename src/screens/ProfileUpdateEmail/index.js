import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos } from './styles';

import { BackgroundImageProfile } from '../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../styles/Basic';
    
import { PageBodyProfile,  DescriptionArea } from '../styles/View';

import { Title, Text } from '../styles/Text';

import { BackButtom } from '../styles/Button';

//Styles END ###########################################################


import Api from '../../Api';

import SignInput from '../../components/SignInput';

import LockIcon from '../../assets/lock.svg'
import BackIcon from '../../assets/back.svg';
import EmailIcon from '../../assets/email.svg'
import InfoTopProfile from '../../components/InfoTopProfile';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [oldPasswordFiel, setOldPasswordField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [confirmEmailField, setConfirmEmailField] = useState('');

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email
    })


    const handleChangeClick = async () => {
        setLoading(true);
            if(oldPasswordFiel !='' && emailField != ''){
    
                if(emailField === confirmEmailField){
                    if(emailField !== userInfo.email){

                        let res = await Api.updateEmailUsuario(oldPasswordFiel, emailField);
        
                        if(res.id) {
            
                            alert("Senha alterada com sucesso !!!");
                            navigation.navigate('Profile');
            
                        } else {
                            if(res.error){
                                alert("Erro: " + res.error);
                            } else
                                alert("Erro: " + res[0].error);
                            
                        }
                    } else {
                        alert("O novo e-mail não pode ser o mesmo que o atual")
                    }
                } else {
                    alert ("E-mail diferente, confirme seu e-mail novamente");
                }
    
            } else {
                alert ("Preencha os campos");
            }
            setLoading(false);
        }

        const handleBackButton = () => {
            navigation.goBack();
        }

    return (
        <Container>
            <Scroller>
                    <BackgroundImageProfile />      

                <PageBodyProfile>

                <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    <Title>Deseja atualizar seu e-mail ?</Title>
                    <DescriptionArea>
                        <EntreEspacos/> 

                        <Text>Digite sua senha atual</Text>
                        <SignInput 
                            IconSvg={LockIcon}
                            placeholder="Senha atual"
                            value={oldPasswordFiel}
                            onChangeText={t=>setOldPasswordField(t)}
                            password = {true}
                        />
                        <EntreEspacos/>
                        <Linha/>

                        <Text>Digite seu novo e-mail</Text>
                        <SignInput 
                            IconSvg={EmailIcon}
                            placeholder="Novo e-mail"
                            value={emailField}
                            onChangeText={t=>setEmailField(t)}
                            password = {false}
                            keyboardType = 'email-address'
                        />
                        <Text>Confirme seu novo e-mail</Text>
                        <SignInput 
                            IconSvg={EmailIcon}
                            placeholder="Confirmar novo e-mail"
                            value={confirmEmailField}
                            onChangeText={t=>setConfirmEmailField(t)}
                            password = {false}
                            keyboardType = 'email-address'
                        />

                        <EntreEspacos/>

                    <CustomButton onPress={handleChangeClick}>
                        {loading ?
                            <LoadingIconBasic size="large" color="#FFF" />
                            :
                            <CustomButtonText>ATUALIZAR</CustomButtonText>
                        }
                    </CustomButton>

                    </DescriptionArea>

                </PageBodyProfile>

            </Scroller>

            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}