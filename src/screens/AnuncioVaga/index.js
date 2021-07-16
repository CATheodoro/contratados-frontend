import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import VagaModal from '../../components/VagaModal';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg'

import { 
    Container,
    ScrollerAnuncio,

    BackgroundImage,

    PageBody,

    UserInfoArea,
    UserAvatar,
    UserAvatarDefault,
    UserInfoName,
    UserFavButton,

    DescriptionTitle,
    DescriptionArea,

    TextBold,

    EnderecoTitle,
    EncercoArea,

    BackButtom,
    Text,

    CargoArea,
    CargoTitle,
    CargoItem,
    CargoInfo,
    CargoName,
    CargoSetor,
    CargoChooseButton,
    CargoChooseButtonText

} from './styles';

import Api from '../../Api';
import { LoadingIcon, LocationArea, Scroller } from '../Home/styles';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        image: route.params.image,
        nomeEmpresa: route.params.requisitos,

    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorieted] = useState(false);

    
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        setLoading(true)
        const getVagaInfo = async () =>{
            let json = await Api.getVaga(userInfo.id);

            if(json){
                setUserInfo(json);
                //setFavorieted(json.data.solicitacao)
            } else {
                alert("Erro: "+json);
            }
            setLoading(false);
        };
        getVagaInfo();
    },[]);

    const handleBackButton = () =>{
        navigation.goBack();
    }

    const handleFavClick = () =>{
        setFavorieted( !favorited );
        //Api.set();
    }

    const handleCargoChoose = () => {
        setShowModal(true);
    }

    return (
        <Container>
            <ScrollerAnuncio>

                <BackgroundImage />

                <PageBody>

                    <UserInfoArea>
                        {userInfo.imagee ?
                            <UserAvatar source={{uri: userInfo.image}} />
                            :
                            <UserAvatarDefault/>
                        }
                        
                        <UserInfoName>{userInfo.nomeEmpresa}</UserInfoName>
                      
                        <UserFavButton onPress={handleFavClick}>
                            <FavoriteFullIcon  width="24" height="24" fill="#63C2D1" />
                        </UserFavButton>
                    </UserInfoArea>

                    {loading &&
                        <LoadingIcon size="large" color="#000000" />
                    }

                    <DescriptionArea>
                        <DescriptionTitle>Descrição da vaga</DescriptionTitle>
                        <Text>{userInfo.requisitos}</Text>
                    </DescriptionArea>

                    <EnderecoTitle>Descrição da vaga</EnderecoTitle>
                    <EncercoArea>
                        <TextBold>Cidade: </TextBold> 
                        <TextBold>Estado: </TextBold>
                        <TextBold>Rua: </TextBold>
                        <TextBold>Número: </TextBold>
                    </EncercoArea>


                    {userInfo.setorCargoResponses &&
                        <CargoArea>
                            <CargoTitle>Lista de cargos</CargoTitle>

                            {userInfo.setorCargoResponses.map((item, key)=>(
                                <CargoItem key={key}>
                                    <CargoInfo>
                                        <CargoName>{item.cargo}</CargoName>
                                        <CargoSetor>Setor: {item.setor}</CargoSetor>
                                    </CargoInfo>
                                </CargoItem>
                            ))}

                            <CargoChooseButton onPress={()=>handleCargoChoose()}>
                                <CargoChooseButtonText>Enviar Currículo</CargoChooseButtonText>
                            </CargoChooseButton>

                        </CargoArea>
                    }       
                </PageBody>

            </ScrollerAnuncio>
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