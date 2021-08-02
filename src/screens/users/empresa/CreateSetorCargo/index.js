import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, LinhaCentral, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';

import { PageBodyProfile, DescriptionArea, InvisibleDescriptionArea, TitleArea, InvisibleSmallDescriptionArea } from '../../../styles/View';

import { TextBold, Title, Text, SubTitle } from '../../../styles/Text';

import { BackButtom, DangerButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import BackIcon from '../../../../assets/back.svg';
import MenuBarIcon from '../../../../assets/menu-bar.svg';

import InfoTopProfile from '../../../../components/InfoTopProfile';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        anuncioVagaId: route.params.id,
        titulo: route.params.titulo,
        nome: route.params.nome,
        email: route.params.email,
        object: route.params.object
    });

    const [loading, setLoading] = useState(false);

    const [setorField, setSetorField] = useState(userInfo.object !== '' ? userInfo.object.setor : '');
    const [cargoField, setCargoField] = useState(userInfo.object !== '' ? userInfo.object.cargo : '');


    const handleChangeClick = async () => {
        setLoading(true);

        if (cargoField !== '') {
            if (userInfo.object === '') {
                let res = await Api.postSetorCargo(
                    userInfo.anuncioVagaId,
                    setorField,
                    cargoField,
                );

                if (res.id) {

                    alert("Setor e cargo cadastrado com sucesso !!!");
                    navigation.navigate('Home');

                } else {
                    if (res.error) {
                        alert("Erro: " + res.error);
                    } else
                        alert("Erro: " + res[0].error);

                }
            } else {
                let res = await Api.putSetorCargo(
                    userInfo.object.id,
                    setorField,
                    cargoField,
                );

                if (res.id) {

                    alert("Setor e cargo atualizado com sucesso !!!");
                    navigation.navigate('Home');

                } else {
                    if (res.error) {
                        alert("Erro: " + res.error);
                    } else
                        alert("Erro: " + res[0].error);

                }
            }
        }
        setLoading(false);
    }

    const handleDeleteButton = async () => {
        setLoading(true);

        let res = await Api.deleteSetorCargo(
            userInfo.object.id,
        );

        if (res.id) {

            alert("Setor e cargo deletado com sucesso !!!");
            navigation.navigate('Home');

        } else {
            if (res.error) {
                alert("Erro: " + res.error);
            } else
                alert("Erro: " + res[0].error);
        }

        setLoading(false);
    }


    useEffect(() => {
    }, []);

    const handleBackButton = () => {
        navigation.navigate('Home');
    }



    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    <TitleArea>
                        <SubTitle>{userInfo.titulo}</SubTitle>
                    </TitleArea>

                    <Linha />
                    <EntreEspacos />

                    <Title>Adicionar cargo e setor ?</Title>
                    <DescriptionArea>

                        <EntreEspacos />

                        <InvisibleDescriptionArea>

                            <Text>Digite o cargo</Text>
                            <SignInput
                                IconSvg={MenuBarIcon}
                                placeholder="Cargo"
                                value={cargoField}
                                onChangeText={t => setCargoField(t)}
                            />

                            <Text>Digite o setor</Text>
                            <SignInput
                                IconSvg={MenuBarIcon}
                                placeholder="Setor"
                                value={setorField}
                                onChangeText={t => setSetorField(t)}
                            />

                        </InvisibleDescriptionArea>

                        <LinhaCentral />


                        <EntreEspacos />

                        <CustomButton onPress={handleChangeClick}>
                            {loading ?
                                <LoadingIconBasic size="large" color="#FFF" />
                                :
                                userInfo.object === '' ?
                                    <CustomButtonText>Adicionar setor e cargo</CustomButtonText>
                                    :
                                    <CustomButtonText>Atualizar setor e cargo</CustomButtonText>
                            }
                        </CustomButton>

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