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
const province = ref('')
const city = ref('')
const scene = ref('')
const version = ref('')

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
        province: province,
        city: city,
        scene: scene,
        version: version,
        expense: null,
        filter: [],
        aggs: [
            {
                "aggName": "教材版本",
                "size": 5
            },
            {
                "aggName": "年级分类",
                "size": "3"
            },
            {
                "aggName": "省份",
                "size": "5"
            },
            {
                "aggName": "城市",
                "size": "5"
            },
            {
                "aggName": "适用场景",
                "size": "5"
            },
            {
                "aggName": "年级",
                "size": "5"
            }
        ]
    })


export function getSearchResult(request) {


    if (request != null) {
        console.log(request)
        if ('field' in request && (request.field !== null || request.field !== '')) {
            field.value = request.field
        }
        if (request.province !== null) {
            province.value = request.province
        }
        if (request.city !== null) {
            city.value = request.city
        }
        if (request.scene !== null) {
            scene.value = request.scene
        }
        if (request.version !== null) {
            version.value = request.version
        }

        query.value = request.query
        page.value = request.page
        gradeCategory.value = request.gradeCategory

        sort.value = sortMapping.hasOwnProperty(request.sort) ? sortMapping[request.sort] : null
        order.value = request.order

    }

    return httpInstance.post('/search', searchRequest.value)
}

export function searchById(id) {
    return httpInstance.get('/search/' + id)
}