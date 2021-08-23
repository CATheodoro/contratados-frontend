import styled from 'styled-components/native';

export const AreaPendente = styled.TouchableOpacity`
    background-color: #63C2D1;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

export const AreaRecusado = styled.TouchableOpacity`
    background-color: #E27D60;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

export const AreaAceito = styled.TouchableOpacity`
    background-color: #3D9970;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

export const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

export const AvatarDefaut = styled.Text`
    width: 88px;
    height: 88px;
    border-radius: 20px;
    background-color: #DDDDDD
`;


export const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

export const Title = styled.Text`
    width: 225px;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const SubTitle = styled.Text`
    width: 225px;
    font-size: 16px;
    color: #FFF;
`;

export const Linha = styled.View`
    border: 1px solid #FFF;
`;

export const CargoArea = styled.View`
    width: 225px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;

    margin-bottom: 5px;
    margin-top: 15px;
`;

export const LocationArea = styled.View`
    margin-left: 10px;
    margin-right: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export const SpacedArea = styled.View`
    margin-left: 10px;
    margin-right: 10px;
`;

export const OpenButton = styled.View`
    width: 225px;
    height: 26px;
    border: 1px solid #FFF;
    background-color: #FFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text`
    font-size: 14px;
    color: #268596;
`;

export const DataPost = styled.Text`
    font-size: 10px;
    color: #FFF;
    text-align: right;
`;

