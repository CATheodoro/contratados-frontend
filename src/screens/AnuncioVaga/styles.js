import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;

`;

export const ScrollerAnuncio = styled.ScrollView`
    flex: 1;
`;

export const BackgroundImage = styled.View`
    background-color: #63C2D1;
    height: 240px;
`;

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

export const UserAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left 30px;
    margin-right: 20px;
    border-width: 4px;
    border-color: #FFFFFF
`;

export const UserAvatarDefault = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
    border-width: 4px;
    border-color: #FFFFFF
    background-color: #DDDDDD
`;


export const UserInfoName = styled.Text`
    flex: 1;
    justify-content: flex-end;
    margin-top: 35px;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

export const UserFavButton = styled.TouchableOpacity`
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
    font-size: 16px;
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

    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;

    border: 1px solid #63C2D1;
    border-radius: 10px;
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
    color: #268596;
`;

export const CargoChooseButton = styled.TouchableOpacity`
    background-color: #4EADBE;
    border-radius: 10px;
    padding: 10px 15px;

    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    margin-top: 30px;
    align-items: center;
`;

export const CargoChooseButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
`;


export const BackButtom = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    border: 2px solid #63C2D1;
`;


