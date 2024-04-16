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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
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
            name: 'personal',
            component: PersonalIndex,
            children:[
                {
                    path: 'history',
                    name: 'history',
                    component: DownloadHistoryView
                },
                {
                    path: 'info',
                    name: 'info',
                    component: UserInfoView
                },
                {
                    path:'message',
                    name:'message',
                    component: MessageView
                },
                {
                    path:'collect',
                    name:'collect',
                    component: CollectView
                }
            ]
        },
        {
            path:'/upload',
            component: () => import('@/views/Personal/Component/UploadAvatarComponent.vue')
        },
        {
            path:'/uploadPaper',
            component: () => import('@/views/Admin/Upload/UploadView.vue')
        }
    ]
})

export default router
