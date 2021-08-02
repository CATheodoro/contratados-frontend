import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, LinhaCentral, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../styles/Basic';

import { PageBodyProfile, DescriptionArea, InvisibleDescriptionArea } from '../../styles/View';

import { TextBold, Title, Text } from '../../styles/Text';

import { BackButtom } from '../../styles/Button';

//Styles END ###########################################################


import Api from '../../../Api';

import SignInput from '../../../components/SignInput';

import BackIcon from '../../../assets/back.svg';
import EmailIcon from '../../../assets/email.svg'
import TodayIcon from '../../../assets/today.svg';
import PersonIcon from '../../../assets/person.svg'
import InfoTopProfile from '../../../components/InfoTopProfile';



import DateTimePicker from '@react-native-community/datetimepicker';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [solicitacaoInfo, setSolicitacaoInfo] = useState({
        id: route.params.id,
        empresaId: route.params.empresaId,

        descricao: route.params.descricao,
        horaEntrevista: route.params.horaEntrevista,
        dataEntrevista: route.params.dataEntrevista,

        enderecoCep: route.params.enderecoCep,
        complemento: route.params.complemento,
        numero: route.params.numero
    });

    const [empresaInfo, setEmpresaInfo] = useState([]);

    const [type, setType] = useState({
        atualizar: route.params.atualizar
    });


    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

    const [viaCep, setViaCep] = useState({})

    const [descricaoField, setDescricaoField] = useState(solicitacaoInfo.descricao);

    const [enderecoCepField, setEnderecoCepField] = useState(solicitacaoInfo.enderecoCep);
    const [complementoField, setComplementoField] = useState(solicitacaoInfo.complemento);
    const [numeroField, setNumeroField] = useState(solicitacaoInfo.numero);

    const [horaEntrevistaField, setHoraEntrevistaField] = useState(solicitacaoInfo.horaEntrevista !== '' ? new Date("2020-01-01T" + solicitacaoInfo.horaEntrevista) : new Date());
    const [dataEntrevistaField, setDataEntrevistaFieldField] = useState(solicitacaoInfo.dataEntrevista !== '' ? new Date(solicitacaoInfo.dataEntrevista) : new Date());

    const handleChangeClick = async () => {
        setLoading(true);
        if (descricaoField != '' && horaEntrevistaField != '' && dataEntrevistaField != '') {
            let res = await Api.updateSolicitacao(
                solicitacaoInfo.id,
                descricaoField,
                horaEntrevistaField.toLocaleTimeString(),
                dataEntrevistaField,

                enderecoCepField,
                complementoField,
                numeroField,
            );
            if (res.id) {
                alert("Solicitação atualizada com sucesso !!!");
                navigation.navigate('Solicitacoes');

            } else {
                if (res.error) {
                    alert("Erro: " + res.error);
                } else
                    alert("Erro: " + res[0].error);

            }
        } else {
            alert("Preencha os campos obrigatórios")
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
        let json = await Api.getPerfilEmpresa(solicitacaoInfo.empresaId);
        if (json) {
            setEmpresaInfo(json);
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

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || horaEntrevistaField;
        setShowTime(Platform.OS === 'ios');
        setHoraEntrevistaField(currentDate);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dataEntrevistaField;
        setShowDate(Platform.OS === 'ios');
        setDataEntrevistaFieldField(currentDate);
    };

    const [showTime, setShowTime] = useState(false);
    const [showDate, setShowDate] = useState(false);

    const showTimeMode = () => {
        setShowTime(true);
    };

    const showDateMode = () => {
        setShowDate(true);
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
                        <Title>Informações da entrevista ?</Title>
                        :
                        <Title>Atualizar dados da entrevista ?</Title>
                    }
                    <DescriptionArea>

                        <EntreEspacos />

                        <Title>Informações da entrevista</Title>
                        <InvisibleDescriptionArea>
                            <Text>Descrição</Text>
                            <SignInput
                                IconSvg={PersonIcon}
                                placeholder="Descrição"
                                value={descricaoField}
                                onChangeText={t => setDescricaoField(t)}
                                multiline={true}
                            />

                            <Title>Localização opcional</Title>

                            <Text>Alterar CEP</Text>
                            <SignInput
                                IconSvg={EmailIcon}
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
                                        IconSvg={EmailIcon}
                                        placeholder="Complemento"
                                        value={complementoField}
                                        onChangeText={t => setComplementoField(t)}
                                    />

                                    <Text>Alterar número</Text>
                                    <SignInput
                                        IconSvg={EmailIcon}
                                        placeholder="Número"
                                        value={numeroField}
                                        onChangeText={t => setNumeroField(t)}
                                        keyboardType='number-pad'
                                    />
                                </>
                            }

                        </InvisibleDescriptionArea>


                        <LinhaCentral />
                        <Title>Data e hora</Title>
                        <InvisibleDescriptionArea>

                            <Text>Data da entrevista</Text>
                            <InputButtonArea onPress={showDateMode}>
                                <TodayIcon width="24" height="24" fill="#268596" />
                                <InputButtonText>{dataEntrevistaField.toLocaleDateString()}</InputButtonText>
                            </InputButtonArea>

                            <Text>Horário da entrevista</Text>
                            <InputButtonArea onPress={showTimeMode}>
                                <TodayIcon width="24" height="24" fill="#268596" />
                                <InputButtonText>{horaEntrevistaField.toLocaleTimeString()}</InputButtonText>
                            </InputButtonArea>

                            {showTime && (
                                <DateTimePicker
                                    value={horaEntrevistaField}
                                    mode='time'
                                    onChange={onChangeTime}
                                />
                            )}

                            {showDate && (
                                <DateTimePicker
                                    value={dataEntrevistaField}
                                    mode='date'
                                    onChange={onChangeDate}
                                />
                            )}

                        </InvisibleDescriptionArea>

                        <LinhaCentral />


                        <EntreEspacos />

                        <CustomButton onPress={handleChangeClick}>
                            {loading ?
                                <LoadingIconBasic size="large" color="#FFF" />
                                :
                                type.atualizar === '' ?
                                    <CustomButtonText>FINALIZAR DADOS DA ENTREVISTA</CustomButtonText>
                                    :
                                    <CustomButtonText>Atualizar dados da entrevista</CustomButtonText>
                            }
                        </CustomButton>

                    </DescriptionArea>

                </PageBodyProfile>

            </Scroller>
            {type.atualizar !== '' &&
                <BackButtom onPress={handleBackButton}>
                    <BackIcon width="44" height="44" fill="#FFFFFF" />
                </BackButtom>
            }

        </Container>
    );
}