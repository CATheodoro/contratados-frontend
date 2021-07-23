import styled from 'styled-components/native';

export const Linha = styled.View`
    border: 1px solid #63C2D1;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
`;

export const EntreEspacos = styled.View`
    margin-bottom: 10px;
`;

export const EntreEspacosGrande = styled.View`
    margin-bottom: 20px;
`;


export const CustomButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 15px;
    margin-right: 15px;
`;

export const CustomListButton = styled.TouchableOpacity`
    background-color: #268596;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 15px;
    width: 100px;
    height: 50px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const ObjectItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;
    border: 1px solid #63C2D1;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
`;

export const ObjectInfo = styled.View`
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
`;

export const Description = styled.Text`
    font-size: 16px;
    color: #268596;
`;

export const SubDescription = styled.Text`
    font-size: 14px;
    color: #000000;
`;