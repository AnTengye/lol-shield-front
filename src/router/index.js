import { createRouter, createWebHistory } from 'vue-router';
import SettingPage from '../views/SettingFrom.vue';
import WelcomePagee from '../views/SettingTest.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            meta: { title: 'Shield' },
            //   redirect: '/welcome',
            children: [
                {
                    path: '/',
                    name: 'Shield',
                    meta: { title: '欢迎', icon: 'icon-icon-test' },
                    component: SettingPage,
                },
                {
                    path: '/welcomee',
                    name: 'welcomee',
                    meta: { title: '欢迎', icon: 'icon-icon-test' },
                    component: WelcomePagee,
                },
            ],
        },
    ],
});
