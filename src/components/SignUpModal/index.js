import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



import ExpandIcon from '../../assets/expand';

import Api from '../../Api';

import {
  Modal, ModalArea, ModalBody, CloseButton, ModalItem,
  UserInfo, UserName, ButtonArea,
  FinishButton, LoadingIcon
} from './styles';
import { TextGreen, TextOrange } from '../../screens/styles/Text';



export default ({ show, setShow, password, email, name }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleSendClick = async (typeUser) => {
    setLoading(true);

    if (typeUser === 'USUARIO') {

      let res = await Api.signUpUsuario(name, email, password);
      if (res.id) {
        alert("Usuário cadastrado com sucesso !!!");
        navigation.reset({
          routes: [{ name: 'SignIn' }]
        });
      } else {
        if (res.error) {
          alert("Erro: " + res.error);
        } else
          alert("Erro: " + res[0].error);
      }


    } else {
      
      let res = await Api.signUpEmpresa(name, email, password);
      if (res.id) {
        alert("Empresa cadastrado com sucesso !!!");
        navigation.reset({
          routes: [{ name: 'SignIn' }]
        });
      } else {
        if (res.error) {
          alert("Erro: " + res.error);
        } else
          alert("Erro: " + res[0].error);
      }

    }
    setLoading(false);
  };


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
              <UserName>CADASTRAR COMO: </UserName>
            </UserInfo>
          </ModalItem>


          {loading ?
            <LoadingIcon size="large" color="#FFF" />
            :
            <ButtonArea>
              <FinishButton onPress={() => handleSendClick("USUARIO")}>
                <TextGreen>Usuário</TextGreen>
              </FinishButton>

              <FinishButton onPress={() => handleSendClick("EMPRESA")}>
                <TextOrange>Empresa</TextOrange>
              </FinishButton>
            </ButtonArea>
          }
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};