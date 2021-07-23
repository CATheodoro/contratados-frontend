import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import ConfirmModal from '../../../components/ConfirmModal';

import BackIcon from '../../../assets/back.svg';
import FavoriteFullIcon from '../../../assets/favorite_full.svg'


//Styles    ###########################################################

import { PageBody, UserInfoArea, UserInfoName, CargoItem, CargoInfo, CargoName, CargoSetor } from './styles';

import { Container, Scroller, LoadingIcon } from '../../styles/Basic';

import { BackgroundImageOpen, BackgroundImageClosed, EmpresaAnuncioAvatarDefault, EmpresaAnuncioAvatar } from '../../styles/Image';

import { BigTextBold, ButtonWhiteText, SubTitle, Text, TextBold, Title } from '../../styles/Text';

import { DescriptionArea, EntreEspacos, EntreEspacosGrande, InvisibleDescriptionArea, Linha } from '../../styles/View';

import { CirculateButton, BackButtom, SimpleButton, SimpleButtonRed, PerfilButton } from '../../styles/Button';

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

    const handleCargoChoose = (info, description, escolha) => {
        setTypeInfo(info);
        setTextDescription(description);
        setEscolha(escolha)
        setShowModal(true);
    }

    const handleClick = () =>{
        navigation.navigate('AnuncioVaga', {
            id: solicitacaoInfo.anuncioVagaId,
            titulo: solicitacaoInfo.titulo,
            nomeEmpresa: solicitacaoInfo.nomeEmpresa,
        })
    }

    return (
        <Container>

            <Scroller>

                <BackgroundImageOpen />

                <PageBody>

                    <UserInfoArea>

                        <EmpresaAnuncioAvatarDefault />


                        <UserInfoName>{solicitacaoInfo.nomeEmpresa}</UserInfoName>

                        <CirculateButton onPress={handleEmpresaClick}>
                            <FavoriteFullIcon width="24" height="24" fill="#63C2D1" />
                        </CirculateButton>
                    </UserInfoArea>

                    <SubTitle>{solicitacaoInfo.titulo}</SubTitle>
                    <Linha />
                    <EntreEspacos />

                    <PerfilButton onPress={() => handleClick()}>
                        <Text>Ver anúncio</Text>
                    </PerfilButton>

                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <SubTitle>Estado de entrevista</SubTitle>
                    <DescriptionArea>
                        <TextBold>Empresa: <Text>{solicitacaoInfo.solicitacaoEmpresaStatus}</Text></TextBold>
                        <TextBold>Usuario: <Text>{solicitacaoInfo.solicitacaoUsuarioStatus}</Text></TextBold>
                    </DescriptionArea>

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



                    {solicitacaoInfo.setorCargoResponses &&
                        <DescriptionArea>
                            <Title>Lista de cargos</Title>
                            {
                            solicitacaoInfo.setorCargoResponses.map((item, key) => (
                                <CargoItem key={key}>
                                    <CargoInfo>
                                        <CargoName>{item.cargo}</CargoName>
                                        {item.cargo &&
                                            <CargoSetor>Setor: {item.setor}</CargoSetor>
                                        }
                                    </CargoInfo>
                                </CargoItem>
                            ))}

                        </DescriptionArea>
                    }
                    {solicitacaoInfo.solicitacaoEmpresaStatus === 'ACEITO' && solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && solicitacaoInfo.solicitacaoUsuarioStatus != 'ACEITO'?
                        <>
                            <SimpleButton onPress={() => handleCargoChoose(solicitacaoInfo, "Deseja aceitar data de entrevista proposta ? " + solicitacaoInfo.nomeEmpresa, "aceitar")}>
                                <ButtonWhiteText>Confirmar a solicitação</ButtonWhiteText>
                            </SimpleButton>

                            <SimpleButtonRed onPress={() => handleCargoChoose(solicitacaoInfo, "Deseja cancelar a solicitação enviada para " + solicitacaoInfo.nomeEmpresa + " ?", "cancelar")}>
                                <ButtonWhiteText>Cancelar a solicitação</ButtonWhiteText>
                            </SimpleButtonRed>

                        </>

                        : solicitacaoInfo.solicitacaoUsuarioStatus != 'CANCELADO' && solicitacaoInfo.solicitacaoEmpresaStatus != 'RECUSADO' && solicitacaoInfo.solicitacaoEmpresaStatus &&

                        <SimpleButton onPress={() => handleCargoChoose(solicitacaoInfo, "Deseja cancelar a solicitação enviada para " + solicitacaoInfo.nomeEmpresa + " ?", "cancelar")}>
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