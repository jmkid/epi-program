<template>
	<div>
		<van-nav-bar left-arrow @click-left="_routerBack" title="消息详情" fixed :z-index="10"></van-nav-bar>
		<div class="nav-con-16">
			<div class="msg-item">
				<div class="msg-title">{{title}}</div>
				<div class="msg-content">{{content}}</div>
				<div class="msg-date">{{time}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	
	export default {
		name: "message-detail",
		data() {
			return {
				title:'',
				content:'',
				time:'',
				article_id:''
			}
		},
		mounted() {
			this.title = this.$route.query.title;
			this.content = this.$route.query.content;
			this.time = this.$route.query.time;
			this.article_id = this.$route.query.article_id;
			axios.post('/api/upMailSituation',{
				article_id:this.article_id
			}).then((res)=>{
				console.log(res)
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped lang="scss">
	.msg-item {
		background-color: white;
		padding: 12px;

		.msg-title {
			font-size: 20px;
			color: #5f6610;
			text-align: center;
		}

		.msg-sub {
			display: flex;
			align-items: center;
			margin: 10px 0;
			justify-content: space-between;

			

			.msg-flag {
				font-size: 14px;
				border-radius: 20px;
				border: solid 1px #f56723;
				color: #f56723;
				padding: 1px 8px;
			}
		}
		.msg-date {
				font-size: 12px;
				color: orangered;
				text-align: right;
				margin-top: 20px;
			}

		.msg-content {
			margin-top: 10px;
			border-top: solid 1px #f7f7f7;
			padding-top: 10px;
			font-size: 15px;
			color: grey;
			text-indent:2em
		}
	}
</style>
