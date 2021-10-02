import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../../Api'

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButtom,

    LoadingIcon,
    ListArea,

} from './styles';

import VagaItem from '../../../components/VagaItem';

import SearchIcon from '../../../assets/search.svg';
import PlusRoundIcon from '../../../assets/plus-round.svg';

import { EntreEspacosGrande, Linha } from '../../styles/View';
import { PerfilButton } from '../../styles/Button';
import { SubTitle, Text } from '../../styles/Text';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [userInfo, setUserInfo] = useState([]);
    const [perfil, setPerfil] = useState('');
    const [perfilId, setPerfilId] = useState('');

    const getPerfil = async () => {
        setPerfil(await AsyncStorage.getItem('perfil'));
        setPerfilId(await AsyncStorage.getItem('id'));
    }

    const getPerfilUsuario = async () => {
        let json = await Api.getPerfilUsuario(perfilId);
        if (json) {
            setUserInfo(json);
        } else {
            alert("Erro: " + json.error);
        }
    };

    const getVagas = async () => {
        setLoading(true);

        let res = await Api.getVagas();

        if (res.content) {
            setList(res.content);
        } else {
            alert("Erro" + res.error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getPerfil();
        getVagas();
    }, []);

    const refresh = () => {
        setRefreshing(false);
        getVagas();
        getPerfilUsuario();
    }

    const handleClick = () => {
        navigation.navigate('CreateAnuncioVaga', {
            empresaId: perfilId,
            cargaHoraria: '',
            atualizar: ''
        });
    }

    const handleChangeCurriculo = () => {
        navigation.navigate('ProfileUsuarioUpdateCurriculo', {
            nome: userInfo.nome,
            email: userInfo.email,
            linkCurriculo: userInfo.linkCurriculo,
        });
    }

    const handleExperiencia = () => {
        navigation.navigate('ProfileExperienciaFormacao', {
            nome: userInfo.nome,
            email: userInfo.email,
            experiencia: userInfo.experiencia,
            formacao: '',
            perfil: userInfo.perfil,
        });
    }

    const handlFormacao = () => {
        navigation.navigate('ProfileExperienciaFormacao', {
            nome: userInfo.nome,
            email: userInfo.email,
            experiencia: '',
            formacao: userInfo.formacao,
            perfil: userInfo.perfil,
        });
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>

                <HeaderArea>

                    {perfil === 'USUARIO' ?
                        <HeaderTitle >Pronto para encontrar um novo emprego ?</HeaderTitle>
                        :
                        <HeaderTitle >Pronto para encontrar o funcionário ideal ?</HeaderTitle>
                    }
                    <SearchButtom onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#63C2D1" />
                    </SearchButtom>
                </HeaderArea>
                <Linha />

                {perfil === 'EMPRESA' ?
                    <>
                        <EntreEspacosGrande />
                        <PerfilButton onPress={() => handleClick()}>
                            <PlusRoundIcon width="26" height="26" fill="#63C2D1" />
                            <Text>Criar um novo anúncio</Text>
                        </PerfilButton>
                        <EntreEspacosGrande />
                        <Linha />
                    </>
                    : userInfo.linkCurriculo === null &&
                    <>
                        <SubTitle>🏁 Vamos começar</SubTitle>

                        <PerfilButton onPress={() => handleChangeCurriculo()}>
                            <Text>📑 Adicione um cúrriculo</Text>
                        </PerfilButton>

                        <PerfilButton onPress={() => handleExperiencia()}>
                            <Text>💼 Informe suas experiências</Text>
                        </PerfilButton>

                        <PerfilButton onPress={() => handlFormacao()}>
                            <Text>🎓 Informe suas formações</Text>
                        </PerfilButton>

                        <SubTitle>😀 E seja contratado</SubTitle>
                        <EntreEspacosGrande />
                        <Linha />
                    </>
                }

                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {list.map(item => (
                        <VagaItem key={item.id} data={item} perfil={perfil} />
                    ))}
                </ListArea>

            </Scroller>
        </Container >
    );
}