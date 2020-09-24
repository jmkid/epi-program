import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);

import MainPage from '../view/main/MainPage';
import TabHome from '../view/main/tabs/TabHome';
import TabProducts from '../view/main/tabs/TabProducts';
import TabDiscover from '../view/main/tabs/TabDiscover';
import TabMine from '../view/main/tabs/TabMine';
import cover from '../view/product/cover';
import LoginPage from "../view/login/LoginPage";

const SettingsPage = r => require.ensure([], () => r(require('../view/mine/SettingsPage')), 'SettingsPage');
const IFrameWebPage = r => require.ensure([], () => r(require('../view/common/IFrameWebPage')), 'IFrameWebPage');
const TestCasePage = r => require.ensure([], () => r(require('../view/mine/TestCasePage')), 'TestCasePage');
const ForumPage = r => require.ensure([], () => r(require('../view/discover/ForumPage')), 'ForumPage');
const MessagePage = r => require.ensure([], () => r(require('../view/mine/MessagePage')), 'MessagePage');
const MessageDetail = r => require.ensure([], () => r(require('../view/mine/MessageDetail')), 'MessageDetail');
const ProductDetail = r => require.ensure([], () => r(require('../view/product/ProductDetail')), 'ProductDetail');
const GestureCreate = r => require.ensure([], () => r(require('../view/login/GestureCreate')), 'GestureCreate');

const routes = [{
		path: '*',
		redirect: '/main'
	},
	{
		name: 'main',
		redirect: '/main/LoginPage',
		component: MainPage,
		children: [{
				name: 'LoginPage',
				path: 'LoginPage',
				component: LoginPage,
				meta: {
					keepAlive: false
				}
			},
			{
				name: 'home',
				path: 'home',
				component: TabHome,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'products',
				path: 'products',
				component: TabProducts,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'discover',
				path: 'discover',
				component: TabDiscover,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'mine',
				path: 'mine',
				component: TabMine,
				meta: {
					keepAlive: true
				}
			},
		],
		meta: {
			keepAlive: true
		}
	},
	{
		name: 'GestureCreate',
		component: GestureCreate
	},
	{
		name: 'ChangePass',
		component: () => import('@/view/login/ChangePass')
	},
	{
		name: 'ChangePhone',
		component: () => import('@/view/login/ChangePhone')
	},
	{
		name: 'RegistPage',
		component: () => import('@/view/login/RegistPage')
	},
	{
		name: 'ForgetPage',
		component: () => import('@/view/login/ForgetPage')
	},
	{
		name: 'SettingsPage',
		component: SettingsPage
	},
	{
		name: 'IFrameWebPage',
		component: IFrameWebPage
	},
	{
		name: 'TestCasePage',
		component: TestCasePage
	},
	{
		name: 'ForumPage',
		component: ForumPage
	},
	{
		name: 'MessagePage',
		component: MessagePage
	},
	{
		name: 'ProductDetail',
		component: ProductDetail
	},
	{
		name: 'MessageDetail',
		component: MessageDetail
	},
	{
		name: 'TimeLine',
		component: () => import('@/view/product/TimeLine')
	},
	{
		name: 'Reserch',
		component: () => import('@/view/product/Reserch')
	},
	{
		name: 'Greencode',
		component: () => import('@/view/product/Greencode')
	},
	{
		name: 'Leaveform',
		component: () => import('@/view/product/Leaveform')
	},
	{
		name: 'Classroompass',
		component: () => import('@/view/product/Classroompass')
	},
	{
		name: 'Leavehistory',
		component: () => import('@/view/product/Leavehistory')
	},
	{
		name: 'cover',
		path: '/cover',
		component: cover,
		meta: {
			keepAlive: true
		}
	},
	{
		name: 'TakePhoto',
		component: () => import('@/view/product/TakePhoto')
	},
];

// 懒得写path，给他们自动生成一个，和name同名
routes.forEach(route => {
	route.path = route.path || '/' + (route.name || '');
});

const router = new VueRouter({
	routes
});

// 生命周期之前
router.beforeEach((to, from, next) => {
	// 保存个路由来路，以备不时之需
	// localStorage.setItem('fromPage', from.name);
	// next();

	//路由守卫判定登陆状态
	// if (to.path === '/LoginPage') {
	//   next();
	// } else {
	//   let token = getCookie('token');
	//
	//   if (token === 'null' || token === '') {
	//     next('/LoginPage');
	//   } else {
	//     next();
	//   }
	// }

	// if (getCookie('token') != ' ') {
	// 	next({
	// 		path: '/main/home'
	// 	})
	// } else {
	// 	next()
	// }

	if (!getCookie('token') && to.fullPath != '/main/LoginPage' && to.fullPath != '/RegistPage' && to.fullPath !=
		'/ForgetPage') {
		next({
			path: '/main/LoginPage'
		})
	} else {
		next()
	}
});

//生命周期之后
router.afterEach((to, from) => {
	// 滑动到顶吧
	window.scrollTo(0, 0);
});

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
	config => {
		if (getCookie('token')) {
			config.headers.token = getCookie('token');
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	});

// 添加响应拦截器
axios.interceptors.response.use((res) => {
	if (res.headers["error"] != null) {
		clearCookie('token')
		clearCookie('studentId')
		this.$router.push('LoginPage');
	}
	// 对响应数据做点什么
	return res;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

function getCookie(name) {
	let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else
		return null;
}

function clearCookie(name) {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "studentId=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	window.localStorage.clear()
}

export default router;
