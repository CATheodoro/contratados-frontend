import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { EntreEspacos } from '../../screens/styles/View';


import {AreaOpen, AreaClosed, Avatar, AvatarDefaut, InfoArea, Title,
    SubTitle, Linha, CargoArea, LocationArea, SpacedArea, OpenButton,
    Text, DataPost
    } from './styles';

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