import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, LinhaCentral, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';

import { PageBodyProfile, DescriptionArea, InvisibleDescriptionArea } from '../../../styles/View';

import { TextBold, Title, Text, ButtonWhiteText } from '../../../styles/Text';

import { BackButtom, PdfButton, PerfilButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import BackIcon from '../../../../assets/back.svg';
import EmailIcon from '../../../../assets/email.svg';
import FileIcon from '../../../../assets/file.svg';
import CnpjIcon from '../../../../assets/name-id.svg';
import MobilePhone from '../../../../assets/mobile-phone.svg';
import Telephone from '../../../../assets/telephone.svg';
import Certificate from '../../../../assets/certificate.svg';
import GpsIcon from '../../../../assets/gps.svg';

import TodayIcon from '../../../../assets/today.svg';
import PersonIcon from '../../../../assets/person.svg';


import InfoTopProfile from '../../../../components/InfoTopProfile';

import DatePicker from '@react-native-community/datetimepicker';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email,

        dataNascimento: route.params.dataNascimento,

        celular: route.params.celular,
        telefone: route.params.telefone,

        status: route.params.status,
        dataCriacaoPerfil: route.params.dataCriacaoPerfil,

        formacao: route.params.formacao,
        experiencia: route.params.experiencia,

        cep: route.params.cep,
        logradouro: route.params.logradouro,
        complemento: route.params.complemento,
        bairro: route.params.bairro,
        localidade: route.params.localidade,
        uf: route.params.uf,
        numero: route.params.numero,


        descricao: route.params.descricao,
        cnpj: route.params.cnpj,
        dataFundacao: route.params.dataFundacao,
        perfil: route.params.perfil

    });

    const [typeProfile, setTypeProfile] = useState({
        perfil: route.params.perfil,
    });

    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

    const [viaCep, setViaCep] = useState({})

    const [nomeField, setNomeField] = useState(userInfo.nome);
    const [dataNascimentoField, setDataNascimentoField] = useState(userInfo.dataNascimento !== '' ? new Date(userInfo.dataNascimento) : new Date());
    const [celularField, setCelularField] = useState(userInfo.celular);
    const [telefoneField, setTelefoneField] = useState(userInfo.telefone);
    const [statusField, setStatusField] = useState(userInfo.status);
    const [enderecoCepField, setEnderecoCepField] = useState(userInfo.cep);
    const [complementoField, setComplementoField] = useState(userInfo.complemento);
    const [numeroField, setNumeroField] = useState(userInfo.numero);

    const [descricaoField, setDescricaoField] = useState(userInfo.descricao);
    const [cnpjField, setCnpjField] = useState(userInfo.cnpj);
    const [dataFundacaoField, setDataFundacaoField] = useState(userInfo.dataFundacao !== '' ? new Date(userInfo.dataFundacao) : new Date());


    const handleChangeClick = async () => {
        setLoading(true);

        if(typeProfile.perfil === "USUARIO"){
            let res = await Api.updateUsuario(
                nomeField,
                dataNascimentoField,
                celularField,
                telefoneField,
                statusField,
                enderecoCepField,
                complementoField,
                numeroField);
    
            if (res.id) {
    
                alert("Dados do perfil alterados com sucesso !!!");
                navigation.goBack();
    
            } else {
                if (res.error) {
                    alert("Erro: " + res.error);
                } else
                    alert("Erro: " + res[0].error);
    
            }
        } else{
            let res = await Api.updateEmpresa(
                nomeField,
                descricaoField,
                cnpjField,
                dataFundacaoField,
                celularField,
                telefoneField,
                )
            if (res.id) {
    
                alert("Dados do perfil alterados com sucesso !!!");
                navigation.goBack();
    
            } else {
                if (res.error) {
                    alert("Erro: " + res.error);
                } else
                    alert("Erro: " + res[0].error);
    
            }
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

    const getPerfilUsuario = async () => {
        setLoading(true);
        getCep();
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
        let json = await Api.getPerfilEmpresa('0');
        if (json) {
            setUserInfo(json);
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
        if (typeProfile.perfil === 'USUARIO') {
            getPerfilUsuario();
        } else {
            getPerfilEmpresa();
        }
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
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

    const onChange = (event, selectedDate) => {
        let currentDate;
        if(typeProfile.perfil === "USUARIO"){
            currentDate = selectedDate || dataNascimentoField;
            setShow(Platform.OS === 'ios');
            setDataNascimentoField(currentDate);
        } else {
            currentDate = selectedDate  || dataFundacaoField;
            setShow(Platform.OS === 'ios');
            setDataFundacaoField(currentDate);
        }
    };

    const handleChangeCurriculo = () => {
        navigation.navigate('ProfileUsuarioUpdateCurriculo', {
            nome: userInfo.nome,
            email: userInfo.email,
            linkCurriculo: userInfo.linkCurriculo,
        });
    }

    const [show, setShow] = useState(false);

    const showMode = () => {
        setShow(true);
    };

    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    <EntreEspacosGrande />
                    {typeProfile.perfil === 'USUARIO' &&
                        <>
                            <PerfilButton onPress={() => handleExperiencia()}>
                                <PersonIcon width="24" height="24" fill="#268596" />
                                <Text>Alterar experiências</Text>
                            </PerfilButton>

                            <PerfilButton onPress={() => handlFormacao()}>
                                <Certificate width="24" height="24" fill="#268596" />
                                <Text>Alterar formações</Text>
                            </PerfilButton>

                            <PdfButton onPress={() => handleChangeCurriculo()}>
                                <ButtonWhiteText>Enviar link de currículo em PDF</ButtonWhiteText>
                            </PdfButton>

                            <EntreEspacosGrande />

                            <Linha />
                        </>
                    }

                    <Title>Atualizar perfil</Title>
                    <DescriptionArea>

                        <EntreEspacos />

                        <Title>Informações pessoais</Title>
                        <InvisibleDescriptionArea>
                            <Text>Alterar Nome</Text>
                            <SignInput
                                IconSvg={PersonIcon}
                                placeholder="Nome"
                                value={nomeField}
                                onChangeText={t => setNomeField(t)}
                            />

                            {typeProfile.perfil !== 'USUARIO' &&
                                <>
                                    <Text>Alterar descrição</Text>
                                    <SignInput
                                        IconSvg={FileIcon}
                                        placeholder="Descrição"
                                        value={descricaoField}
                                        onChangeText={t => setDescricaoField(t)}
                                        multiline={true}
                                    />

                                    <Text>Alterar CNPJ</Text>
                                    <SignInput
                                        IconSvg={CnpjIcon}
                                        placeholder="CNPJ"
                                        value={cnpjField}
                                        onChangeText={t => setCnpjField(t)}
                                    />
                                </>
                            }

                            {typeProfile.perfil === 'USUARIO' ?
                                <Text>Alterar data de nascimento</Text>
                                :
                                <Text>Alterar data de fundação</Text>
                            }
                            <InputButtonArea onPress={showMode}>
                                <TodayIcon width="24" height="24" fill="#268596" />
                                <InputButtonText>{typeProfile.perfil === 'USUARIO' ?
                                    dataNascimentoField.toLocaleDateString("pt-BR")
                                    :
                                    dataFundacaoField.toLocaleDateString("pt-BR")
                                }</InputButtonText>
                            </InputButtonArea>

                            {show && (
                                <DatePicker
                                    value={typeProfile.perfil === 'USUARIO' ? dataNascimentoField : dataFundacaoField}
                                    mode='date'
                                    onChange={onChange}
                                />
                            )}

                        </InvisibleDescriptionArea>


                        <LinhaCentral />


                        <Title>Contatos</Title>
                        <InvisibleDescriptionArea>
                            <Text>Alterar número de celular</Text>
                            <SignInput
                                IconSvg={MobilePhone}
                                placeholder="Número do celular"
                                value={celularField}
                                onChangeText={t => setCelularField(t)}
                                keyboardType='number-pad'
                            />

                            <Text>Alterar número de telefone</Text>
                            <SignInput
                                IconSvg={Telephone}
                                placeholder="Número do telefone"
                                value={telefoneField}
                                onChangeText={t => setTelefoneField(t)}
                                keyboardType='number-pad'
                            />
                        </InvisibleDescriptionArea>

                        {typeProfile.perfil === 'USUARIO' &&
                            <>
                                <LinhaCentral />

                                <Title>Localização</Title>
                                <InvisibleDescriptionArea>

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
                            </>
                        }

                        <EntreEspacos />

                        <CustomButton onPress={handleChangeClick}>
                            {loading ?
                                <LoadingIconBasic size="large" color="#FFF" />
                                :
                                <CustomButtonText>ATUALIZAR</CustomButtonText>
                            }
                        </CustomButton>

                    </DescriptionArea>

                </PageBodyProfile>

            </Scroller>

            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}