import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';



import ExpandIcon from '../../assets/expand';

import Api from '../../Api';
import { Text } from '../../screens/styles/Text';

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
  padding: 10px;
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

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 10px;
`;


export default ({ show, setShow, user, description, choose }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleSendClick = async () => {
    setLoading(true);
    if (choose === "enviar") {

      let res = await Api.sendSoliciacao(user.id);
      if (res.anuncioVagaId === user.id) {
        alert("Solicitação Enviada Com Sucesso !!!");
        navigation.navigate('Home');
      } else {
        alert("Erro: " + res.error);
        navigation.navigate('Home');
      }


    } else {
      if(choose === 'cancelar'){
        let res = await Api.usuarioSoliciacao('CANCELADO', user.id);
        console.log(res);
        if (res.id === user.id) {
          alert("Solicitação Cancelada");
          navigation.navigate('Home');
        } else {
          alert("Erro: " + res.error);
          navigation.navigate('Home');
        }
      } else {
        let res = await Api.usuarioSoliciacao('ACEITO', user.id);
        console.log(res);
        if (res.id === user.id) {
          alert("Solicitação Confirmada");
          navigation.navigate('Home');
        } else {
          alert("Erro: " + res.error);
          navigation.navigate('Home');
        }
      }


    }
    setLoading(false);
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
              <UserAvatar />
              <UserName>{description}</UserName>
            </UserInfo>
          </ModalItem>

          {choose === "cancelar" ?
            <ModalItem>
              <UserInfo>
                <Text>Lembre-se não há como reverter esta operação</Text>
              </UserInfo>
            </ModalItem>

            : 
            choose === "aceitar" &&

            <ModalItem>
              <UserInfo>
                <Text>Caso esteje insatisfeito como o horario ou local da entrevista ligue para empresa para alterar a data ou local da entrevista.</Text>
              </UserInfo>
            </ModalItem> 
          }

          {loading ?
            <LoadingIcon size="large" color="#FFF" />
            :
            <ButtonArea>
              <FinishButton onPress={handleSendClick}>
                <FinishButtonText>SIM</FinishButtonText>
              </FinishButton>

              <FinishButton onPress={handleFinishClick}>
                <FinishButtonText>NÃO</FinishButtonText>
              </FinishButton>
            </ButtonArea>
          }



        </ModalBody>
      </ModalArea>
    </Modal>
  );
};