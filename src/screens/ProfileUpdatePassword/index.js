import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos } from './styles';

import { BackgroundImageProfile, } from '../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../styles/Basic';
    
import { PageBodyProfile, DescriptionArea } from '../styles/View';

import { Title, Text } from '../styles/Text';

import { BackButtom } from '../styles/Button';

//Styles END ###########################################################


import Api from '../../Api';

import SignInput from '../../components/SignInput';

import LockIcon from '../../assets/lock.svg'
import BackIcon from '../../assets/back.svg';
import InfoTopProfile from '../../components/InfoTopProfile';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [oldPasswordFiel, setOldPasswordField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [confirmPasswordField, setConfirmPasswordField] = useState('');

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email
    })

    const handleChangeClick = async () => {
        setLoading(true);
            if(oldPasswordFiel !='' && passwordField != ''){
    
                if(passwordField === confirmPasswordField){
                    if(passwordField !== oldPasswordFiel){
                        let res = await Api.updateSenhaUsuario(oldPasswordFiel,passwordField);
    
                        if(res.id) {
            
                            alert("Senha alterada com sucesso !!!");
                            navigation.navigate('Profile');
            
                        } else {
                            if(res.error){
                                alert("Erro: " + res.error);
                            } else
                                alert("Erro: " + res[0].error);
                            
                        }
                    } else {
                        alert("A nova senha não pode ser a mesma que a atual");
                    }

                } else {
                    alert ("Senhas diferentes, confirme sua senha novamente");
                }
    
            } else {
                alert ("Preencha os campos");
            }
            setLoading(false);
        }

        const handleBackButton = () => {
            navigation.goBack();
        }

    return (
        <Container>
            <Scroller>
                    <BackgroundImageProfile />      

                <PageBodyProfile>

                <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                    <Title>Deseja atualizar sua senha ?</Title>
                    <DescriptionArea>

                        <EntreEspacos/> 

                        <Text>Digite sua senha atual</Text>
                        <SignInput 
                            IconSvg={LockIcon}
                            placeholder="Senha atual"
                            value={oldPasswordFiel}
                            onChangeText={t=>setOldPasswordField(t)}
                            password = {true}
                        />
                        <EntreEspacos/>
                        <Linha/>

                        <Text>Digite sua nova senha</Text>
                        <SignInput 
                            IconSvg={LockIcon}
                            placeholder="Nova senha"
                            value={passwordField}
                            onChangeText={t=>setPasswordField(t)}
                            password = {true}
                        />
                        <Text>Confirme Sua nova senha</Text>
                        <SignInput 
                            IconSvg={LockIcon}
                            placeholder="Confirmar nova senha"
                            value={confirmPasswordField}
                            onChangeText={t=>setConfirmPasswordField(t)}
                            password = {true}
                        />

                        <EntreEspacos/>

                    <CustomButton onPress={handleChangeClick}>
                        {loading ?
                            <LoadingIconBasic size="large" color="#FFF" />
                            :
                            <CustomButtonText>ATUALIZAR</CustomButtonText>
                        }
                    </CustomButton>

                    </DescriptionArea>


                </PageBodyProfile>

            </Scroller>

            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}