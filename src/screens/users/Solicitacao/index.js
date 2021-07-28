import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import ConfirmModal from '../../../components/ConfirmModal';

import BackIcon from '../../../assets/back.svg';
import FavoriteFullIcon from '../../../assets/favorite_full.svg'


//Styles    ###########################################################

import { PageBody, UserInfoArea, UserInfoName, UserInfo, SimpleButtonInfoArea } from './styles';

import { Container, Scroller, LoadingIcon } from '../../styles/Basic';

import { BackgroundImageOpen, BackgroundImageClosed, EmpresaAnuncioAvatarDefault, EmpresaAnuncioAvatar } from '../../styles/Image';

import { BigTextBold, ButtonBlackText, ButtonWhiteText, SubTitle, Text, TextBold, TextWhite, Title } from '../../styles/Text';

import { DescriptionArea, EntreEspacos, EntreEspacosGrande, InvisibleDescriptionArea, Linha } from '../../styles/View';

import { CirculateButton, BackButtom, SimpleButton, SimpleButtonRed, PerfilButton, PerfilBlueButton } from '../../styles/Button';

//Styles END ###########################################################

import Api from '../../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [solicitacaoInfo, setUserSolicitacaoInfo] = useState({
        titulo: route.params.titulo,
        solicitacaoEmpresaStatus: route.params.solicitacaoEmpresaStatus,
        solicitacaoUsuarioStatus: route.params.solicitacaoUsuarioStatus,
        id: route.params.solicitacaoId,

        usuarioId: route.params.usuarioId,
        nomeUsuario: route.params.nomeUsuario,
    });


    const [typeProfile, setTypeProfile] = useState({
        perfil: route.params.perfil,
    });

    const [loading, setLoading] = useState(false);


    const [showModal, setShowModal] = useState(false);

    const getSolicitacao = async () => {
        setLoading(true);

        let res = await Api.getSolicitacao(solicitacaoInfo.id);

        if (res) {
            setUserSolicitacaoInfo(res);
        } else {
            alert("Erro" + res.error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getSolicitacao();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleEmpresaClick = () => {
        navigation.navigate('ProfileEmpresa', {
            empresaId: solicitacaoInfo.empresaId,
        });
    }

    const [textDescription, setTextDescription] = useState('');
    const [typeInfo, setTypeInfo] = useState(null);
    const [escolha, setEscolha] = useState('');

    const handleSolicitacaoChoose = (info, description, escolha) => {
        setTypeInfo(info);
        setTextDescription(description);
        setEscolha(escolha)
        setShowModal(true);
    }

    const handleSolicitacaoUpdate = () => {
        navigation.navigate('SolicitacaoEmpresaUpdate',{
            id: solicitacaoInfo.id,
            empresaId: solicitacaoInfo.empresaId,
            descricao: solicitacaoInfo.descricao,
            horaEntrevista: solicitacaoInfo.horaEntrevista,
            dataEntrevista: solicitacaoInfo.dataEntrevista,
            
            enderecoCep: solicitacaoInfo.enderecoCep,
            complemento: solicitacaoInfo.complemento,
            numero: solicitacaoInfo.numero
        
          });
    }

    const handleClick = () => {
        navigation.navigate('AnuncioVaga', {
            id: solicitacaoInfo.anuncioVagaId,
            titulo: solicitacaoInfo.titulo,
            nomeEmpresa: solicitacaoInfo.nomeEmpresa,
            perfil: typeProfile.perfil,
        })
    }

    const handleSolicitanteClick = () => {
        navigation.navigate('ProfileUsuario', {
            id: solicitacaoInfo.usuarioId,
            nomeUsuario: solicitacaoInfo.nomeUsuario,
        })
    }




    return (
        <Container>

            <Scroller>

                <BackgroundImageOpen />

                <PageBody>

                    <UserInfoArea>

                        <EmpresaAnuncioAvatarDefault />

                        <UserInfo>
                            <UserInfoName>{solicitacaoInfo.nomeEmpresa}</UserInfoName>
                            <SimpleButtonInfoArea onPress={handleEmpresaClick}>
                                <ButtonBlackText>Ver perfil da empresa</ButtonBlackText>
                            </SimpleButtonInfoArea>
                        </UserInfo>

                    </UserInfoArea>

                    <SubTitle>{solicitacaoInfo.titulo}</SubTitle>
                    <Linha />
                    <EntreEspacos />

                    <PerfilBlueButton onPress={() => handleClick()}>
                        <TextWhite>Ver anúncio</TextWhite>
                    </PerfilBlueButton>
                    {typeProfile.perfil !== 'USUARIO' &&
                        <>
                            <EntreEspacos />
                            <Linha />
                            <SubTitle>{solicitacaoInfo.nomeUsuario}</SubTitle>
                            <PerfilBlueButton onPress={() => handleSolicitanteClick()}>
                                <TextWhite>Ver perfil do solicitante</TextWhite>
                            </PerfilBlueButton>
                        </>
                    }
                    <EntreEspacos />
                    <Linha />

                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <SubTitle>Estado de entrevista</SubTitle>
                    <DescriptionArea>
                        <TextBold>Empresa: <Text>{solicitacaoInfo.solicitacaoEmpresaStatus}</Text></TextBold>
                        <TextBold>Usuario: <Text>{solicitacaoInfo.solicitacaoUsuarioStatus}</Text></TextBold>
                    </DescriptionArea>

                    {solicitacaoInfo.descricao &&
                        <>
                            <SubTitle>Descrição da entrevista</SubTitle>
                            <DescriptionArea>
                                <TextBold>Data: <Text>{solicitacaoInfo.descricao}</Text></TextBold>
                            </DescriptionArea>
                        </>
                    }

                    {solicitacaoInfo.cep &&
                        <>
                            <SubTitle>Local de entrevista</SubTitle>
                            <DescriptionArea>
                                <TextBold>Cidade: <Text>{solicitacaoInfo.localidade}</Text></TextBold>
                                <TextBold>Estado: <Text>{solicitacaoInfo.uf}</Text></TextBold>
                                <TextBold>Rua: <Text>{solicitacaoInfo.logradouro}</Text></TextBold>
                                {solicitacaoInfo.complemento &&
                                    <TextBold>Número: <Text>{solicitacaoInfo.numero}</Text></TextBold>
                                }
                                {solicitacaoInfo.complemento &&
                                    <TextBold>Complemento: <Text>{solicitacaoInfo.complemento}</Text></TextBold>
                                }
                            </DescriptionArea>
                        </>
                    }

                    {solicitacaoInfo.horaEntrevista &&
                        <>
                            <SubTitle>Horário para a entrevista</SubTitle>
                            <DescriptionArea>
                                <TextBold>Data: <Text>{solicitacaoInfo.dataEntrevista}</Text></TextBold>
                                <TextBold>Hora: <Text>{solicitacaoInfo.horaEntrevista}</Text></TextBold>
                            </DescriptionArea>
                        </>
                    }

                    {solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && typeProfile.perfil === 'EMPRESA' && solicitacaoInfo.solicitacaoEmpresaStatus === 'PENDENTE' ?
                        <>
                            <SimpleButton onPress={() => handleSolicitacaoChoose(solicitacaoInfo, "Deseja aceitar a solicitação de " + solicitacaoInfo.nomeEmpresa + " ?", "aceitarSolicitacao")}>
                                <ButtonWhiteText>Marcar uma entrevista</ButtonWhiteText>
                            </SimpleButton>

                            <SimpleButtonRed onPress={() => handleSolicitacaoChoose(solicitacaoInfo, "Deseja recusar a solicitação de " + solicitacaoInfo.nomeUsuario + " ?", "cancelarSolicitacao")}>
                                <ButtonWhiteText>Recusar solicitação</ButtonWhiteText>
                            </SimpleButtonRed>
                        </>
                        : solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && typeProfile.perfil === 'EMPRESA' && solicitacaoInfo.solicitacaoEmpresaStatus === 'ACEITO' && solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' ?

                            <SimpleButton onPress={() => handleSolicitacaoUpdate()}>
                                <ButtonWhiteText>Atualizar informações da solicitação</ButtonWhiteText>
                            </SimpleButton>

                            : typeProfile.perfil !== 'EMPRESA' && solicitacaoInfo.solicitacaoEmpresaStatus === 'ACEITO' && solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && solicitacaoInfo.solicitacaoUsuarioStatus != 'ACEITO' ?
                                <>
                                    <SimpleButton onPress={() => handleSolicitacaoChoose(solicitacaoInfo, "Deseja aceitar data de entrevista proposta da " + solicitacaoInfo.nomeEmpresa + " ?", "aceitar")}>
                                        <ButtonWhiteText>Confirmar a solicitação</ButtonWhiteText>
                                    </SimpleButton>

                                    <SimpleButtonRed onPress={() => handleSolicitacaoChoose(solicitacaoInfo, "Deseja cancelar a solicitação enviada para " + solicitacaoInfo.nomeEmpresa + " ?", "cancelar")}>
                                        <ButtonWhiteText>Cancelar a solicitação</ButtonWhiteText>
                                    </SimpleButtonRed>
                                </>

                                : typeProfile.perfil !== 'EMPRESA' && solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && solicitacaoInfo.solicitacaoEmpresaStatus != 'RECUSADO' && solicitacaoInfo.solicitacaoEmpresaStatus &&

                                <SimpleButton onPress={() => handleSolicitacaoChoose(solicitacaoInfo, "Deseja cancelar a solicitação enviada para " + solicitacaoInfo.nomeEmpresa + " ?", "cancelar")}>
                                    <ButtonWhiteText>Cancelar a solicitação</ButtonWhiteText>
                                </SimpleButton>


                    }

                    <EntreEspacosGrande />

                </PageBody>

            </Scroller>
            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

            <ConfirmModal
                show={showModal}
                setShow={setShowModal}
                user={typeInfo}
                description={textDescription}
                choose={escolha}
            />

        </Container>
    );
}