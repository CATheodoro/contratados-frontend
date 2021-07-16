import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';



import ExpandIcon from '../assets/expand';
import { Alert } from 'react-native';

import Api from '../Api';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 20px;
  margin-right: 15px;
  background-color: #DDDDDD;
`;
const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

const ButtonArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  width: 40%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const FinishButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;


export default ({show, setShow, user}) => {
  const navigation = useNavigation();

 
  const handleCloseButton = () => {
    setShow(false);
  };

  const handleSendClick = async () => {

     let res = await Api.sendSoliciacao(user.id);
     if(res.anuncioVagaId === user.id) {
        alert("Solicitação Enviada Com Sucesso !!!");
        navigation.navigate('Home');
       }  else {
         alert("Erro: " + res.message);
         navigation.navigate('Home');
    }
  };

  const handleFinishClick = () => {
    setShow(false);
  }

  return (
    <Modal 
        transparent={true} 
        visible={show} 
        animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000000" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.image}} />
              <UserName>Deseja enviar o currículo para {user.nomeEmpresa} ?</UserName>
            </UserInfo>
          </ModalItem>


          <ButtonArea>
            <FinishButton onPress={handleSendClick}>
              <FinishButtonText>SIM</FinishButtonText>
            </FinishButton>

            <FinishButton onPress={handleFinishClick}>
              <FinishButtonText>NÃO</FinishButtonText>
            </FinishButton>
          </ButtonArea>

        </ModalBody>
      </ModalArea>
    </Modal>
  );
};