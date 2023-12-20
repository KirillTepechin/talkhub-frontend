import * as VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import TopicsPage from "@/pages/TopicsPage";
import CreateTopicPage from "@/pages/CreateTopicPage";
import ProfilePage from "@/pages/ProfilePage";
import TopicPage from "@/pages/TopicPage";
import ComplaintsPage from "@/pages/ComplaintsPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";


const routes = [
    { path: '/auth', component: LoginPage, name:'login', alias:'/' },
    { path: '/registration', component: RegistrationPage, name:'registration', },
    { path: '/topics', component: TopicsPage, name:'topics', alias:'/' },
    { path: '/create-topic', component: CreateTopicPage, name:'create-topic', },
    { path: '/edit-topic/:id', component: CreateTopicPage, name:'edit-topic', },
    { path:  '/profile', component: ProfilePage, name:'profile'},
    { path: '/topic/:id', component: TopicPage, name: 'topic'},
    { path: '/complaints', component: ComplaintsPage, name: 'complaints'},
    { path: '/forbidden', component: ForbiddenPage, name:'forbidden' },
    { path: '/not-found', component: NotFoundPage, name: 'not-found' },
    { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'not-found' },
]

let router = new VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes 
})

export default router