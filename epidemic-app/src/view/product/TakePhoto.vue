<template>
	<div class="camera_outer">
		<div class="head">
			<van-icon name="arrow-left" size="2em" color="white" @click="goBack()" />
		</div>
		<div v-if="imgSrc==''">
			<video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
			<canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
		</div>
		<div v-else class="img_bg_camera">
			<img :src="imgSrc" alt class="tx_img" />
		</div>
		<div class="button">
			<van-button type="primary" size="large" @click="setImage()">扫描二维码</van-button>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import qs from 'qs';

	export default {
		data() {
			return {
				s_id: '',
				videoWidth: 250,
				videoHeight: 350,
				imgSrc: "",
				thisCancas: null,
				thisContext: null,
				thisVideo: null,
				openVideo: false,
				keyApi: "60ca1b8db1ac78adc31bf5a95c99506f"
			};
		},
		created() {
			this.s_id = this.getCookie('studentId')
		},
		mounted() {
			this.getCompetence() //进入页面就调用摄像头
			this.videoWidth = document.body.clientWidth;
			this.videoHeight = 500;
			// setInterval(this.setImage, 1000)
		},
		methods: {
			// 调用权限（打开摄像头功能）
			getCompetence() {
				let _this = this;
				_this.thisCancas = document.getElementById("canvasCamera");
				_this.thisContext = this.thisCancas.getContext("2d");
				_this.thisVideo = document.getElementById("videoCamera");
				_this.thisVideo.style.display = 'block';
				// 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
				if (navigator.mediaDevices === undefined) {
					navigator.mediaDevices = {};
				}
				// 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
				// 使用getUserMedia，因为它会覆盖现有的属性。
				// 这里，如果缺少getUserMedia属性，就添加它。
				if (navigator.mediaDevices.getUserMedia === undefined) {
					navigator.mediaDevices.getUserMedia = function(constraints) {
						// 首先获取现存的getUserMedia(如果存在)
						let getUserMedia =
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.getUserMedia;
						// 有些浏览器不支持，会返回错误信息
						// 保持接口一致
						if (!getUserMedia) { //不存在则报错
							return Promise.reject(
								new Error("getUserMedia is not implemented in this browser")
							);
						}
						// 否则，使用Promise将调用包装到旧的navigator.getUserMedia
						return new Promise(function(resolve, reject) {
							getUserMedia.call(navigator, constraints, resolve, reject);
						});
					};
				}
				let constraints = {
					audio: false,
					video: {
						width: this.videoWidth,
						height: this.videoHeight,
						transform: "scaleX(-1)",
						// facingMode: {exact: "environment"}
					}
				};
				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(function(stream) {
						// 旧的浏览器可能没有srcObject
						if ("srcObject" in _this.thisVideo) {
							_this.thisVideo.srcObject = stream;
						} else {
							// 避免在新的浏览器中使用它，因为它正在被弃用。
							_this.thisVideo.src = window.URL.createObjectURL(stream);
						}
						_this.thisVideo.onloadedmetadata = function(e) {
							_this.thisVideo.play();
						};
					})
					.catch(err => {});
			},
			//  绘制图片（拍照功能）
			setImage() {
				var date = new Date()
				// canvas画图
				this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight);
				// 获取图片base64链接
				let image = this.thisCancas.toDataURL("image/png");
				this.imgSrc = image; //赋值并预览图片
				let data = qs.stringify({
					"key": "60ca1b8db1ac78adc31bf5a95c99506f",
					"qrpic": image
				})

				let str = qs.stringify({
					"student_id": this.s_id,
					"Building": 2,
					"classroom": 117,
					"date": date
				})
				let classroom = qs.parse(str)
				axios.post('/api/updateStudentRecods', {
					updateStudentRecods:classroom
				}, {
					params: {
						// updateStudentRecods:classroom
					}
				}).then((res) => {
					this._showConfirm('扫描成功，请返回主页', () => {
						this._routeReplace('home');
					})
				})
				// axios.post('http://api.tianapi.com/txapi/codec/index', data, {
				// 	transformRequest: (data, headers) => {
				// 		delete headers.token
				// 		return data;
				// 	},
				// 	headers: {
				// 		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				// 	},
				// }, ).then((res) => {
				// 	console.log(res)
				// 	let codeData = res.data.newslist[0].qrcodec
				// 	var obj = JSON.parse(codeData)
				// 	let classroom = JSON.parse({
				// 		"student_id": this.s_id,
				// 		"name": this.s_id,
				// 		"Building": obj.building,
				// 		"classroom": obj.classroom,
				// 		"date": date
				// 	})
				// 	axios.post('/api/updateStudentRecods', {
				// 		classroom
				// 	}, {
				// 		params: {
				// 			data: {
				// 				classroom
				// 			}
				// 		}
				// 	}).then((res) => {
				// 		console.log(res)
				// 		this._showConfirm('扫描成功，请返回主页', () => {
				// 		  this._routeReplace('home');
				// 		})
				// 	})
				// }).catch((err) => {})
			},
			goBack() {
				this.$router.go(-1);
				this.thisVideo.srcObject.getTracks()[0].stop()
			},
		}
	};
</script>

<style>
	.head {}

	.video-item {}
</style>
