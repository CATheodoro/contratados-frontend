import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    const getVagas = async () => {
        setLoading(true);

        let res = await Api.getSolicitacoes('', '');

        if(res.content) {
            setList(res.content);
         } else {
             alert("Erro"+res.error)
         }
        setLoading(false);
    }

    useEffect(()=>{
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
                    <HeaderTitle >Solicitações enviadas</HeaderTitle>
                </HeaderArea>

                <Linha/>

                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {list.map(item=>(
                        <SolicitacaoItem key={item.id} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}