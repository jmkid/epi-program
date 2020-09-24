<template>
	<div>
		<div class="head">
			<van-icon name="arrow-left" size="2em" color="white" @click="goBack" />
			<span>个人行程</span>
		</div>
		<van-search background="white" shape="round" placeholder="请输入搜索关键词" />
		<timeline>
			<div v-for="(item, index) in timeItem" :key="index" class="time-item">
				<timeline-item bg-color="blue">{{ item.building }}<span>{{ item.date }}</span></timeline-item>
			</div>
		</timeline>
	</div>
</template>
<script>
	import {
		Timeline,
		TimelineItem,
		TimelineTitle
	} from 'vue-cute-timeline'
	import axios from 'axios'

	export default {
		components: {
			Timeline,
			TimelineItem,
			TimelineTitle
		},
		data() {
			return {
				s_id: '',
				timeItem: []
			}
		},

		created() {
			this.s_id = this.getCookie('studentId')
			this.fetchRecod()
		},
		methods: {
			goBack() {
				this.$router.go(-1);
				this.s_id = this.getCookie('studentId')
			},
			fetchRecod() {
				axios.get('/api/getRecodsById', {
					params: {
						student_id: this.s_id
					}
				}).then((res) => {
					//这里处理入宫当前headers中如果存在error那么直接跳转到首页
					// console.log(res.headers["error"])
					// if(res.headers["error"]!=null){
					// 	this.$router.push({path: '/', query: {}})
					// }
					// console.log(${filter.error})
					for (let i = 0; i < res.data.data.length; i++) {
						let dateList = res.data.data[i].date.substring(0, 10) + ' ' + res.data.data[i].date.substring(11, 19)
						this.timeItem.push({
							building: res.data.data[i].building + '教' + res.data.data[i].classroom,
							date: dateList
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.head {
		background-color: #00A0E9;
		width: 100%;
		height: 100px;
		text-align: center;
		position: relative;

		span {
			color: white;
			font-size: 20px;
			position: absolute;
			left: 0;
			right: 0;
			top: 35%;
		}

		.van-icon {
			position: absolute;
			top: 35%;
			left: 20px;
			z-index: 999;
		}

	}

	.time-item {
		position: relative;

		span {
			position: absolute;
			right: 0;
		}
	}
</style>
