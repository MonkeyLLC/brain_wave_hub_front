import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useLogin =
    defineStore('useLogin', () => {
        const loginState = ref(false)
        /*const paper = {}
        // const doubleCount = computed(() => count.value * 2)
        function setReaderRequest(paper) {
            // console.log('setReaderRequest', paper)
            //id.value = paper.id
            //name.value = paper.name
            //path.value = paper.path
            this.paper = paper
            console.log('setReaderRequest11111111111', this.paper)
            return paper
        }*/

        return {loginState}
    })