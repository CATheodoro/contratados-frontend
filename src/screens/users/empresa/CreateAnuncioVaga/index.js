import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, LinhaCentral, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';

import { PageBodyProfile, DescriptionArea, InvisibleDescriptionArea, InvisibleSmallDescriptionArea } from '../../../styles/View';

import { TextBold, Title, Text } from '../../../styles/Text';

import { BackButtom, DangerButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import BackIcon from '../../../../assets/back.svg';
import Dollar from '../../../../assets/dollar.svg';
import InfoTopProfile from '../../../../components/InfoTopProfile';
import RelogioIcon from '../../../../assets/relogio.svg';
import FileIcon from '../../../../assets/file.svg';
import TagIcon from '../../../../assets/tag.svg';
import MenuBarIcon from '../../../../assets/menu-bar.svg';
import GpsIcon from '../../../../assets/gps.svg';


import TimePiker from '@react-native-community/datetimepicker';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        nome: route.params.nome,

        empresaId: route.params.empresaId,

        titulo: route.params.titulo,
        requisitos: route.params.requisitos,
        descricao: route.params.descricao,

        statusAnuncio: route.params.statusAnuncio,

        cargaHoraria: route.params.cargaHoraria,
        salario: route.params.salario,

        cep: route.params.cep,
        logradouro: route.params.logradouro,
        complemento: route.params.complemento,
        bairro: route.params.bairro,
        localidade: route.params.localidade,
        uf: route.params.uf,
        numero: route.params.numero,

    });

    const [empresaInfo, setEmpresa] = useState([]);

    const [type, setType] = useState({
        atualizar: route.params.atualizar,
    });


    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

    const [viaCep, setViaCep] = useState({})

    const [tituloField, setTituloField] = useState(userInfo.titulo);
    const [requisitoField, setRequisitoField] = useState(userInfo.requisitos);
    const [descricaoField, setDescricaoField] = useState(userInfo.descricao);

    const [enderecoCepField, setEnderecoCepField] = useState(userInfo.cep);
    const [complementoField, setComplementoField] = useState(userInfo.complemento);
    const [numeroField, setNumeroField] = useState(userInfo.numero);

    const [cargaHoraria, setCargaHoraria] = useState(userInfo.cargaHoraria !== '' ? new Date("2020-01-01T" + userInfo.cargaHoraria) : new Date());
    const [salarioField, setSalarioField] = useState(userInfo.salario);


    const handleChangeClick = async () => {
        setLoading(true);
        if (tituloField != '' && requisitoField != '' && descricaoField != '' && enderecoCepField != '') {
            if (type.atualizar === '') {
                let res = await Api.postVaga(
                    tituloField,
                    requisitoField,
                    descricaoField,
                    enderecoCepField,
                    complementoField,
                    numeroField,
                    cargaHoraria.toLocaleTimeString(),
                    salarioField
                );

                if (res.id) {
                    alert("Anúncio cadastrado com sucesso !!!");
                    navigation.navigate('CreateSetorCargo', {
                        id: res.id,
                        titulo: res.titulo,
                        nome: empresaInfo.nome,
                        email: empresaInfo.email,
                        object: ''
                    });

                } else {
                    if (res.error) {
                        alert("Erro: " + res.error);
                    } else
                        alert("Erro: " + res[0].error);

                }
            } else {
                let res = await Api.putVaga(
                    userInfo.id,
                    tituloField,
                    requisitoField,
                    descricaoField,
                    enderecoCepField,
                    complementoField,
                    numeroField,
                    cargaHoraria.toLocaleTimeString(),
                    salarioField
                );

                if (res.id) {
                    alert("Anúncio atualizado com sucesso !!!");
                    navigation.goBack();

                } else {
                    if (res.error) {
                        alert("Erro: " + res.error);
                    } else
                        alert("Erro: " + res[0].error);

                }
            }
        } else {
            alert("Preencha os campos obrigatórios")
        }

        setLoading(false);
    }
    
    const handleChangeStatusButton = async () => {
        setLoading(true);

        let res = await Api.changeStatusAnuncio(
            userInfo.id,
            false
        );

        if (res.id) {
            alert("Anúncio encerrado");
            navigation.navigate('Home');

        } else {
            if (res.error) {
                alert("Erro: " + res.error);
            } else
                alert("Erro: " + res[0].error);
        }

        setLoading(false);
    }


    const handleCepClick = async () => {
        if (enderecoCepField != '' && enderecoCepField != null) {
            if (enderecoCepField.length == 8) {
                setLoadingCep(true);
                let res = await Api.getViaCep(enderecoCepField);

                if (res.cep) {
                    setViaCep(res);
                } else {
                    alert("Cep inválido");
                    setEnderecoCepField('');
                }
                setLoadingCep(false);
            } else {
                alert("O cep deve conter 8 dígitos");
                setEnderecoCepField('');
            }
        }
    }


    const getPerfilEmpresa = async () => {
        setLoading(true);
        getCep();
        let json = await Api.getPerfilEmpresa(userInfo.empresaId);
        if (json) {
            setEmpresa(json);
        } else {
            alert("Erro: " + json.error);
        }
        setLoading(false);
    };

    const getCep = async () => {

        if (enderecoCepField != '' && enderecoCepField != null) {
            setLoadingCep(true);
            let res = await Api.getViaCep(enderecoCepField);
            setViaCep(res);
            setLoadingCep(false);
        }
    }

    useEffect(() => {
        getPerfilEmpresa();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataNascimentoField;
        setShow(Platform.OS === 'ios');
        setCargaHoraria(currentDate);
    };

    const [show, setShow] = useState(false);

    const showMode = () => {
        setShow(true);
    };



    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={empresaInfo.nome} email={empresaInfo.email} image={''} />
                    {loading &&
                        <LoadingIconBasic size="large" color="#000000" />
                    }

                    <EntreEspacosGrande />

                    {type.atualizar === '' ?
                    <Title>Deseja criar um novo anúncio ?</Title>
                    :
                    <Title>Deseja atualizar o anúncio ?</Title>
                    }
                    <DescriptionArea>

                        <EntreEspacos />

                        <Title>Informações obrigatórias</Title>
                        <InvisibleDescriptionArea>
                            <Text>Título do anúncio</Text>
                            <SignInput
                                IconSvg={TagIcon}
                                placeholder="Título"
                                value={tituloField}
                                onChangeText={t => setTituloField(t)}
                            />

                            <Text>Requisitos para a vaga</Text>
                            <SignInput
                                IconSvg={MenuBarIcon}
                                placeholder="Requisitos"
                                value={requisitoField}
                                onChangeText={t => setRequisitoField(t)}
                                multiline={true}
                            />

                            <Text>Descrição da vaga</Text>
                            <SignInput
                                IconSvg={FileIcon}
                                placeholder="Descrição"
                                value={descricaoField}
                                onChangeText={t => setDescricaoField(t)}
                                multiline={true}
                            />


                            <Title>Localização</Title>

                            <Text>Alterar CEP</Text>
                            <SignInput
                                IconSvg={GpsIcon}
                                placeholder="CEP"
                                value={enderecoCepField}
                                onChangeText={t => setEnderecoCepField(t)}
                                keyboardType='number-pad'
                                onEndEditing={handleCepClick}
                            />

                            {loadingCep &&
                                <LoadingIconBasic size="large" color="#63C2D1" />
                            }

                            {viaCep.cep &&
                                <>
                                    <DescriptionArea>
                                        <TextBold>Rua: <Text>{viaCep.logradouro}</Text></TextBold>
                                        <TextBold>Bairro: <Text>{viaCep.bairro}</Text></TextBold>
                                        <TextBold>Cidade: <Text>{viaCep.localidade}</Text></TextBold>
                                        <TextBold>Estado: <Text>{viaCep.uf}</Text></TextBold>
                                    </DescriptionArea>

                                    <Text>Alterar complemento</Text>
                                    <SignInput
                                        IconSvg={GpsIcon}
                                        placeholder="Complemento"
                                        value={complementoField}
                                        onChangeText={t => setComplementoField(t)}
                                    />

                                    <Text>Alterar número</Text>
                                    <SignInput
                                        IconSvg={GpsIcon}
                                        placeholder="Número"
                                        value={numeroField}
                                        onChangeText={t => setNumeroField(t)}
                                        keyboardType='number-pad'
                                    />
                                </>
                            }

                        </InvisibleDescriptionArea>


                        <LinhaCentral />
                        <Title>Informações opcionais</Title>
                        <InvisibleDescriptionArea>
                            <Text>Carga horária</Text>
                            <InputButtonArea onPress={showMode}>
                                <RelogioIcon width="24" height="24" fill="#268596" />
                                <InputButtonText>{cargaHoraria.toLocaleTimeString()}</InputButtonText>
                            </InputButtonArea>
                            
                            {show && (
                                <TimePiker
                                    value={cargaHoraria}
                                    mode='time'
                                    onChange={onChange}
                                />
                            )}

                            <Text>Salário</Text>
                            <SignInput
                                IconSvg={Dollar}
                                placeholder="Salário"
                                value={salarioField}
                                onChangeText={t => setSalarioField(t)}
                                keyboardType='number-pad'
                            />
                        </InvisibleDescriptionArea>

                        <LinhaCentral />


                        <EntreEspacos />

                        <CustomButton onPress={handleChangeClick}>
                            {loading ?
                                <LoadingIconBasic size="large" color="#FFF" />
                                :
                                type.atualizar === '' ?
                                    <CustomButtonText>CRIAR NOVO ANÚNCIO</CustomButtonText>
                                    :
                                    <CustomButtonText>Atualizar anúncio</CustomButtonText>
                            }
                        </CustomButton>

                    </DescriptionArea>

                    {userInfo.id !== '' && userInfo.statusAnuncio &&
                        <InvisibleSmallDescriptionArea>
                            <DangerButton onPress={handleChangeStatusButton}>
                                {loading ?
                                    <LoadingIconBasic size="large" color="#FFF" />
                                    :
                                    <CustomButtonText>Encerrar anúncio</CustomButtonText>
                                }
                            </DangerButton>
                        </InvisibleSmallDescriptionArea>
                    }

                </PageBodyProfile>

            </Scroller>

            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}