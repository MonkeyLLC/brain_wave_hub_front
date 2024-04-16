import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function getTotal() {
    return httpInstance.get('/search/count')
}

const field = ref("试卷名")
const query = ref('')
const page = ref(1)
const sort = ref("下载量")
const order = ref("DESC")
const gradeCategory = ref('')

const sortMapping = {
    "综合": null,
    "下载": "下载量",
    "最新": "上传时间",
    "价格": "下载费用",
    "浏览": "浏览量",
}

const searchRequest = ref(
    {
        field: field,
        query: query,
        page: page,
        sort: sort,
        order: order,
        gradeCategory: gradeCategory,
        expense: null,
        filter: [],
        aggs: [
            {
                "aggName": "教材版本",
                "size": 10
            },
            {
                "aggName": "年级分类",
                "size": "10"
            }
        ]
    })


export function getSearchResult(request) {

    if (request != null) {
        if (!request.field){
            request.field = field.value
        }

        query.value = request.query
        page.value = request.page
        gradeCategory.value = request.gradeCategory

        console.log("gradeCategory", request.gradeCategory)


        sort.value = sortMapping.hasOwnProperty(request.sort) ? sortMapping[request.sort] : null
        order.value = request.order

    }

    return httpInstance.post('/search', searchRequest.value)
}