import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/mainTab/Home';
import Search from '../screens/mainTab/Search';
import FilterSolicitacoes from '../screens/mainTab/FilterSolicitacoes';
import Solicitacoes from '../screens/mainTab/Solicitacoes';
import Profile from '../screens/mainTab/Profile';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="FilterSolicitacoes" component={FilterSolicitacoes} />
        <Tab.Screen name="Solicitacoes" component={Solicitacoes} />
        <Tab.Screen name="Profile" component={Profile} />
        
    </Tab.Navigator>
);