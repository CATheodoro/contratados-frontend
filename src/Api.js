import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'http://192.168.1.38:8080';
const VIA_CEP = 'https://viacep.com.br/ws';

export default {

    getViaCep: async (cep) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${VIA_CEP}/${cep}/json/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            }
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

    updateEmailUsuario: async (email) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/email/0`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({email})
        });
        const json = await req.json();
        return json;
    },

    updateSenhaUsuario: async (oldPassword, password) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/usuario/senha/0`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({oldPassword, password})
        });
        const json = await req.json();
        return json;
    },
    
    updateEmailUsuario: async (oldPassword, email) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/usuario/email/0`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({oldPassword, email})
        });
        const json = await req.json();
        return json;
    },

    updateUsuario: async (nome, dataNascimento, celular, telefone, status, enderecoCep, complemento, numero) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/usuario/0`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome, dataNascimento, celular, telefone, status, enderecoCep, complemento, numero})
        });
        const json = await req.json();
        return json;
    },

    createExperiencia: async (descricao, inicio, termino) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/experiencia`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({descricao, inicio, termino})
        });
        const json = await req.json();
        return json;
    },

    
    updateExperiencia: async (descricao, inicio, termino, id) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/experiencia/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({descricao, inicio, termino})
        });
        const json = await req.json();
        return json;
    },

    deleteExperiencia: async (id) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/experiencia/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await req.json();
        return json;
    },

    createFormacao: async (descricao, inicio, termino) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/formacao`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({descricao, inicio, termino})
        });
        const json = await req.json();
        return json;
    },

    updateFormacao: async (descricao, inicio, termino, id) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/formacao/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({descricao, inicio, termino})
        });
        const json = await req.json();
        return json;
    },

    deleteFormacao: async (id) => {
        const token = await AsyncStorage.getItem('token');
        
        const req = await fetch(`${BASE_API}/formacao/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await req.json();
        return json;
    },
    
}

