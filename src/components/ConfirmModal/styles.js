import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
export const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const UserInfo = styled.View`
  align-items: center;
  padding: 10px;
`;

export const SimpleButtonInfoArea = styled.TouchableOpacity`
    background-color: #4EADBE;
    border-radius: 10px;
    padding: 10px 10px;
    margin-right: 30px;
    align-items: center;
`;

export const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 20px;
  margin-right: 15px;
  background-color: #DDDDDD;
`;
export const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FinishButton = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  width: 40%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
export const FinishButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 10px;
`;