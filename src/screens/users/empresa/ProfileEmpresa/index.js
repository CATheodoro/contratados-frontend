import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import BackIcon from '../../../../assets/back.svg';


//Styles    ###########################################################

import { } from './styles';

import { Container, Scroller, LoadingIcon } from '../../../styles/Basic';

import { BackgroundImageProfile } from '../../../styles/Image';

import { PageBodyProfile, Linha, DescriptionProfileArea, DescriptionArea } from '../../../styles/View';

import { Title, Text, TextBold, SubTitle } from '../../../styles/Text';

import { BackButtom } from '../../../styles/Button';

//Styles END ###########################################################

import Api from '../../../../Api';
import InfoTopProfile from '../../../../components/InfoTopProfile';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [empresaInfo, setEmpresaInfo] = useState({
        id: route.params.empresaId,
        nome: route.params.nomeEmpresa,
        email: route.params.email,
        celular: route.params.celular,
        telefone: route.params.telefone,
    });

    const [loading, setLoading] = useState(false);

    const getPerfilEmpresa = async () =>{
        setLoading(true);
        let json = await Api.getPerfilEmpresa(empresaInfo.id);
        if(json){
            setEmpresaInfo(json);
        } else {
            alert("Erro: "+json.error);
        }
        setLoading(false);
    };

    useEffect(()=>{
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

                <InfoTopProfile nome={empresaInfo.nome} email={empresaInfo.email} image={''} />
                   

                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <DescriptionProfileArea>
                        <TextBold>Sobre nós</TextBold>
                        <Text>{empresaInfo.descricao}</Text>
                        <Linha/>
                        <TextBold>Data de fundação: <Text>{empresaInfo.dataFundacaoFormatado}</Text></TextBold>
                    </DescriptionProfileArea>

                    <SubTitle>Contatos</SubTitle>
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