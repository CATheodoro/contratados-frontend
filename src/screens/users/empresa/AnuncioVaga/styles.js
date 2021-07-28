import styled from 'styled-components/native';


export const PageBody = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 50px;
    margin-top: -40px;
    min-height: 75%;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -35px;
`;

export const UserInfo = styled.View`
    flex: 1;
`;

export const UserInfoName = styled.Text`
    margin-top: 35px;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

export const SimpleButtonInfoArea = styled.TouchableOpacity`
    background-color: #FFF;
    border: 1px solid #63C2D1;
    border-radius: 10px;
    padding: 10px 10px;

    margin-right: 30px;

    align-items: center;
`;

export const CargoItem = styled.View` 
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;
    border: 1px solid #63C2D1;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
`;

export const CargoInfo = styled.View`
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
`;

export const CargoName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #268596;
`;

export const CargoSetor = styled.Text`
    font-size: 14px;
    color: #000000;
`;

