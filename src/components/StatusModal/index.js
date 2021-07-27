import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



import ExpandIcon from '../../assets/expand';

import Api from '../../Api';

import { Modal, ModalArea, ModalBody, CloseButton, ModalItem, 
  UserInfo, UserAvatar, UserName, ButtonArea,
  FinishButton, FinishButtonText, LoadingIcon } from './styles';
import { TextGreen, TextOrange } from '../../screens/styles/Text';



export default ({ show, setShow, status }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleSendClick = async (changeStatus) => {
    setLoading(true);
 
        let res = await Api.updateStatus(changeStatus);
        if (res.id) {
          alert("Status atualizado");
          setShow(false);
        } else {
          alert("Erro: " + res.error);
          setShow(false);
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
              <UserAvatar />
              <UserName>Aletrar status</UserName>
            </UserInfo>
          </ModalItem>


          {loading ?
            <LoadingIcon size="large" color="#FFF" />
            :
            <ButtonArea>
              <FinishButton onPress={() => handleSendClick("DISPONIVEL")}>
                <TextGreen>Disponível</TextGreen>
              </FinishButton>

              <FinishButton onPress={() => handleSendClick("INDISPONIVEL")}>
                <TextOrange>Indisponível</TextOrange>
              </FinishButton>
            </ButtonArea>
          }
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};