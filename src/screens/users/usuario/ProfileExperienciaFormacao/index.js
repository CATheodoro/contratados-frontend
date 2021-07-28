import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { Linha, EntreEspacosGrande, Description, SubDescription, ObjectInfo, ObjectItem } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller } from '../../../styles/Basic';

import { PageBodyProfile } from '../../../styles/View';

import { Title, Text, SubTitle, CustomButtonText } from '../../../styles/Text';

import { BackButtom, CustomListButton, PerfilButton } from '../../../styles/Button';

//Styles END ###########################################################

import BackIcon from '../../../../assets/back.svg';

import InfoTopProfile from '../../../../components/InfoTopProfile';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email,
        experiencia: route.params.experiencia,
        formacao: route.params.formacao,
        perfil: route.params.perfil
    });

    const [itemObject, setItemObject] = useState([]);
    const [itemName, setItemName] = useState([]);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const experienciaOrFormacao = () => {
        if (userInfo.experiencia !== '') {
            setItemObject(userInfo.experiencia);
            setItemName('experiência');
        } else {
            setItemObject(userInfo.formacao);
            setItemName('formação')
        }

    }

    useEffect(() => {
        experienciaOrFormacao();
    }, []);


    const handleChoose = key => {
        navigation.navigate('ProfileUsuarioUpdateExperienciaFormacao', {
            nome: userInfo.nome,
            email: userInfo.email,
            object: itemObject[key],
            itemType: itemName,
        })
    }

    const handleAdd = () => {
        navigation.navigate('ProfileUsuarioUpdateExperienciaFormacao', {
            nome: userInfo.nome,
            email: userInfo.email,
            object: '',
            itemType: itemName,
        })
    }



    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />
                <PageBodyProfile>

                    <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />


                    {userInfo.experiencia !== '' ?
                        <Title>Experiências</Title>
                        :
                        <Title>Formações</Title>
                    }

                    {userInfo.perfil === "USUARIO" &&
                        <>
                            <PerfilButton onPress={() => handleAdd()}>
                                <Text>Adicionar {itemName}</Text>
                            </PerfilButton>
                            <EntreEspacosGrande />
                            <Linha />
                        </>
                    }


                    {userInfo.experiencia !== '' ?
                        <SubTitle>Lista de experiências</SubTitle>
                        :
                        <SubTitle>Lista de formações</SubTitle>
                    }
                    {itemObject &&
                        itemObject.map((item, key) => (
                            <ObjectItem key={key}>
                                <ObjectInfo>
                                    <Description>{item.descricao}</Description>
                                    <SubDescription>Início: {item.inicioFormatado}</SubDescription>
                                    <SubDescription>Termino: {item.terminoFormatado}</SubDescription>

                                </ObjectInfo>
                                {userInfo.perfil === "USUARIO" &&
                                    <CustomListButton onPress={() => handleChoose(key)}>
                                        <CustomButtonText>Atualizar</CustomButtonText>
                                    </CustomListButton>
                                }
                            </ObjectItem>
                        ))
                    }

                </PageBodyProfile>

            </Scroller>

            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}