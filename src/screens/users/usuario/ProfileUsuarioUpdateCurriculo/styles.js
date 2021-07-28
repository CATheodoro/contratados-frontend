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
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const CargoItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;
    border: 1px solid #63C2D1;
    border-radius: 10px;
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


export const InputButtonArea = styled.TouchableOpacity`
    margin-left: 20px;
    margin-right: 20px;
    height: 60px;
    background-color: #FFFFFF;
    flex-direction: row;
    border-radius: 15px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
    border: 1px solid #63C2D1;
`;

export const InputButtonText = styled.Text`
    flex: 1;
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
`;