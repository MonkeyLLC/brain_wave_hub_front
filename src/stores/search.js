import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchRequestRequest = defineStore('searchRequest', () => {
    const version = ref('')
    const gradeCategory = ref('')
    const province = ref('')
    const city = ref('')
    const scene = ref('')
    const query = ref('')

    const searchRequest = ref({
        query: null,
        version: null,
        gradeCategory: null,
        province: null,
        city: null,
        scene: null
    })

    function setSearchRequest(request) {

        console.log('进来的request', request)

        searchRequest.value.query = request.query
        searchRequest.value.version = request.version
        searchRequest.value.gradeCategory = request.gradeCategory
        searchRequest.value.province = request.province
        searchRequest.value.city = request.city
        searchRequest.value.scene = request.scene

        return searchRequest
    }



    return {setSearchRequest, searchRequest}
})