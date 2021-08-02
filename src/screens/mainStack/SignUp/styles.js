import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #268596;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #268596;
    font-weight: bold;
    margin-left: 5px;
`;

export const LoadingIcon = styled.ActivityIndicator`
`;


export const TextWhite = styled.Text`
    margin-left: 20px;
    font-size: 16px;
    color: #FFF;
`;
