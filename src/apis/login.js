import httpInstance from '@/utils/http';
import {ref} from 'vue';

const jsonLoginRequest = ref({
    username: '',
    password: '',
})

export function jsonLogin(loginRequest){

    return httpInstance.post(`/login/json`, loginRequest,{withCredentials: true})
}

export function userList(){

    return httpInstance.get(`/user/list`)
}


export function logout(){
    return httpInstance.get(`/logout`)
}