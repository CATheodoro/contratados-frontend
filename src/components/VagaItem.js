import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


const Area = styled.TouchableOpacity`
    background-color: #63C2D1;
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

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #FFF;
`;

const CargoArea = styled.View`
    width: 225px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;

    margin-bottom: 15px;
    margin-top: 15px;
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

const ClosedButton = styled.View`
    width: 225px;
    height: 26px;
    border: 1px solid #FFF;
    background-color: #E27D60;
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



export default ({data}) => {

    const navigation = useNavigation();

    const handleClick = () =>{
            navigation.navigate('AnuncioVaga', {
                id: data.id,
                statusAnuncio: data.statusAnuncio,
                image: data.image,
                nomeEmpresa: data.nomeEmpresa,
                requisitos: data.requisitos,
                localidade: data.localidade,
                uf: data.uf
            });
    }

    return(
        <Area onPress={handleClick}>

            {data.image ?
                <Avatar source = {{uri: data.image}} />
                :
                <AvatarDefaut />
            }
            
            <InfoArea>
                <UserName>{data.nomeEmpresa}</UserName>
                
                    <CargoArea>
                        {data.setorCargoResponses.map((item, key)=>(
                            <Text key={key}>Cargo: {data.setorCargoResponses[key].cargo}</Text>
                        ))}
                    </CargoArea>
            {data.statusAnuncio ?
                <OpenButton>
                    <Text>Ver Vaga</Text>
                </OpenButton>
                :
                <ClosedButton>
                    <TextWhite>Anúncio encerrado</TextWhite>
                </ClosedButton>
            }


                <DataPost>{data.dataPostagem}</DataPost>
            </InfoArea>
        </Area>
    )
}