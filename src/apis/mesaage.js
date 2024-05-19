import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function mesaages (page) {
    return httpInstance.get('/message/list', {
        params: {
            page
        }
    });
}