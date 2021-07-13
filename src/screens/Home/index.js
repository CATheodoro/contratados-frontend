import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api'

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButtom,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea

} from './styles';

import VagaItem from '../../components/VagaItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () =>{
        //BUSCA AUTOMATICA REMOVIDA
        // setCoords(null);
        // let result = await request(
        //     Platform.OS ==="ios" ?
        //         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        //         :
        //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

        // );
        // if(result == 'granted') {
        //     setLoading(true);
        //     setLocationText('');
        //     setList([]);

        //     Geolocation.getCurrentPosition((info)=>{
        //         setCoords(info.coords);
        //         getVagas();
        //     });
        // }
        getVagas();
    }

    const getVagas = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getVagas(locationText);

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

    const handleLocationSearch = () => {
        setCoords({});
        getVagas();
    }


    return (
        <Container>
            <Scroller refreshControl ={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle >Pronto para encontrar uma nova vaga de emprego ?</HeaderTitle>
                    <SearchButtom onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#63C2D1"/>
                    </SearchButtom>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFF" />
                    </LocationFinder>
                </LocationArea>
                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <VagaItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}