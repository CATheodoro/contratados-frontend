import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { EntreEspacos } from '../../screens/styles/View';

const AreaOpen = styled.TouchableOpacity`
    background-color: #63C2D1;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const AreaClosed = styled.TouchableOpacity`
    background-color: #E27D60;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const AvatarDefaut = styled.Text`
    width: 88px;
    height: 88px;
    border-radius: 20px;
    background-color: #DDDDDD
`;


const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const Title = styled.Text`
    width: 225px;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

const SubTitle = styled.Text`
    width: 225px;
    font-size: 16px;
    color: #FFF;
`;

const Linha = styled.View`
    border: 1px solid #FFF;
`;

const CargoArea = styled.View`
    width: 225px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;

    margin-bottom: 5px;
    margin-top: 15px;
`;

const LocationArea = styled.View`
    margin-left: 10px;
    margin-right: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

const SpacedArea = styled.View`
    margin-left: 10px;
    margin-right: 10px;
`;


const OpenButton = styled.View`
    width: 225px;
    height: 26px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;


const TextWhite = styled.Text`
    font-size: 14px;
    color: #FFF;
`;

const Text = styled.Text`
    font-size: 14px;
    color: #268596;
`;

const DataPost = styled.Text`
    font-size: 10px;
    color: #FFF;
    text-align: right;
`;



export default ({data, perfil}) => {
    const navigation = useNavigation();

    const handleClick = () =>{
            navigation.navigate('AnuncioVaga', {
                id: data.id,
                statusAnuncio: data.statusAnuncio,
                titulo: data.titulo,
                image: data.image,
                nomeEmpresa: data.nomeEmpresa,
                requisitos: data.requisitos,
                localidade: data.localidade,
                uf: data.uf,
                solicitacaoEmpresaStatus: null,
                perfil: perfil
            });
    }

    return(
        
        <>
            {data.statusAnuncio ?
                <AreaOpen onPress={handleClick}>

                    {data.image ?
                        <Avatar source = {{uri: data.image}} />
                        :
                        <AvatarDefaut />
                    }
                    
                    <InfoArea>
                        <Title>{data.nomeEmpresa}</Title>
                        <Linha/>
                        <SubTitle>{data.titulo}</SubTitle>
                        
                            <CargoArea>
                                <SpacedArea>
                                    {data.setorCargoResponses.map((item, key)=>(
                                        <Text key={key}>Cargo: {data.setorCargoResponses[key].cargo}</Text>
                                    ))}
                                </SpacedArea>
                            </CargoArea>
                            <CargoArea>
                                <LocationArea>
                                    <Text>{data.localidade}</Text>
                                    <Text>{data.uf}</Text>
                                </LocationArea>
                            </CargoArea>



                        <OpenButton>
                            <Text>Ver Vaga</Text>
                        </OpenButton>

                        <DataPost>{data.dataPostagem}</DataPost>
                    </InfoArea>
                </AreaOpen>
            :
                <AreaClosed onPress={handleClick}>
                    {data.image ?
                        <Avatar source = {{uri: data.image}} />
                        :
                        <AvatarDefaut />
                    }
                    
                    <InfoArea>
                        <Title>{data.nomeEmpresa}</Title>
                        <Linha/>
                        <SubTitle>{data.titulo}</SubTitle>
                        <EntreEspacos/>

                        <OpenButton>
                            <Text>Anúncio encerrado</Text>
                        </OpenButton>

                        <DataPost>{data.dataPostagem}</DataPost>
                    </InfoArea>
            </AreaClosed>
            }
        </>
    )
}