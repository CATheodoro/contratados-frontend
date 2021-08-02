import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import ConfirmModal from '../../../../components/ConfirmModal';

import BackIcon from '../../../../assets/back.svg';


//Styles    ###########################################################

import { PageBody, UserInfoArea, UserInfo, UserInfoName, CargoItem, CargoInfo, CargoName, CargoSetor, SimpleButtonInfoArea, CargoArea } from './styles';

import { Container, Scroller, LoadingIcon } from '../../../styles/Basic';

import { BackgroundImageOpen, BackgroundImageClosed, EmpresaAnuncioAvatarDefault, EmpresaAnuncioAvatar } from '../../../styles/Image';

import { ButtonBlackText, ButtonWhiteText, CustomButtonText, SubTitle, Text, TextBold, TextWhite, Title } from '../../../styles/Text';

import { DescriptionArea, EntreEspacos, EntreEspacosGrande, Linha, TitleArea } from '../../../styles/View';

import { BackButtom, CustomListButton, PerfilBlueButton, PerfilButton, SimpleButton } from '../../../styles/Button';

//Styles END ###########################################################

import Api from '../../../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        titulo: route.params.titulo,
        statusAnuncio: route.params.statusAnuncio,
        image: route.params.image,
        nomeEmpresa: route.params.nomeEmpresa,
        requisitos: route.params.requisitos,
        localidade: route.params.localidade,
        uf: route.params.uf,
    });

    const [perfil, setPerfil] = useState({
        perfil: route.params.perfil
    });


    const [loading, setLoading] = useState(false);


    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getVagaInfo = async () => {
            let json = await Api.getVaga(userInfo.id);

            if (json) {
                setUserInfo(json);
            } else {
                alert("Erro: " + json.error);
            }
            setLoading(false);
        };
        getVagaInfo();
    }, []);

    const handleBackButton = () => {
        navigation.navigate('Home');
    }

    const handleEmpresaClick = () => {
        navigation.navigate('ProfileEmpresa', {
            empresaId: userInfo.empresaId,
            nomeEmpresa: userInfo.nomeEmpresa,
            email: userInfo.email,
            celular: userInfo.celular,
            telefone: userInfo.telefone,
        });
    }

    const handleAddSetorCargoClick = () => {
        navigation.navigate('CreateSetorCargo', {
            id: userInfo.id,
            titulo: userInfo.titulo,
            nome: userInfo.nomeEmpresa,
            email: userInfo.email,
            object: ''
        });
    }

    const handlePutSetorCargoClick = (key) => {
        navigation.navigate('CreateSetorCargo', {
            id: userInfo.id,
            titulo: userInfo.titulo,
            nome: userInfo.nomeEmpresa,
            email: userInfo.email,
            object: userInfo.setorCargoResponses[key]

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


    const handleClick = () => {
        navigation.navigate('CreateAnuncioVaga', {
            empresaId: userInfo.empresaId,

            id: userInfo.id,
            titulo: userInfo.titulo,
            requisitos: userInfo.requisitos,
            descricao: userInfo.descricao,

            statusAnuncio: userInfo.statusAnuncio,

            cargaHoraria: userInfo.cargaHoraria,
            salario: userInfo.salario,

            cep: userInfo.cep,
            logradouro: userInfo.logradouro,
            complemento: userInfo.complemento,
            bairro: userInfo.bairro,
            localidade: userInfo.localidade,
            uf: userInfo.uf,
            numero: userInfo.numero,

            atualizar: 'atualizar'

        });
    }

    
    const handleSolicitacoesClick = () => {

        navigation.navigate('FilterAnuncioVagaSolicitacoes', {
            empresaId: userInfo.empresaId,
            id: userInfo.id,
            titulo: userInfo.titulo
        });
    }

    return (
        <Container>

            <Scroller>
                {userInfo.statusAnuncio ?
                    <BackgroundImageOpen />
                    :
                    <BackgroundImageClosed />
                }

                <PageBody>

                    <UserInfoArea>
                        {userInfo.imagee ?
                            <EmpresaAnuncioAvatar source={{ uri: userInfo.image }} />
                            :
                            <EmpresaAnuncioAvatarDefault />
                        }

                        <UserInfo>
                            <UserInfoName>{userInfo.nomeEmpresa}</UserInfoName>
                            <SimpleButtonInfoArea onPress={handleEmpresaClick}>
                                <ButtonBlackText>Ver perfil da empresa</ButtonBlackText>
                            </SimpleButtonInfoArea>
                        </UserInfo>


                    </UserInfoArea>

                    <TitleArea>
                        <SubTitle>{userInfo.titulo}</SubTitle>
                    </TitleArea>

                    <Linha />

                    <EntreEspacosGrande />

                    {perfil.perfil === 'EMPRESA' &&
                        <>
                            <PerfilBlueButton onPress={() => handleClick()}>
                                <TextWhite>Atualizar anúncio</TextWhite>
                            </PerfilBlueButton>

                            <PerfilBlueButton onPress={() => handleSolicitacoesClick()}>
                                <TextWhite>Ver solicitações</TextWhite>
                            </PerfilBlueButton>

                            <EntreEspacosGrande />
                            <Linha />
                        </>
                    }

                    <DescriptionArea>
                        <TextBold>Descrição da vaga</TextBold>
                        <Text>{userInfo.descricao}</Text>

                        <TextBold>Requisitos: <Text>{userInfo.requisitos}</Text></TextBold>
                        <EntreEspacos />
                        {userInfo.cargaHoraria &&
                            <TextBold>Carga horária: <Text>{userInfo.cargaHoraria}</Text></TextBold>
                        }
                        <EntreEspacos />
                        {userInfo.salario &&
                            <TextBold>Salário: <Text>{userInfo.salario}</Text></TextBold>
                        }
                    </DescriptionArea>


                    <SubTitle>Contatos</SubTitle>
                    <DescriptionArea>
                        <TextBold>Email: <Text>{userInfo.email}</Text></TextBold>
                        {userInfo.celular &&
                            <TextBold>Celular: <Text>{userInfo.celular}</Text></TextBold>
                        }
                        {userInfo.telefone &&
                            <TextBold>Telefone: <Text>{userInfo.telefone}</Text></TextBold>
                        }
                    </DescriptionArea>

                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <SubTitle>Localização</SubTitle>
                    <DescriptionArea>
                        <TextBold>Cidade: <Text>{userInfo.localidade}</Text></TextBold>
                        <TextBold>Estado: <Text>{userInfo.uf}</Text></TextBold>
                        <TextBold>Rua: <Text>{userInfo.logradouro}</Text></TextBold>
                        {userInfo.complemento &&
                            <TextBold>Número: <Text>{userInfo.numero}</Text></TextBold>
                        }
                        {userInfo.complemento &&
                            <TextBold>Complemento: <Text>{userInfo.complemento}</Text></TextBold>
                        }
                    </DescriptionArea>


                    {userInfo.setorCargoResponses &&
                        <DescriptionArea>
                            <Title>Lista de cargos</Title>

                            {userInfo.setorCargoResponses.map((item, id) => (
                                <CargoItem key={id}>
                                    <CargoInfo>
                                        <CargoName>{item.cargo}</CargoName>
                                        {item.cargo &&
                                            <CargoSetor>Setor: {item.setor}</CargoSetor>
                                        }
                                    </CargoInfo>
                                    {perfil.perfil === 'EMPRESA' &&
                                        <CustomListButton onPress={() => handlePutSetorCargoClick(id)}>
                                            <CustomButtonText>Atualizar</CustomButtonText>
                                        </CustomListButton>
                                    }

                                </CargoItem>
                            ))}
                            {perfil.perfil === 'EMPRESA' &&
                                <SimpleButton onPress={() => handleAddSetorCargoClick()}>
                                    <ButtonWhiteText>Adicionar novo setor e cargo</ButtonWhiteText>
                                </SimpleButton>
                            }
                        </DescriptionArea>
                    }
                    {userInfo.statusAnuncio && perfil.perfil !== 'EMPRESA' &&
                        <SimpleButton onPress={() => handleCargoChoose(userInfo, "Deseja enviar o currículo para " + userInfo.nomeEmpresa + " ?", "enviar")}>
                            <ButtonWhiteText>Enviar Currículo</ButtonWhiteText>
                        </SimpleButton>
                    }

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