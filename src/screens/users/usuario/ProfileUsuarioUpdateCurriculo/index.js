import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';

import { PageBodyProfile, DescriptionArea } from '../../../styles/View';

import { Title, Text, TextSmall } from '../../../styles/Text';

import { BackButtom, PerfilButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import BackIcon from '../../../../assets/back.svg';
import EmailIcon from '../../../../assets/email.svg'
import InfoTopProfile from '../../../../components/InfoTopProfile';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email,
        linkCurriculo: route.params.linkCurriculo,
    });

    const [linkCurriculoField, setLinkCurriculoField] = useState(userInfo.linkCurriculo);

    const handleChangeClick = async () => {
        setLoading(true);
        let res = await Api.updateCurriculo(linkCurriculoField);

        if (res.id) {
            alert("Currículo atualizado com sucesso !!!");
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


    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />

                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />


                    <Title>Deseja atualizar o seu currículo ?</Title>


                    <DescriptionArea>
                        <EntreEspacosGrande />

                        <Text>Colar o link do currículo <TextSmall>(deve estar no formato PDF)</TextSmall></Text>
                        
                        <SignInput
                            IconSvg={EmailIcon}
                            placeholder={"Link do currículo "}
                            value={linkCurriculoField}
                            onChangeText={t => setLinkCurriculoField(t)}
                            multiline={true}
                        />

                        <PerfilButton onPress={() => setLinkCurriculoField('')}>
                            <EmailIcon width="24" height="24" fill="#268596" />
                            <Text>Limpar campo</Text>
                        </PerfilButton>

                        <Linha />

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