import React from 'react';
import styled from 'styled-components/native';

import Stars from '../components/Stars';

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

const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;


const SeeProfileButtonText = styled.Text`
    font-size: 14px;
    color: #268596;
`;

const DataPost = styled.Text`
    font-size: 10px;
    color: #FFF;
`;


export default ({data}) => {
    return(
        <Area>

                {data.avatar == '' ?
                    <Avatar source = {{uri: data.avatar}} />
                    :
                    <AvatarDefaut />
                }
            
            <InfoArea>
                <UserName>{data.requisitos}</UserName>

                <Stars stars={data.stars} showNumber={true} />

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Vaga</SeeProfileButtonText>
                </SeeProfileButton>

                <DataPost>{data.dataPostagem}</DataPost>
            </InfoArea>
        </Area>
    )
}