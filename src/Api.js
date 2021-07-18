import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'http://192.168.1.38:8080';

export default {

    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth`, {
            
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();        
        return json;
    },

    signUp: async (nome, email, senha) =>{
        const req = await fetch(`${BASE_API}/usuario`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({nome, email, senha})
        });
        const json = await req.json();
        return json;
    },

    getVagas: async (page='' , location='', cargo='') => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/anunciovaga/usuariovagas?page=${page}&localidade=${location}&cargo=${cargo}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await req.json();
        return json;
    },

    getVaga: async (id) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/anunciovaga/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await req.json();
        return json;
    },

    sendSoliciacao: async (id) =>{
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/solicitacao`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({anuncioVagaId: id})
        });
        const json = await req.json();
        console.log(json);
        return json;
    },

    getPerfilEmpresa: async (id='0') => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/empresa/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await req.json();
        return json;
    },

    getPerfilUsuario: async (id='0') => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/usuario/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await req.json();
        return json;
    },

}

