import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useReaderRequest = defineStore('readerRequest', () => {
    const id = ref(0)
    const name = ref('')
    const path = ref('')

    const paper = {}
    // const doubleCount = computed(() => count.value * 2)
    function setReaderRequest(paper) {
       // console.log('setReaderRequest', paper)
       //id.value = paper.id
       //name.value = paper.name
       //path.value = paper.path
        this.paper = paper
        console.log('setReaderRequest11111111111', this.paper)
        return paper
    }

    return {setReaderRequest, paper}
})