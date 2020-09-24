<template>
	<div>
		<van-nav-bar title="登录" fixed :z-index="10"></van-nav-bar>
		<div class="nav-con align-center login-con" :style="{'background-image':'url(static/img/login/login_back.png)'}">
			<div class="top-area">
				<div style="color: cornflowerblue;font-size: 30px">欢迎使用校疫通</div>
				<van-image src="static/img/login/logo.png" class="top-logo"></van-image>
			</div>
			<!--用户名密码登录-->
			<div v-if="loginWay==1">
				<van-cell-group>
					<!--输入账号-->
					<van-field v-model="userName" left-icon="static/img/login/login_user.png" required clearable label="学号"
					 placeholder="请输入学号" label-align="left" size="large" maxlength="20"></van-field>
					<!--输入密码-->
					<van-field v-model="password" left-icon="static/img/login/login_pass.png" label="密　码" placeholder="请输入密码" size="large"
					 required clearable :type="showPassword?'text':'password'" maxlength="20" :right-icon="'static/img/login/eye_'+(showPassword?'open':'close')+'.png'"
					 @click-right-icon="showPassword=!showPassword"></van-field>
				</van-cell-group>
				<div class="text-item">
					<div class="forget">
						<router-link :to="{name:'ForgetPage'}">忘记密码</router-link>
					</div>
					<div class="regist">
						<router-link :to="{name:'RegistPage'}">注册账号</router-link>
					</div>
				</div>
				<!--账密登录按钮-->
				<div class="button-con">
					<van-button type="danger" round class="login-btn" @click="onLoginClick">立即登录
					</van-button>
					<van-button type="danger" plain round class="login-btn" @click="loginWay=3-loginWay">短信登录</van-button>
				</div>
			</div>
			<!--验证码登陆-->
			<div v-else>
				<van-cell-group>
					<!--输入账号-->
					<van-field v-model="phone" left-icon="static/img/login/login_user.png" required clearable label="手机号" placeholder="请输入手机号"
					 label-align="left" size="large" maxlength="11"></van-field>
					<!--填写验证码-->
					<van-field v-model="smsCode" clearable label="验证码" placeholder="请输入短信验证码" size="large" left-icon="envelop-o"
					 maxlength="6" required>
						<van-button slot="button" size="small" plain type="danger" class="send-btn" @click="onSMSSend">
							{{getSendBtnText}}
						</van-button>
					</van-field>
				</van-cell-group>
				<div class="text-item">
					<div class="forget">
						<router-link :to="{name:'ForgetPage'}">忘记密码</router-link>
					</div>
					<div class="regist">
						<router-link :to="{name:'RegistPage'}">注册密码</router-link>
					</div>
				</div>
				<!--账密登录按钮-->
				<div class="button-con">
					<van-button type="danger" round class="login-btn" @click="phoneLogin">登录
					</van-button>
					<van-button type="danger" plain round class="login-btn" @click="loginWay=3-loginWay">账号登录</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: "login-page",
		data() {
			return {
				userName: '',
				password: '',
				phone: '',
				smsCode: '',
				showPassword: false, //是否显示明文
				loginWay: 1, //1: 账密，2：验证码
				smsCountDown: 0,
				smsCountInterval: null,
				code: ''
			};
		},
		computed: {
			isSendSMSEnable() {
				return this.smsCountDown <= 0 && this.userName.length > 4;
			},
			getSendBtnText() {
				if (this.smsCountDown > 0) {
					return this.smsCountDown + '秒后发送';
				} else {
					return '发送验证码';
				}
			},
			canSMSLogin() {
				return this.userName.length > 4 && this.smsCode.length > 4;
			},
			canPwdLogin() {
				return this.userName.length > 4 && this.password.length > 4;
			},
		},
		mounted() {
			if (this.getCookie('token') != '') {
				this.$router.push('home');
			}
		},
		beforeDestroy() {
			if (this.smsCountInterval) {
				clearInterval(this.smsCountInterval);
			}
		},
		methods: {
			onSMSSend() {
				this._showLoading();
				setTimeout(() => {
					this._dismissLoading();
					axios.post('api/sendLoginCode', {}, {
						params: {
							"phone": this.phone
						}
					}).then((res) => {
						this._showToast('已发送');
						this.smsCountDown = 60;
						this.startSMSTimer();
					}).catch((err) => {})
				}, 300);
			},
			phoneLogin() {

			},
			startSMSTimer() {
				this.smsCountInterval = setInterval(() => {
					this.smsCountDown--;
					if (this.smsCountDown <= 0) {
						clearInterval(this.smsCountInterval);
					}
				}, 1000);
			},
			onSMSLogin() {
				this.onLoginClick();
			},
			onLoginClick() {
				let _this = this;
				this._showLoading();
				setTimeout(() => {
					this._dismissLoading();
					axios.post('api/loginById', {}, {
						params: {
							student_id: this.userName,
							password: this.password
						}
					}).then((res) => {
						axios.get('api/getProfileCode', {
							params: {
								student_id: this.userName
							}
						}).then((res) => {
							window.localStorage.setItem('img_code', res.data.data);
						}).catch((err) => {})
						document.cookie = "token" + "=" + res.data.data + ";path=/"
						document.cookie = "studentId" + "=" + this.userName + ";path=/"

						if (res.data.msg == '用户名不存在') {
							this._showConfirm('用户名或密码输入错误请重新输入')
						} else if (res.data.msg == '非法用户名或密码') {
							this._showConfirm('用户名或密码输入错误请重新输入')
						} else if (res.data.msg == '密码错误') {
							this._showConfirm('密码输入错误，请重新输入')
						} else if (!res.data) {
							this._showConfirm('密码输入错误，请重新输入')
						} else {
							this.$router.push('home');
							// this._showConfirm('登陆成功, 去设置手势密码？', () => {
							//   this._routeReplace('GestureCreate');
							// }, () => {
							//
							//   // window.location.reload();
							// })
						}
					})

				}, 1000);
			},
		},

	}
</script>

<style scoped>
	.send-btn {
		height: 26px;
		line-height: 24px;
	}

	.button-con {
		margin-top: 36px;
	}

	.top-area {
		margin: 30px 0;
		margin-bottom: 0
	}

	.login-con {
		background-size: 100% 100%;
		height: calc(100vh - 46px);
	}

	.login-btn {
		width: 60%;
		margin: 12px;
		background-color: #1887FA;
		color: white;
	}

	.top-logo {
		width: 180px;
		margin: 16px 0;
	}

	.text-item {
		margin-top: 10px;
		font-size: 13px;
		color: grey;
	}

	.forget {
		float: left;
		margin-left: 40px;
		text-decoration: underline;
	}

	.regist {
		float: right;
		margin-right: 40px;
		text-decoration: underline;
	}
</style>
