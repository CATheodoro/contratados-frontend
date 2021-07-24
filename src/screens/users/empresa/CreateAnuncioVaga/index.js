import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { CustomButton, CustomButtonText, Linha, EntreEspacos, LinhaCentral, EntreEspacosGrande, InputButtonArea, InputButtonText } from './styles';

import { BackgroundImageProfile } from '../../../styles/Image';

import { Container, Scroller, LoadingIconBasic } from '../../../styles/Basic';
    
import { PageBodyProfile,  DescriptionArea, InvisibleDescriptionArea } from '../../../styles/View';

import { TextBold, Title, Text, ButtonWhiteText } from '../../../styles/Text';

import { BackButtom, PdfButton, PerfilButton } from '../../../styles/Button';

//Styles END ###########################################################


import Api from '../../../../Api';

import SignInput from '../../../../components/SignInput';

import BackIcon from '../../../../assets/back.svg';
import EmailIcon from '../../../../assets/email.svg'
import TodayIcon from '../../../../assets/today.svg';
import PersonIcon from '../../../../assets/person.svg'
import InfoTopProfile from '../../../../components/InfoTopProfile';



import TimePiker from '@react-native-community/datetimepicker';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.empresaId,
        nome: route.params.nome,
    });

    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

    const [viaCep, setViaCep] = useState({})

    const [tituloField, setTituloField] = useState('');
    const [requisitoField, setRequisitoField] = useState('');
    const [descricaoField, setDescricaoField] = useState('');

    const [enderecoCepField, setEnderecoCepField] = useState(userInfo.cep);
    const [complementoField, setComplementoField] = useState(userInfo.complemento);
    const [numeroField, setNumeroField] = useState(userInfo.numero);

    const [cargaHoraria, setCargaHoraria] = useState(new Date());
    const [salarioField, setSalarioField] = useState(userInfo.numero);

    const handleChangeClick = async () => {
        setLoading(true);

            let res = await Api.postVaga(
                tituloField, 
                requisitoField,
                descricaoField,
                enderecoCepField, 
                complementoField, 
                numeroField, 
                cargaHoraria.toLocaleTimeString(), 
                salarioField
                );

             if(res.id) {

                 alert("Anúncio cadastrado com sucesso !!!");
                 navigation.goBack();
            
            } else {
                if(res.error){
                    alert("Erro: " + res.error);
                } else
                    alert("Erro: " + res[0].error);
                
            }
            setLoading(false);
        }
        

        const handleCepClick = async () => {
            if(enderecoCepField != '' && enderecoCepField != null){
                if(enderecoCepField.length == 8){
                    setLoadingCep(true);
                    let res = await Api.getViaCep(enderecoCepField);
            
                        if(res.cep) {
                            setViaCep(res);
                        } else {
                            alert("Cep inválido");
                            setEnderecoCepField('');
                        }
                    setLoadingCep(false);
                } else {
                    alert("O cep deve conter 8 dígitos");
                    setEnderecoCepField('');
                }
            }
        }

        
        const getPerfilEmpresa = async () =>{
            setLoading(true);
            getCep();
            let json = await Api.getPerfilEmpresa(userInfo.id);
            if(json){
                setUserInfo(json);
            } else {
                alert("Erro: "+json.error);
            }
            setLoading(false);
        };

        const getCep = async () => {
            
            if(enderecoCepField != '' && enderecoCepField != null){
                setLoadingCep(true);
                let res = await Api.getViaCep(enderecoCepField);
                setViaCep(res);  
                setLoadingCep(false);
            }
        }

        useEffect(()=>{
            getPerfilEmpresa();
        },[]);

        const handleBackButton = () => {
            navigation.goBack();
        }

        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || dataNascimentoField;
            setShow(Platform.OS === 'ios');
            setCargaHoraria(currentDate);
          };
        
        const [show, setShow] = useState(false);

        const showMode = () => {
            setShow(true);
          };

        

    return (
        <Container>
            <Scroller>
                    <BackgroundImageProfile />      

                <PageBodyProfile>

                <InfoTopProfile nome={userInfo.nome} email={userInfo.email} image={''} />

                <EntreEspacosGrande/>

                    <Title>Deseja criar um novo anúncio ?</Title>
                    <DescriptionArea>

                        <EntreEspacos/>

                        <Title>Informações obrigatórias</Title>
                        <InvisibleDescriptionArea>
                            <Text>Título do anúncio</Text>
                            <SignInput 
                                IconSvg={PersonIcon}
                                placeholder="Título"
                                value={tituloField}
                                onChangeText={t=>setTituloField(t)}
                                password = {false}
                            />

                            <Text>Requisitos para a vaga</Text>
                            <SignInput 
                                IconSvg={PersonIcon}
                                placeholder="Requisitos"
                                value={requisitoField}
                                onChangeText={t=>setRequisitoField(t)}
                                password = {false}
                            />

                            <Text>Descrição da vaga</Text>
                            <SignInput 
                                IconSvg={PersonIcon}
                                placeholder="Descrição"
                                value={descricaoField}
                                onChangeText={t=>setDescricaoField(t)}
                                password = {false}
                            />


                            <Title>Localização</Title>
                    
                            <Text>Alterar CEP</Text>
                            <SignInput 
                                IconSvg={EmailIcon}
                                placeholder="CEP"
                                value={enderecoCepField}
                                onChangeText={t=>setEnderecoCepField(t)}
                                password = {false}
                                keyboardType = 'number-pad'
                                onEndEditing={handleCepClick}
                            />

                            {loadingCep &&
                                <LoadingIconBasic size="large" color="#63C2D1" />                                
                            }

                            {viaCep.cep &&
                                <>
                                    <DescriptionArea>
                                        <TextBold>Rua: <Text>{viaCep.logradouro}</Text></TextBold>
                                        <TextBold>Bairro: <Text>{viaCep.bairro}</Text></TextBold>
                                        <TextBold>Cidade: <Text>{viaCep.localidade}</Text></TextBold>
                                        <TextBold>Estado: <Text>{viaCep.uf}</Text></TextBold>
                                    </DescriptionArea>

                                    <Text>Alterar complemento</Text>
                                    <SignInput 
                                        IconSvg={EmailIcon}
                                        placeholder="Complemento"
                                        value={complementoField}
                                        onChangeText={t=>setComplementoField(t)}
                                        password = {false}                                    
                                    />

                                    <Text>Alterar número</Text>
                                    <SignInput 
                                        IconSvg={EmailIcon}
                                        placeholder="Número"
                                        value={numeroField}
                                        onChangeText={t=>setNumeroField(t)}
                                        password = {false}
                                        keyboardType = 'number-pad'
                                    />
                                </>
                            }

                        </InvisibleDescriptionArea>


                        <LinhaCentral/>
                        <Title>Informações opcionais</Title>
                        <InvisibleDescriptionArea>
                            <Text>Carga horária</Text>
                                <InputButtonArea onPress={showMode}>
                                        <TodayIcon width="24" height="24" fill="#268596" />
                                        <InputButtonText>{cargaHoraria.toLocaleTimeString()}</InputButtonText>
                                </InputButtonArea>

                                {show && (
                                    <TimePiker
                                    value={cargaHoraria}
                                    mode='time'
                                    onChange={onChange}
                                    />
                                )}

                            <Text>Salário</Text>
                            <SignInput 
                                IconSvg={EmailIcon}
                                placeholder="Salário"
                                value={salarioField}
                                onChangeText={t=>setSalarioField(t)}
                                password = {false}
                                keyboardType = 'number-pad'
                            />
                        </InvisibleDescriptionArea>

                        <LinhaCentral/>


                        <EntreEspacos/>

                        <CustomButton onPress={handleChangeClick}>
                            {loading ?
                                <LoadingIconBasic size="large" color="#FFF" />
                                :
                                <CustomButtonText>CRIAR NOVO ANÚNCIO</CustomButtonText>
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