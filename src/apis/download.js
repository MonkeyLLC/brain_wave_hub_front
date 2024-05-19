import httpInstance from '@/utils/http';
import {ref} from 'vue';
import {getSearchResult} from "@/apis/search.js";

const fileType = ref('')
const filename = ref('')

export async function downloadFile(paperId) {

    const searchRequest = ref({
        query: paperId,
        field: 'id'
    });

    const docTye = {
        1: 'word',
        2: 'pdf',
        3: 'excel',
        4: 'ppt',
    }
    const res = await getSearchResult(searchRequest.value)
    if (res !== null && res.data !== null && res.data.hits !== null && res.data.hits.length > 0) {
        fileType.value = docTye[res.data.hits[0].doc_type]
        filename.value = res.data.hits[0].name
        //console.log('根据id检索', docType)
        getBinaryFile(paperId)
    } else {
        return null
    }


}

function downloadBinaryFile(binFile, fileName, blobType = 'application/octet-stream') {
    // 处理二进制数据并创建 Blob 对象
    const blobObj = new Blob([binFile], {type: blobType})
    // 创建一个链接并设置下载属性
    const downloadLink = document.createElement('a')
    let url = window.URL || window.webkitURL || window.moxURL // 兼容不同浏览器的 URL 对象
    url = url.createObjectURL(blobObj)
    downloadLink.href = url
    downloadLink.download = fileName // 设置下载的文件名
    // 将链接添加到 DOM 中，模拟点击
    document.body.appendChild(downloadLink)
    downloadLink.click()
    // 移除创建的链接和释放 URL 对象
    document.body.removeChild(downloadLink)
    window.URL.revokeObjectURL(url)
}


function getBinaryFile(paperId, configType = 'application/octet-stream') {
    const headConfig = {
        responseType: configType // 设置响应类型
    }

    httpInstance.get('/download', {
        params: {
            paperId: paperId
        },
        responseType: 'blob' // 设置响应类型为二进制流
    }).then(
        response => {
            const blobData = response; // 获取响应的二进制数据
            downloadBinaryFile(blobData, filename.value + '.' + fileType.value); // 调用下载函数下载二进制文件
        }
    ).catch(error => {
        console.error('Error downloading file:', error);
    });
}



