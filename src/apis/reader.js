import httpInstance from '@/utils/http';
import {ref} from 'vue';

const readerRequest = ref({
    path: '',
    id: '',
    name: ''
})

export function getImagePaths(id,readerRequest){
    return httpInstance.post(`/reader/${id}`, readerRequest)
}