import React, { useContext } from 'react';
import { Text } from 'react-native';

import { UserContext } from '../../contexts/UserContext';

import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import ContratoIcon from '../../assets/contrato.svg';
import AccountIcon from '../../assets/account.svg';


import { TabArea, TabItem, TabItemCenter, AvatarIcon } from './styles';

export default ({ state, navigation }) => {
    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="28" height="28" fill="#FFFFFF" />
                <Text style={{color:"#FFFFFF", opacity: state.index===0? 1 : 0.5}} >Início</Text>
            </TabItem>

            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5, color : "#FFF"}} width="28" height="28" fill="#FFFFFF" />
                <Text style={{color:"#FFFFFF", opacity: state.index===1? 1 : 0.5}} >Buscar</Text>
            </TabItem>

            <TabItemCenter onPress={()=>goTo('FilterSolicitacoes')}>
                <TodayIcon style={{opacity: state.index===2? 1 : 0.8}} width="32" height="32" fill="#4EADBE" />
            </TabItemCenter>

            <TabItem onPress={()=>goTo('Solicitacoes')}>
                <ContratoIcon style={{opacity: state.index===3? 1 : 0.5}} width="28" height="28" fill="#FFFFFF" />
                <Text style={{color:"#FFFFFF", opacity: state.index===3? 1 : 0.5}} >Solicitações</Text>
            </TabItem>
            
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="28" height="28" fill="#FFFFFF" />
                }
                <Text style={{color:"#FFFFFF", opacity: state.index===4? 1 : 0.5}} >Perfil</Text>
            </TabItem>
        </TabArea>
    );
}