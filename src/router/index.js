import { createRouter, createWebHistory } from 'vue-router';
import SettingPage from '../views/SettingFrom.vue';
import RankList from '../views/RankList.vue';
import RankDetail from '../views/RankDetail.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            meta: { title: 'Shield' },
            children: [
                {
                    path: '/',
                    name: 'Shield',
                    meta: { title: '配置', icon: 'icon-icon-test' },
                    component: SettingPage,
                },
                {
                    path: '/rank',
                    name: 'Rank',
                    meta: { title: '战绩', icon: 'icon-icon-test' },
                    component: RankList,
                },
                {
                    path: '/detail',
                    name: 'RankDetail',
                    meta: { title: '对局详情', icon: 'icon-icon-test' },
                    component: RankDetail,
                },
            ],
        },
    ],
});
