import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { } from './styles';

import { BackgroundImageProfile, ProfileAvatar, ProfileAvatarDefault } from '../styles/Image';

import { Container, Scroller, LoadingIcon } from '../styles/Basic';
    
import { PageBodyProfile, InfoProfileArea, EmailProfileArea, Linha } from '../styles/View';

import { TextBold, TitleNameProfile, ExitButtonProfileText, ButtonWhiteText } from '../styles/Text';

import { ExitButtonProfile, SimpleButton, PdfButton, PerfilButton } from '../styles/Button'

//Styles END ###########################################################


import Api from '../../Api';

import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [usuarioInfo, setUsuarioInfo] = useState([]);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(()=>{
        getPerfilUsuario();
    },[]);

    const getPerfilUsuario = async () =>{
        setLoading(true)
        let json = await Api.getPerfilUsuario();
        if(json){
            setUsuarioInfo(json);
        } else {
            alert("Erro: "+json.error);
        }
        setLoading(false);
    };

    
    const refresh = () =>{
        setRefreshing(false);
        getPerfilUsuario();
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

                    <InfoProfileArea>
                        {usuarioInfo.imagee ?
                            <ProfileAvatar source={{uri: usuarioInfo.image}} />
                            :
                            <ProfileAvatarDefault/>
                        }
                         <TitleNameProfile>{usuarioInfo.nome}</TitleNameProfile>
                    </InfoProfileArea>
             
                    <EmailProfileArea>
                        <TextBold>{usuarioInfo.email}</TextBold>
                    </EmailProfileArea>

                    <Linha/>

                    {loading &&
                        <LoadingIcon size="large" color="#000000" />
                    }

                    <PerfilButton>
                        <ButtonWhiteText>Atualizar perfil</ButtonWhiteText>
                    </PerfilButton>

                    <PerfilButton>
                        <ButtonWhiteText>Alterar e-mail</ButtonWhiteText>
                    </PerfilButton>

                    <PerfilButton>
                        <ButtonWhiteText>Alterar senha</ButtonWhiteText>
                    </PerfilButton>

                    <Linha/>

                    <PdfButton>
                        <ButtonWhiteText>Enviar um currículo em PDF</ButtonWhiteText>
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