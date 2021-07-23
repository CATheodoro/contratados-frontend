import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    width: 80%;
    font-size: 22px;
    font-weight: bold;
    color: #63C2D1;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #63C2D1;
    margin-left: 10px;
    margin-right: 10px;
`;

BuscarArea
export const BuscarArea = styled.View`
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid #63C2D1;
    border-radius: 10px;
`;

export const SearchButtom = styled.TouchableOpacity`
    width: 46px;
    height: 26px;
`;

export const LocationArea = styled.View`
    background-color: #63C2D1;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFFFFF;

`;

export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity`
    margin-bottom: 20px;
    margin-top: 20px;

    background-color: #268596;
    height: 60px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
`;