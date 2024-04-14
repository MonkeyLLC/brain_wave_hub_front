import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useSearchRequestStores = defineStore('searchRequest', (searchRequest) => {


  const request = ref(
      {
        "field": searchRequest.field,
        "query": searchRequest.query,
        "page": searchRequest.page,
        "sort": "下载量",
        "order": "DESC",
        "expense": null,
        "filter": [],
        "aggs": [
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

  return { request }
})
