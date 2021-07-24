import styled from 'styled-components/native';

export const TabArea = styled.View`
    height: 60px;
    background-color: #4EADBE;
    flex-direction: row;
`;
export const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const TabItemCenter = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 30px;
    border: 3px solid #4EADBE;
`;
export const AvatarIcon = styled.Image`
    width: 28px;
    height: 28px;
    border-radius: 14px;
`;