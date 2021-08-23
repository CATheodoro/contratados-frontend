import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { EntreEspacos } from '../../screens/styles/View';

import {
    AreaPendente, AreaRecusado, AreaAceito, Avatar, AvatarDefaut, InfoArea,
    Title, SubTitle, Linha, CargoArea, LocationArea, SpacedArea, OpenButton,
    Text, DataPost
} from './styles';


export default ({ data, perfil }) => {

    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Solicitacao', {
            id: data.anuncioVagaId,
            solicitacaoId: data.id,
            statusAnuncio: data.statusAnuncio,
            titulo: data.titulo,
            image: data.image,
            nomeEmpresa: data.nomeEmpresa,
            requisitos: data.requisitos,
            localidade: data.localidade,
            uf: data.uf,
            solicitacaoEmpresaStatus: data.solicitacaoEmpresaStatus,
            solicitacaoUsuarioStatus: data.solicitacaoUsuarioStatus,

            usuarioId: data.usuarioId,
            nomeUsuario: data.nomeUsuario,
            perfil: perfil,
        });
    }


    return (

        <>
            {data.solicitacaoEmpresaStatus === 'PENDENTE' && data.solicitacaoUsuarioStatus !== 'CANCELADO' ?
                <AreaPendente onPress={handleClick}>

                    {data.image ?
                        <Avatar source={{ uri: data.image }} />
                        :
                        <AvatarDefaut />
                    }

                    <InfoArea>
                        {perfil === "USUARIO" ?
                            <Title>{data.nomeEmpresa}</Title>
                            :
                            <Title>{data.nomeUsuario}</Title>
                        }
                        <Linha />
                        <SubTitle>{data.titulo}</SubTitle>

                        <CargoArea>
                            <SpacedArea>
                                {data.setorCargoResponses.map((item, key) => (
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
                            <Text>Estado Pendente</Text>
                        </OpenButton>


                        <DataPost>{data.dataCriacaoSolicitacao}</DataPost>
                    </InfoArea>
                </AreaPendente>

                : data.solicitacaoEmpresaStatus === 'RECUSADO' || data.solicitacaoUsuarioStatus == 'CANCELADO' ?
                    <AreaRecusado onPress={handleClick}>
                        {data.image ?
                            <Avatar source={{ uri: data.image }} />
                            :
                            <AvatarDefaut />
                        }

                        <InfoArea>
                            {perfil === "USUARIO" ?
                                <Title>{data.nomeEmpresa}</Title>
                                :
                                <Title>{data.nomeUsuario}</Title>
                            }
                            <Linha />
                            <SubTitle>{data.titulo}</SubTitle>
                            <EntreEspacos />

                            <OpenButton>
                                <Text>Entrevista Recusada</Text>
                            </OpenButton>

                            <DataPost>{data.dataCriacaoSolicitacao}</DataPost>
                        </InfoArea>
                    </AreaRecusado>

                    :
                    <AreaAceito onPress={handleClick}>
                        {data.image ?
                            <Avatar source={{ uri: data.image }} />
                            :
                            <AvatarDefaut />
                        }

                        <InfoArea>
                            {perfil === "USUARIO" ?
                                <Title>{data.nomeEmpresa}</Title>
                                :
                                <Title>{data.nomeUsuario}</Title>
                            }
                            <Linha />
                            <SubTitle>{data.titulo}</SubTitle>

                            <CargoArea>
                                <SpacedArea>
                                    {data.setorCargoResponses.map((item, key) => (
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
                                <Text>Entrevista marcada</Text>
                            </OpenButton>

                            <DataPost>{data.dataCriacaoSolicitacao}</DataPost>
                        </InfoArea>
                    </AreaAceito>

            }
        </>
    )
}