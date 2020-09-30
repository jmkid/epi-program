<template>
	<!-- 异常上报 -->
	<div class="app-container">
		<el-form ref="ruform" :model="form" label-width="120px">
			<el-form-item label="姓名">
				<el-input v-model="form.stuName" width="120px" />
			</el-form-item>
			<el-form-item label="学号">
				<el-input v-model="form.stuNum" />
			</el-form-item>
			<el-form-item label="当日体温">
				<el-input v-model="form.stuTem" />
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="form.desc" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="onCancel('ruform')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				form: {
					stuName: '',
					stuNum: '',
					status: '',
					stuTem: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				axios.post('api/studentInfo/excptionold', {}, {
					params: {
						teacher_id: 10010,
						student_id: this.form.stuNum,
						name: this.form.stuName,
						temperature: this.form.stuTem,
						remark: this.form.desc
					}
				}).then((res) => {
					console.log(res);
				}).catch((err) => {
					console.log(err)
				})
			},
			onCancel(formName) {
				this.$refs[formName].resetFields()
			}
		}
	}
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>
