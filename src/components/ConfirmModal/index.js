import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';



import ExpandIcon from '../../assets/expand';

import Api from '../../Api';
import { Text } from '../../screens/styles/Text';

import {
  Modal, ModalArea, ModalBody, CloseButton, ModalItem,
  UserInfo, UserAvatar, UserName, ButtonArea,
  FinishButton, FinishButtonText, LoadingIcon
} from './styles';



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
      if (choose === 'cancelar') {
        let res = await Api.usuarioSoliciacao('CANCELADO', user.id);
        if (res.id === user.id) {
          alert("Solicitação Cancelada");
          navigation.navigate('Home');
        } else {
          alert("Erro: " + res.error);
          navigation.navigate('Home');
        }
      } else {
        if (choose === 'aceitar') {
          let res = await Api.usuarioSoliciacao('ACEITO', user.id);
          if (res.id === user.id) {
            alert("Solicitação Confirmada");
            navigation.navigate('Home');
          } else {
            alert("Erro: " + res.error);
            navigation.navigate('Home');
          }
        } else {
          if (choose === 'aceitarSolicitacao') {
            let res = await Api.empresaSolicitacao('ACEITO', user.id);

            if (res.id === user.id) {
              alert("Solicitação Aceita");

              navigation.navigate('SolicitacaoEmpresaUpdate', {
                id: res.id,
                empresaId: res.empresaId,
                descricao: '',
                horaEntrevista: '',
                dataEntrevista: '',

                enderecoCep: '',
                complemento: '',
                numero: '',
                atualizar: '',
              });
          } else {
            alert("Erro: " + res.error);
            navigation.navigate('Home');
          }
        } else {
          let res = await Api.empresaSolicitacao('RECUSADO', user.id);
          if (res.id === user.id) {
            alert("Solicitação Recusada");
            navigation.navigate('Home');
          } else {
            alert("Erro: " + res.error);
            navigation.navigate('Home');
          }

        }
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