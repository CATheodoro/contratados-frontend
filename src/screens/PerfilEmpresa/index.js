import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import BackIcon from '../../assets/back.svg';


//Styles    ###########################################################

import { } from './styles';

import { Container, Scroller, LoadingIcon } from '../styles/Basic';

import { BackgroundImageProfile } from '../styles/Image';

import { PageBodyProfile, InfoProfileArea, Linha, DescriptionProfileArea, DescriptionArea } from '../styles/View';

import { ProfileAvatar, ProfileAvatarDefault } from '../styles/Image';

import { TitleNameProfile, Title, Text, TextBold } from '../styles/Text';

import { BackButtom } from '../styles/Button';

//Styles END ###########################################################

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [empresaInfo, setEmpresaInfo] = useState({
        id: route.params.empresaId,
        nomeFantasia: route.params.nomeEmpresa,
        email: route.params.email,
        celular: route.params.celular,
        telefone: route.params.telefone,
    });

    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true)
        const getPerfilEmpresa = async () =>{
            let json = await Api.getPerfilEmpresa(empresaInfo.id);
            if(json){
                setEmpresaInfo(json);
            } else {
                alert("Erro: "+json.error);
            }
            setLoading(false);
        };
        getPerfilEmpresa();
    },[]);

    const handleBackButton = () =>{
        navigation.goBack();
    }

    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />      
                <PageBodyProfile>

                    <InfoProfileArea>
                        {empresaInfo.imagee ?
                            <ProfileAvatar source={{uri: empresaInfo.image}} />
                            :
                            <ProfileAvatarDefault/>
                        }
                         <TitleNameProfile>{empresaInfo.nomeFantasia}</TitleNameProfile>
                    
                    </InfoProfileArea>

                    <Linha />
                   

                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <DescriptionProfileArea>
                        <Title>Sobre nós</Title>
                        <Text>{empresaInfo.descricao}</Text>

                        <TextBold>Data de fundação: <Text>{empresaInfo.dataFundacao}</Text></TextBold>
                    </DescriptionProfileArea>

                    <Title>Contatos</Title>
                    <DescriptionArea>
                        <TextBold>Email: <Text>{empresaInfo.email}</Text></TextBold>
                        {empresaInfo.celular &&
                            <TextBold>Celular: <Text>{empresaInfo.celular}</Text></TextBold>
                        }
                        {empresaInfo.telefone &&
                            <TextBold>Telefone: <Text>{empresaInfo.telefone}</Text></TextBold>
                        }
                    </DescriptionArea>

                    <DescriptionArea>
                        <TextBold>Data de criação do perfil: <Text>{empresaInfo.dataCriacaoPerfil}</Text></TextBold> 
                    </DescriptionArea>

                </PageBodyProfile>

            </Scroller>
            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}