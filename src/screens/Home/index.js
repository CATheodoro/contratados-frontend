import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api'

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButtom,

    LoadingIcon,
    ListArea,


} from './styles';

import VagaItem from '../../components/VagaItem';

import SearchIcon from '../../assets/search.svg';
import { Linha } from '../styles/View';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getVagas = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getVagas();

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
                    <HeaderTitle >Pronto para encontrar um novo emprego ?</HeaderTitle>
                    <SearchButtom onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#63C2D1"/>
                    </SearchButtom>
                </HeaderArea>
                <Linha/>
                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {list.map(item=>(
                        <VagaItem key={item.id} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}