import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function recordSearch(query) {
    return httpInstance.put('/history', {query})
}

export function hot() {
    return httpInstance.get('/history/hot')
}

export function getSearchList() {
    return httpInstance.get('/history/search', {params: {page: 1}})
}

export function recordView(paperId) {
    return httpInstance.put('/history/view', null, {
        params: {
            paperId
        }
    })
}

export function getDownloadList() {
    return httpInstance.get('/history/download', {params: {page: 1}})
}