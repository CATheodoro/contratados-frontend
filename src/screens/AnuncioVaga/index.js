import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import VagaModal from '../../components/VagaModal';

import BackIcon from '../../assets/back.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg'


//Styles    ###########################################################

import {  PageBody, UserInfoArea, UserInfoName, CargoItem, CargoInfo, CargoName, CargoSetor } from './styles';

import { Container, Scroller, LoadingIcon } from '../styles/Basic';

import { BackgroundImageOpen, BackgroundImageClosed, EmpresaAnuncioAvatarDefault, EmpresaAnuncioAvatar } from '../styles/Image';

import { ButtonWhiteText, SubTitle, Text, TextBold, Title } from '../styles/Text';

import { DescriptionArea, EntreEspacos, Linha } from '../styles/View';

import { CirculateButton, BackButtom, SimpleButton } from '../styles/Button'; 

//Styles END ###########################################################

import Api from '../../Api';

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


    const [loading, setLoading] = useState(false);

    
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        setLoading(true)
        const getVagaInfo = async () =>{
            let json = await Api.getVaga(userInfo.id);

            if(json){
                setUserInfo(json);
            } else {
                alert("Erro: "+json.error);
            }
            setLoading(false);
        };
        getVagaInfo();
    },[]);

    const handleBackButton = () =>{
        navigation.goBack();
    }

    const handleEmpresaClick = () =>{
        navigation.navigate('PerfilEmpresa', {
            empresaId: userInfo.empresaId,
            nomeEmpresa: userInfo.nomeEmpresa,
            email: userInfo.email,
            celular: userInfo.celular,
            telefone: userInfo.telefone,
        });
    }

    const handleCargoChoose = () => {
        setShowModal(true);
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
                            <EmpresaAnuncioAvatar source={{uri: userInfo.image}} />
                            :
                            <EmpresaAnuncioAvatarDefault/>
                        }
                        
                        <UserInfoName>{userInfo.nomeEmpresa}</UserInfoName>
                      
                        <CirculateButton onPress={handleEmpresaClick}>
                            <FavoriteFullIcon  width="24" height="24" fill="#63C2D1" />
                        </CirculateButton>
                    </UserInfoArea>
                    
                    <SubTitle>{userInfo.titulo}</SubTitle>
                    <Linha/>
                    <EntreEspacos/>

                    <DescriptionArea>
                        <TextBold>Descrição da vaga</TextBold>
                        <Text>{userInfo.requisitos}</Text>
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

                            {userInfo.setorCargoResponses.map((item, key)=>(
                                <CargoItem key={key}>
                                    <CargoInfo>
                                        <CargoName>{item.cargo}</CargoName>
                                        {item.cargo &&
                                            <CargoSetor>Setor: {item.setor}</CargoSetor>
                                        }
                                    </CargoInfo>
                                </CargoItem>
                            ))}

                        </DescriptionArea>
                    }
                    {userInfo.statusAnuncio &&
                        <SimpleButton onPress={()=>handleCargoChoose()}>
                            <ButtonWhiteText>Enviar Currículo</ButtonWhiteText>
                        </SimpleButton>
                    }

                </PageBody>

            </Scroller>
            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

            <VagaModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
            />

        </Container>
    );
}