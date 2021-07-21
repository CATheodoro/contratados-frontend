import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { } from './styles';

import { BackgroundImageProfile } from '../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../styles/Basic';
    
import { PageBodyProfile, Linha } from '../styles/View';

import { ExitButtonProfileText, ButtonWhiteText, Text } from '../styles/Text';

import { ExitButtonProfile, PdfButton, PerfilButton } from '../styles/Button';

//Styles END ###########################################################


import Api from '../../Api';

import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';

import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native';
import InfoTopProfile from '../../components/InfoTopProfile';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState([]);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(()=>{
        getPerfilUsuario();
    },[]);

    const getPerfilUsuario = async () =>{
        setLoading(true)
        let json = await Api.getPerfilUsuario();
        if(json){
            setUserInfo(json);
        } else {
            alert("Erro: "+json.error);
        }
        setLoading(false);
    };

    
    const refresh = () =>{
        setRefreshing(false);
        getPerfilUsuario();
    }

    const handlChangePassword = () =>{
        navigation.navigate('ProfileUpdatePassword', {
            nome: userInfo.nome,
            email: userInfo.email,
        })
    }

    const handlChangeEmail = () =>{
        navigation.navigate('ProfileUpdateEmail', {
            nome: userInfo.nome,
            email: userInfo.email
        })
    }

    const handleChangePerfil = () =>{
        navigation.navigate('ProfileUpdate', {
            nome: userInfo.nome,
            email: userInfo.email,
            
            dataNascimento: userInfo.dataNascimento,
    
            celular: userInfo.celular,
            telefone: userInfo.telefone,
    
            status: userInfo.status,
            dataCriacaoPerfil: userInfo.dataCriacaoPerfil,
    
            formacao: userInfo.formacao,
            experiencia: userInfo.experiencia,
    
            cep: userInfo.cep,
            logradouro: userInfo.logradouro,
            complemento: userInfo.complemento,
            bairro: userInfo.bairro,
            localidade: userInfo.localidade,
            uf: userInfo.uf,
            numero: userInfo.numero,
        })
    }

    const handleLogoutClick = async () =>{
        //await Api.logout();
        await AsyncStorage.clear(); //Retirar para testes
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <Scroller refreshControl ={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                    <BackgroundImageProfile />      

                <PageBodyProfile>

                <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    {loading &&
                        <LoadingIconBasic size="large" color="#000000" />
                    }

                    <PerfilButton onPress={() => handleChangePerfil()}>
                        <PersonIcon width="24" height="24" fill="#268596" />
                        <Text>Atualizar perfil</Text>
                    </PerfilButton>

                    <PerfilButton onPress={()=>handlChangeEmail()}>
                        <EmailIcon width="24" height="24" fill="#268596" />
                        <Text>Alterar e-mail</Text>
                    </PerfilButton>

                    <PerfilButton onPress={()=>handlChangePassword()}>
                        <LockIcon width="24" height="24" fill="#268596" />
                        <Text>Alterar senha</Text>
                    </PerfilButton>

                    <Linha/>

                    <PdfButton>
                        <ButtonWhiteText>Visualizar o currículo</ButtonWhiteText>
                    </PdfButton>

                    <Linha/>

                    <ExitButtonProfile onPress={()=>handleLogoutClick()}>
                        <ExitButtonProfileText>Sair da conta</ExitButtonProfileText>
                    </ExitButtonProfile>

                </PageBodyProfile>


            </Scroller>

        </Container>
    );
}