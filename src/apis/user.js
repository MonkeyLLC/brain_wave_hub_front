import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function getUserInfo() {
    return httpInstance.get('/user/info')
}


export function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);

    return httpInstance.put('/user/uploadAvatar', formData);
}