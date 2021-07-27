import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos } from './styles';

import { BackgroundImageProfile } from '../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../styles/Basic';
    
import { PageBodyProfile,  DescriptionArea } from '../../styles/View';

import { Title, Text } from '../../styles/Text';

import { BackButtom } from '../../styles/Button';

//Styles END ###########################################################


import Api from '../../../Api';

import SignInput from '../../../components/SignInput';

import LockIcon from '../../../assets/lock.svg'
import BackIcon from '../../../assets/back.svg';
import EmailIcon from '../../../assets/email.svg'
import InfoTopProfile from '../../../components/InfoTopProfile';


export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [oldPasswordFiel, setOldPasswordField] = useState('');
    const [itemField, setItemField] = useState('');
    const [confirmItemField, setConfirmItemField] = useState('');

    const [userInfo, setUserInfo] = useState({
        nome: route.params.nome,
        email: route.params.email,
        type: route.params.type,
        perfil: route.params.perfil
    })


    const handleChangeClick = async () => {
        setLoading(true);
            if(oldPasswordFiel !='' && itemField != ''){

                if(userInfo.perfil === 'USUARIO'){

                    if(userInfo.type==='e-mail'){
                        if(itemField === confirmItemField){
                            if(itemField !== userInfo.email){
    
                                let res = await Api.updateEmailUsuario(oldPasswordFiel, itemField);
                
                                if(res.id) {
                    
                                    alert("E-mail alterada com sucesso !!!");
                                    navigation.navigate('Profile');
                    
                                } else {
                                    if(res.error){
                                        alert("Erro: " + res.error);
                                    } else
                                        alert("Erro: " + res[0].error);
                                    
                                }
                            } else {
                                alert("O novo e-mail não pode ser o mesmo que o atual")
                            }
                        } else {
                            alert ("E-mail diferente, confirme seu e-mail novamente");
                        }
                    } else {
                        if(itemField === confirmItemField){
                            if(itemField !== oldPasswordFiel){
                                let res = await Api.updateSenhaUsuario(oldPasswordFiel, itemField);
            
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
                    }
                } else {
        
                    if(userInfo.type==='e-mail'){
                        if(itemField === confirmItemField){
                            if(itemField !== userInfo.email){
    
                                let res = await Api.updateEmailEmpresa(oldPasswordFiel, itemField);
                
                                if(res.id) {
                    
                                    alert("E-mail alterada com sucesso !!!");
                                    navigation.navigate('Profile');
                    
                                } else {
                                    if(res.error){
                                        alert("Erro: " + res.error);
                                    } else
                                        alert("Erro: " + res[0].error);
                                    
                                }
                            } else {
                                alert("O novo e-mail não pode ser o mesmo que o atual")
                            }
                        } else {
                            alert ("E-mail diferente, confirme seu e-mail novamente");
                        }
                    } else {
                        if(itemField === confirmItemField){
                            if(itemField !== oldPasswordFiel){
                                let res = await Api.updatePasswordEmpresa(oldPasswordFiel, itemField);
            
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
                    }
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

                    {userInfo.type ==='e-mail' ?
                            <Title>Deseja atualizar seu e-mail ?</Title>
                            :
                            <Title>Deseja atualizar sua senha ?</Title>
                    }
                    
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

                        {userInfo.type ==='e-mail' ?
                            <Text>Digite seu novo e-mail</Text>
                            :
                            <Text>Digite sua nova senha</Text>
                        }
                        
                        <SignInput 
                            IconSvg={userInfo.type ==='e-mail' ? EmailIcon : LockIcon}
                            placeholder={userInfo.type ==='e-mail' ? "Novo e-mail" : "Nova senha"}
                            value={itemField}
                            onChangeText={t=>setItemField(t)}
                            password = {userInfo.type ==='e-mail' ? false : true}
                            keyboardType = {userInfo.type ==='e-mail' ? 'email-address' : 'default'}
                        />

                        
                        {userInfo.type ==='e-mail' ?
                            <Text>Confirme seu novo e-mail</Text>
                            :
                            <Text>Confirme Sua nova senha</Text>
                        }
                        
                        <SignInput 
                            IconSvg={userInfo.type ==='e-mail' ? EmailIcon : LockIcon}
                            placeholder={userInfo.type ==='e-mail' ? "Confirmar novo e-mail" : 'Confirmar nova senha'}
                            value={confirmItemField}
                            onChangeText={t=>setConfirmItemField(t)}
                            password = {userInfo.type ==='e-mail' ? false : true}
                            keyboardType = {userInfo.type ==='e-mail' ? 'email-address' : 'default'}
                        />

                        <EntreEspacos/>
                    
                    <CustomButton onPress={handleChangeClick}>
                        {loading ?
                            <LoadingIconBasic size="large" color="#FFF" />
                            :
                            <CustomButtonText>Atualizar {userInfo.type}</CustomButtonText>
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