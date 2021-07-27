import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'; 

import Api from '../../../Api'

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButtom,

    LoadingIcon,
    ListArea,


} from './styles';

import { Linha } from '../../styles/View';
import SolicitacaoItem from '../../../components/SolicitacaoItem';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [perfil, setPerfil] = useState('');

    
    const getPerfil = async () => {
        setPerfil(await AsyncStorage.getItem('perfil'));
    }

    const getVagas = async () => {
        setLoading(true);

        let res = await Api.getSolicitacoes('', '','ACEITO');

        if(res.content) {
            setList(res.content);
         } else {
             alert("Erro"+res.error)
         }
        setLoading(false);
    }

    useEffect(()=>{
        getPerfil();
        getVagas();
    }, []);

    const refresh = () =>{
        setRefreshing(false);
        getVagas();
    }

    return (
        <Container>
            <Scroller refreshControl ={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle >Solicitações Aceitas</HeaderTitle>
                </HeaderArea>

                <Linha/>

                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {list.map(item=>(
                        <SolicitacaoItem key={item.id} data={item}  perfil={perfil} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}