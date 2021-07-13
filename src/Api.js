import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'http://192.168.1.38:8080';

export default {
    checkToken: async (token)=>{
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
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

    getVagas: async (location=null) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/anunciovaga/usuariovagas?localidade=${location}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await req.json();
        return json;
    }
}

