import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const BackgroundImage = styled.View`
    background-color: #272727;
    height: 240px;
`;

export const PageBody = styled.View`
    background-color: #FFFFFF;
    margin-top: -40px;
    min-height: 75%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;

export const EmpresaInfoArea = styled.View`
    margin-top: -50px;
    justify-content: center;
    align-items: center;
`;




export const EmpresaInfoName = styled.Text`
    flex: 1;
    justify-content: flex-end;
    margin-top: 10px;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

export const EmpresaFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border: 2px solid #999999;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;

`;

export const DescriptionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #268596;
    margin-left: 10px;
    margin-bottom: 10px;
`;


export const DescriptionArea = styled.View`
    margin-top: 20px;

    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;

    border: 1px solid #63C2D1;
    border-radius: 10px;
`;

export const TextBold = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #268596;
    margin-left: 20px;
`;

export const Text = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    margin-left: 20px;
`;

export const EncercoArea = styled.View`
    margin-top: 10px;

    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

`;

export const EnderecoTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #268596;
    margin-left: 30px;
    margin-top: 20px;
`; 

export const CargoArea = styled.View`
    margin-top: 20px;
`;

export const CargoTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #268596;
    margin-left: 30px;
    margin-bottom: 10px;
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


export const BackButtom = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    border: 2px solid #63C2D1;
`;

export const ExitButton = styled.TouchableOpacity`
    border-radius: 10px;
    border: 1px solid #FC4445;
    padding: 10px 15px;

    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 20px;
    margin-top: 50px;
    align-items: center;
    
`;

export const ExitButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FC4445;
`;

