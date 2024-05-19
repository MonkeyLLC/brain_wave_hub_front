import {createRouter, createWebHistory} from 'vue-router'
import HomeIndexVue from '@/views/Home/HomeIndex.vue'
import SearchResultIndex from "@/views/SearchResult/SearchResultIndex.vue";
import HomeApp from '@/views/Home/HomeApp.vue'
import Paper from '@/views/SearchResult/PaperDeatilView.vue'
import LoginComponent from "@/components/Login/LoginComponent.vue";
import PersonalIndex from "@/views/Personal/PersonalIndex.vue";
import DownloadHistoryView from "@/views/Personal/DownloadHistoryView.vue";
import UserInfoView from "@/views/Personal/UserInfoView.vue";
import MessageView from "@/views/Personal/MessageView.vue";
import PersonalVipView from "@/views/Personal/PersonalVipView.vue";
import CollectView from "@/views/Personal/CollectView.vue";
import MyUploadView from "@/views/Upload/MyUploadedView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '首页',
            component: HomeIndexVue
        },
        {
            path: '/result',
            name: 'result',
            component: SearchResultIndex
        },
        {
            path: '/homeApp',
            name: 'homeApp',
            component: HomeApp
        },
        {
            path: '/paper/:id',
            name: 'paper',
            component: Paper
        },
        {
            path:'/login',
            component: LoginComponent
        },
        {
            path: '/personal',
            name: '个人中心',
            component: PersonalIndex,
            children:[
                {
                    path: 'history',
                    name: '下载记录',
                    component: DownloadHistoryView
                },
                {
                    path: 'info',
                    name: '个人信息',
                    component: UserInfoView
                },
                {
                    path:'message',
                    name:'通知中心',
                    component: MessageView
                },
                {
                    path:'collect',
                    name:'我的收藏',
                    component: CollectView
                }
            ]
        },
        {
            path:'/upload',
            name:'上传',
            component: () => import('@/views/Upload/UploadView.vue'),
            children:[
                {
                    path:'uploaded',
                    name:'我的上传',
                    component: MyUploadView
                }
            ]
        },
        {
            path:'/uploadPaper',
            component: () => import('@/views/Admin/Upload/UploadView.vue')
        }
    ]
})

export default router
