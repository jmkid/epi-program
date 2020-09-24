<template>
	<div>
		<van-nav-bar left-arrow @click-left="_routerBack" title="我的信息" fixed :z-index="10"></van-nav-bar>
		<div class="nav-con-16">
			<div v-for="(it, idx) in messageData" :key="idx" class="msg-item click-box" @click="onClickMessage(it)">
				<div class="msg-title">{{it.content}}</div>
				<div class="msg-sub">
					<div class="msg-flag">{{it.title}}</div>
					<div class="msg-date light-txt">{{it.sending_time}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "message-page",
		data() {
			return {
				s_id: '',
				messageData: [],
			};
		},
		created() {
			this.s_id = this.getCookie('studentId')
			this.fetchMes()
		},
		methods: {
			onClickMessage(item) {
				// this._routePush('MessageDetail');
				this.$router.push({
					path: '/MessageDetail',
					query: {
						title: item.title,
						content: item.content,
						time: item.sending_time,
						article_id:item.article_id
					}
				});
			},
			fetchMes() {
				axios.get('/api/getMailById', {
					params: {
						student_id: this.s_id
					}
				}).then((res) => {
					this.messageData = res.data.data
				}).catch((err) => {})
			}
		},
	}
</script>

<style scoped lang="scss">
	.msg-item {
		margin-bottom: 12px;
		padding: 12px;

		.msg-title {
			font-size: 14px;
			color: #666666;
		}

		.msg-sub {
			display: flex;
			align-items: center;
			margin-top: 10px;
			justify-content: space-between;

			.msg-date {
				font-size: 12px;
			}

			.msg-flag {
				font-size: 14px;
				border-radius: 20px;
				border: solid 1px #f56723;
				color: #f56723;
				padding: 1px 8px;
			}
		}
	}
</style>
