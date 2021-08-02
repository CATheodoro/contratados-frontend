import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';

import { PageBodyProfile, DescriptionArea, InvisibleDescriptionArea, InvisibleSmallDescriptionArea } from '../../../styles/View';

import { Title, Text } from '../../../styles/Text';

import { BackButtom, DangerButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import TodayIcon from '../../../../assets/today.svg';
import BackIcon from '../../../../assets/back.svg';
import InfoTopProfile from '../../../../components/InfoTopProfile';
import CertificateIcon from '../../../../assets/certificate.svg';
import SuitcaseIcon from '../../../../assets/suitcase.svg';


import DatePicker from '@react-native-community/datetimepicker';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email,
        object: route.params.object,
        itemType: route.params.itemType
    });

    const [itemDescricao, setItemDescricao] = useState(userInfo.object !== '' ? userInfo.object.descricao : '');
    const [itemInicio, setItemInicio] = useState(userInfo.object !== '' ? new Date(userInfo.object.inicio) : new Date());
    const [itemTermino, setItemTermino] = useState(userInfo.object !== '' ? new Date(userInfo.object.termino) : new Date());


    const handleCreateClick = async () => {
        setLoading(true);
        let res;
        if (userInfo.itemType == 'experiência') {
            res = await Api.createExperiencia(itemDescricao, itemInicio, itemTermino);
        } else {
            res = await Api.createFormacao(itemDescricao, itemInicio, itemTermino);
        }

        if (res.id) {
            alert(userInfo.itemType + " criado com sucesso !!!");
            navigation.navigate('Profile');
        } else {
            if (res.error) {
                alert("Erro: " + res.error);
            } else
                alert("Erro: " + res[0].error);

        }
        setLoading(false);
    }


    const handleChangeClick = async () => {
        setLoading(true);
        let res;
        if (userInfo.itemType == 'experiência') {
            res = await Api.updateExperiencia(itemDescricao, itemInicio, itemTermino, userInfo.object.id);
        } else {
            res = await Api.updateFormacao(itemDescricao, itemInicio, itemTermino, userInfo.object.id);
        }

        if (res.id) {
            alert(userInfo.itemType + " alterada com sucesso !!!");
            navigation.navigate('Profile');
        } else {
            if (res.error) {
                alert("Erro: " + res.error);
            } else
                alert("Erro: " + res[0].error);

        }
        setLoading(false);
    }


    const handleDeleteButton = async () => {
        setLoading(true);
        let res;
        if (userInfo.itemType == 'experiência') {
            res = await Api.deleteExperiencia(userInfo.object.id);
        } else {
            res = await Api.deleteFormacao(userInfo.object.id);
        }
        if (res.id) {
            alert(userInfo.itemType + " deletada com sucesso !!!");
            navigation.navigate('Profile');

        } else {
            if (res.error) {
                alert("Erro: " + res.error);
            } else
                alert("Erro: " + res[0].error);

        }
        setLoading(false);
    }

    const handleBackButton = () => {
        navigation.goBack();
    }
    
    const [showInicio, setShowInicio] = useState(false);
    const [showTermino, setShowTermino] = useState(false);
    
    const showDatepickerInicio = () => {
        setShowInicio(true);
    };

    const showDatepickerTermino = () => {
        setShowTermino(true);
    };

    const onChangeInicio = (event, selectedDate) => {
        const currentDate = selectedDate || itemInicio;
        setShowInicio(Platform.OS === 'ios');
        setItemInicio(currentDate);
    };

    const onChangeTermino = (event, selectedDate) => {
        const currentDate = selectedDate || itemTermino;
        setShowTermino(Platform.OS === 'ios');
        setItemTermino(currentDate);
    };



    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    {userInfo.object !== '' ?
                        <Title>Deseja atualizar sua {userInfo.itemType} ?</Title>
                        :
                        <Title>Deseja adicionar uma {userInfo.itemType} ?</Title>
                    }
                    <DescriptionArea>
                        <EntreEspacosGrande />

                        {userInfo.object !== '' ?
                            <Text>Alterar sua {userInfo.itemType}</Text>
                            :
                            <Text>Digite sua {userInfo.itemType}</Text>
                        }
                        <SignInput
                            IconSvg={userInfo.itemType === "formação" ? CertificateIcon: SuitcaseIcon }
                            placeholder={userInfo.object !== '' ? "Alterar " + userInfo.itemType : "Informe a " + userInfo.itemType}
                            value={itemDescricao}
                            onChangeText={t => setItemDescricao(t)}
                            multiline={true}
                        />


                        {userInfo.object !== '' ?
                            <Text>Alterar início da {userInfo.itemType}</Text>
                            :
                            <Text>Digite o início da {userInfo.itemType}</Text>
                        }

                        <InputButtonArea onPress={showDatepickerInicio}>
                            <TodayIcon width="24" height="24" fill="#268596" />
                            <InputButtonText>{itemInicio.toLocaleDateString()}</InputButtonText>
                        </InputButtonArea>


                        {userInfo.object !== '' ?
                            <Text>Alterar termino da {userInfo.itemType}</Text>
                            :
                            <Text>Digite o termino da {userInfo.itemType}</Text>
                        }
                        <InputButtonArea onPress={showDatepickerTermino}>
                            <TodayIcon width="24" height="24" fill="#268596" />
                            <InputButtonText>{itemTermino.toLocaleDateString()}</InputButtonText>
                        </InputButtonArea>

                        {showInicio && (
                            <DatePicker
                                value={itemInicio}
                                mode='date'
                                onChange={onChangeInicio}
                            />
                        )}

                        {showTermino && (
                            <DatePicker
                                value={itemTermino}
                                mode='date'
                                onChange={onChangeTermino}
                            />
                        )}


                        <Linha />

                        <EntreEspacos />
                        {userInfo.object !== '' ?
                            <CustomButton onPress={handleChangeClick}>
                                {loading ?
                                    <LoadingIconBasic size="large" color="#FFF" />
                                    :
                                    <CustomButtonText>ATUALIZAR</CustomButtonText>
                                }
                            </CustomButton>
                            :
                            <CustomButton onPress={handleCreateClick}>
                                {loading ?
                                    <LoadingIconBasic size="large" color="#FFF" />
                                    :
                                    <CustomButtonText>ADICIONAR</CustomButtonText>
                                }
                            </CustomButton>
                        }

                    </DescriptionArea>
                    {userInfo.object !== '' &&
                        <InvisibleSmallDescriptionArea>
                            <DangerButton onPress={handleDeleteButton}>
                                {loading ?
                                    <LoadingIconBasic size="large" color="#FFF" />
                                    :
                                    <CustomButtonText>Remover</CustomButtonText>
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