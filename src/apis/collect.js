import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function collect(paperId) {
    return httpInstance.put('collect', null, {
        params: {
            paperId: paperId
        }
    })
}

export function isCollect(paperIds) {
    return httpInstance.post('/collect/is-collect', paperIds)
}

export function cancel(paperId) {
    return httpInstance.delete('/collect', {
        params: {
            paperId: paperId
        }
    })
}

export function collectedList(page) {

    return httpInstance.get('/collect', {
        params: {
            page: page
        }
    });

}