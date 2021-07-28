import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 

import Api from '../../../Api'

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    Title,
    SearchButtom,

    BuscarArea,
    LocationArea,
    LocationInput,
    LocationFinder,

    Button,
    ButtonText,

    LoadingIcon,
    ListArea

} from './styles';

import VagaItem from '../../../components/VagaItem';

import SearchIcon from '../../../assets/search.svg';
import MyLocationIcon from '../../../assets/my_location.svg';
import OfficeAddressIcon from '../../../assets/office-address.svg';


import { Linha } from '../../styles/View';

export default () => {

    const [locationText, setLocationText] = useState('');
    const [cargoText, setCargoText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [perfil, setPerfil] = useState('');

    const handleLocationFinder = async () =>{
        getAnuncioVagas();
    }

    const getPerfil = async () => {
        setPerfil(await AsyncStorage.getItem('perfil'));
    }

    const getAnuncioVagas = async () => {
        setLoading(true);
        setList([]);
        let res = await Api.getVagas('', locationText, cargoText);

        if(res.content) {
             setList(res.content);

         } else {
             alert("Erro"+res.error)
         }
        setLoading(false);
    }


    const refresh = () =>{
        setRefreshing(false);
        setLocationText('');
        getAnuncioVagas();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getAnuncioVagas();
    }

    useEffect(()=>{
        getPerfil();
    }, []);


    return (
        <Container>
            <Scroller refreshControl ={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                
                <HeaderArea>
                    <HeaderTitle >Buscar</HeaderTitle>
                    <SearchButtom>
                        <SearchIcon width="26" height="26" fill="#63C2D1"/>
                    </SearchButtom>
                </HeaderArea>

                <BuscarArea>
                    <Title>Buscar Local</Title>
                    <LocationArea>
                        <LocationInput 
                            placeholder={perfil === 'USUARIO' ? "Onde você está ?" : "Local do anúncio"}
                            placeholderTextColor="#FFFFFF"
                            value={locationText}
                            onChangeText={t=>setLocationText(t)}
                        />
                        <LocationFinder onPress={handleLocationFinder}>
                            <MyLocationIcon width="24" height="24" fill="#FFF" />
                        </LocationFinder>
                    </LocationArea>

                    <Title>Buscar Cargo</Title>
                    <LocationArea>
                        <LocationInput 
                            placeholder={perfil === 'USUARIO' ? "Qual cargo você deseja ?" : "Filtrar cargo"}
                            placeholderTextColor="#FFFFFF"
                            value={cargoText}
                            onChangeText={t=>setCargoText(t)}
                            onEndEditing={handleLocationSearch}
                        />
                        <LocationFinder onPress={handleLocationFinder}>
                            <OfficeAddressIcon width="24" height="24" fill="#FFF" />
                        </LocationFinder>
                    </LocationArea>

                </BuscarArea>

                <Button onPress={()=>handleLocationFinder()}>
                        <ButtonText>Buscar</ButtonText>
                </Button>
                <Linha/>
                {loading &&
                    <LoadingIcon size="large" color="#63C2D1" />
                }

                <ListArea>
                    {/*problema de duplicação de chave CARGO */
                    list.map((item, key)=>(
                        <VagaItem key={key} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}