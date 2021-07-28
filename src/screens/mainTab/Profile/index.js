import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { } from './styles';

import { BackgroundImageProfile } from '../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../styles/Basic';

import { PageBodyProfile, Linha, EntreEspacosGrande } from '../../styles/View';

import { ExitButtonProfileText, ButtonWhiteText, Text, TextOrange, TextGreen } from '../../styles/Text';

import { ExitButtonProfile, PdfButton, PerfilButton } from '../../styles/Button';

//Styles END ###########################################################


import Api from '../../../Api';

import LockIcon from '../../../assets/lock.svg';
import ProfileIcon from '../../../assets/name-id.svg';
import EmailIcon from '../../../assets/email.svg';
import UpdateIcon from '../../../assets/registration.svg';
import CircleIcon from '../../../assets/circle.svg';



import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native';
import InfoTopProfile from '../../../components/InfoTopProfile';

import * as OpenAnyThing from 'react-native-openanything';

import StatusModal from '../../../components/StatusModal';

export default () => {

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState([]);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [perfil, setPerfil] = useState(AsyncStorage.getItem('perfil'));

    const getPerfil = async () => {
        setPerfil(await AsyncStorage.getItem('perfil'));
    }

    const getPerfilUsuario = async () => {
        setLoading(true)
        let json = await Api.getPerfilUsuario();
        if (json) {
            setUserInfo(json);
        } else {
            alert("Erro: " + json.error);
        }
        setLoading(false);
    };

    const getPerfilEmpresa = async () => {
        setLoading(true);
        let json = await Api.getPerfilEmpresa();
        if (json) {
            setUserInfo(json);
        } else {
            alert("Erro: " + json.error);
        }
        setLoading(false);
    };


    const getUserPerfilLogado = () => {
        if (perfil === 'USUARIO') {
            getPerfilUsuario();
        } else {
            getPerfilEmpresa();
        }
    }


    useEffect(() => {
        getPerfil();
        getUserPerfilLogado();
    }, []);

    const refresh = () => {
        setRefreshing(false);
        if (perfil === 'USUARIO') {
            getPerfilUsuario();
        } else {
            getPerfilEmpresa();
        }
    }

    const handlChange = typeString => {
        if (perfil === 'USUARIO') {
            getPerfilUsuario();
        } else {
            getPerfilEmpresa();
        }
        navigation.navigate('ProfileUpdateEmailPassword', {
            nome: userInfo.nome,
            email: userInfo.email,
            type: typeString,
            perfil: perfil
        });
    }

    const handleChangePerfil = () => {
        if (perfil === 'USUARIO') {
            getPerfilUsuario();
            navigation.navigate('ProfileUsuarioUpdate', {
                nome: userInfo.nome,
                email: userInfo.email,

                dataNascimento: '',

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

                perfil: perfil
            });
        } else {
            getPerfilEmpresa();
            navigation.navigate('ProfileUsuarioUpdate', {
                nome: userInfo.nome,
                email: userInfo.email,

                descricao: userInfo.descricao,

                celular: userInfo.celular,
                telefone: userInfo.telefone,

                cnpj: userInfo.cnpj,

                dataFundacao: '',

                perfil: perfil
            });
        }

    }

    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = async () => {
        await AsyncStorage.clear();
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    const handleChangeStatus = () => {
        getPerfilUsuario();

        setShowModal(true);
    }


    const handleVerPerfil = () => {
        if (perfil === 'USUARIO') {
            getPerfilUsuario();
            navigation.navigate('ProfileUsuario', {
                id: userInfo.id,
                nome: userInfo.nome,
                email: userInfo.email,

                celular: userInfo.celular,
                telefone: userInfo.telefone,
            })
        } else {
            navigation.navigate('ProfileEmpresa', {
                id: userInfo.id,
                nome: userInfo.nome,
                email: userInfo.email,

                celular: userInfo.celular,
                telefone: userInfo.telefone,

            });
        }
    }



    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    {loading &&
                        <LoadingIconBasic size="large" color="#000000" />
                    }

                    <EntreEspacosGrande />

                    <PerfilButton onPress={() => handleVerPerfil()}>
                        <ProfileIcon width="24" height="24" fill="#268596" />
                        <Text>Ver perfil</Text>
                    </PerfilButton>
                    <EntreEspacosGrande />


                    {perfil === 'USUARIO' &&
                        <>
                            <PerfilButton onPress={() => handleChangeStatus()}>
                                {userInfo.status == 'DISPONIVEL' ?
                                    <CircleIcon width="24" height="24" fill="#2ECC40" />
                                    :
                                    <CircleIcon width="24" height="24" fill="#FF851B" />
                                }
                                <Text>Definir status</Text>
                                {userInfo.status == 'DISPONIVEL' ?
                                    <TextGreen>Disponível</TextGreen>
                                    :
                                    <TextOrange>Indisponível</TextOrange>
                                }
                            </PerfilButton>
                            <EntreEspacosGrande />
                        </>
                    }

                    <Linha />
                    <EntreEspacosGrande />

                    <PerfilButton onPress={() => handleChangePerfil()}>
                        <UpdateIcon width="24" height="24" fill="#268596" />
                        <Text>Atualizar perfil</Text>
                    </PerfilButton>

                    <PerfilButton onPress={() => handlChange('e-mail')}>
                        <EmailIcon width="24" height="24" fill="#268596" />
                        <Text>Alterar e-mail</Text>
                    </PerfilButton>

                    <PerfilButton onPress={() => handlChange('senha')}>
                        <LockIcon width="24" height="24" fill="#268596" />
                        <Text>Alterar senha</Text>
                    </PerfilButton>

                    {perfil === 'USUARIO' && userInfo.linkCurriculo != null &&
                        <>
                            <Linha />
                            <PdfButton onPress={() => OpenAnyThing.Pdf(userInfo.linkCurriculo)}>
                                <ButtonWhiteText>Visualizar o currículo</ButtonWhiteText>
                            </PdfButton>
                            <Linha />
                        </>
                    }


                    <ExitButtonProfile onPress={() => handleLogoutClick()}>
                        <ExitButtonProfileText>Sair da conta</ExitButtonProfileText>
                    </ExitButtonProfile>

                </PageBodyProfile>

                <StatusModal
                    show={showModal}
                    setShow={setShowModal}
                    status={userInfo.status}
                />

            </Scroller>

        </Container>
    );
}