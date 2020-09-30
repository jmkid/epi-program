<template>
	<!-- 人员管理页面 -->
	<div class="app-container">
		<el-button @click="clearFilter" style="margin-bottom:20px;user-select:none">清除所有过滤器</el-button>
		<el-button @click="filterVisible=true" style="margin-bottom:20px;background-color:royalblue;color:white;user-select:none">添加过滤器</el-button>
		<el-button @click="dialogVisible=true" style="margin-bottom:20px;background-color:#FF7F24;color:white;user-select:none">添加数据</el-button>
		<el-table empty-text="暂无内容或数据加载失败,请联系管理员解决问题" ref="filterTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit
		 highlight-current-row>
			<!--   display data   -->
			<el-table-column align="center" label="编号" width="60" type="index"></el-table-column>
			<el-table-column label="学号" align="center" width="150">
				<template slot-scope="scope">{{ scope.row.student_id }}</template>
			</el-table-column>
			<el-table-column label="学生姓名" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="家庭地址" align="center">
				<template slot-scope="scope">{{ scope.row.address }}</template>
			</el-table-column>
			<el-table-column label="院系" align="center" width="120" prop="stuSdept">
				<template slot-scope="scope">{{ scope.row.departments }}</template>
			</el-table-column>
			<el-table-column label="专业" align="center" width="150">
				<template slot-scope="scope">{{ scope.row.major }}</template>
			</el-table-column>
			<el-table-column label="年级" align="center" width="100">
				<template slot-scope="scope">{{ scope.row.grade }}</template>
			</el-table-column>
			<el-table-column label="班级" align="center">
				<template slot-scope="scope">{{ scope.row.myclass }}</template>
			</el-table-column>
			<el-table-column label="宿舍号" align="center" width="100">
				<template slot-scope="scope">{{ scope.row.dormitory_id }}</template>
			</el-table-column>
			<el-table-column label="电话号码" align="center" width="150">
				<template slot-scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row,'ruleForm')" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog t itle="添加筛选" :visible.sync="filterVisible" width="1000px" :before-close="handleClose">
			<el-tabs type="border-card">
				<el-tab-pane label="学院专业年级班级">
					<el-select v-model="value" clearable placeholder="请选择学院">
						<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="majorValue" clearable placeholder="请选择专业">
						<el-option v-for="item in major" :key="item.majorValue" :label="item.label" :value="item.majorValue">
						</el-option>
					</el-select>
					<el-input placeholder="请输入年级" style="width: 200px;" v-model="grade" clearable>
					</el-input>
					<el-input placeholder="请输入班级" style="width: 200px;" v-model="stu_class" clearable>
					</el-input>
					<el-button type="primary" @click="filterClass()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="学院专业年级">
					<el-select v-model="value" clearable placeholder="请选择学院">
						<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="majorValue" clearable placeholder="请选择专业">
						<el-option v-for="item in major" :key="item.majorValue" :label="item.label" :value="item.majorValue">
						</el-option>
					</el-select>
					<el-input placeholder="请输入年级" style="width: 200px;" v-model="grade" clearable>
					</el-input>
					<el-button type="primary" @click="filterGrade()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="学院专业">
					<el-select v-model="value" clearable placeholder="请选择学院">
						<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="majorValue" clearable placeholder="请选择专业">
						<el-option v-for="item in major" :key="item.majorValue" :label="item.label" :value="item.majorValue">
						</el-option>
					</el-select>
					<el-button type="primary" @click="filterMajor()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label=" 学院">
					<el-select v-model="value" clearable placeholder="请选择学院">
						<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" @click="filterDepart()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="学号">
					<el-input placeholder="请输入学号" style="width: 200px;" v-model="stu_id" clearable>
					</el-input>
					<el-button type="primary" @click="filterId()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="姓名">
					<el-input placeholder="请输入姓名" style="width: 200px;" v-model="name" clearable>
					</el-input>
					<el-button type="primary" @click="filterName()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="宿舍">
					<el-input placeholder="请输入宿舍" style="width: 200px;" v-model="dorm" clearable>
					</el-input>
					<el-button type="primary" @click="filterDorm()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="地区">
					<el-input placeholder="请输入地区" style="width: 200px;" v-model="address" clearable>
					</el-input>
					<el-button type="primary" @click="filterAddress()">筛选</el-button>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>

		<!--  add data  -->
		<el-dialog title="添加数据" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
			<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<!--        :rules="rules"-->
				<el-form-item label="学号" prop="stu_num">
					<el-input v-model="ruleForm.stu_num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="stu_name">
					<el-input v-model="ruleForm.stu_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="家庭地址" prop="stu_address">
					<el-input v-model="ruleForm.stu_address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="院系" prop="stu_sdept">
					<el-input v-model="ruleForm.stu_sdept" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业" prop="stu_maj">
					<el-input v-model="ruleForm.stu_maj" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年级" prop="stu_grade">
					<el-input v-model="ruleForm.stu_grade" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级" prop="stu_class">
					<el-input v-model="ruleForm.stu_class" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="宿舍号" prop="stu_dom">
					<el-input v-model="ruleForm.stu_dom" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" prop="stu_phone">
					<el-input v-model="ruleForm.stu_phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="修改数据" :visible.sync="updataShow" width="500px" :before-close="handleClose">
			<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<!--        :rules="rules"-->
				<el-form-item label="学号" prop="stu_num" v-if="false">
					<el-input v-model="ruleForm.stu_num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="stu_name" v-if="false">
					<el-input v-model="ruleForm.stu_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="家庭地址" prop="stu_address">
					<el-input v-model="ruleForm.stu_address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="院系" prop="stu_sdept">
					<el-input v-model="ruleForm.stu_sdept" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业" prop="stu_maj">
					<el-input v-model="ruleForm.stu_maj" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年级" prop="stu_grade">
					<el-input v-model="ruleForm.stu_grade" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级" prop="stu_class">
					<el-input v-model="ruleForm.stu_class" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="宿舍号" prop="stu_dom">
					<el-input v-model="ruleForm.stu_dom" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" prop="stu_phone">
					<el-input v-model="ruleForm.stu_phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="editForm('ruleForm')">提交修改</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		data() {
			return {
				grade: null,
				stu_class: null,
				stu_id: null,
				dorm: null,
				name: null,
				address: null,
				list: null,
				listLoading: true,
				dialogVisible: false,
				filterVisible: false,
				updataShow: false,
				sdeptFilter: [],
				instructorFilter: [],
				department: [{
					value: '信息工程学院',
					label: '信息工程学院'
				}, {
					value: '管理学院',
					label: '管理学院'
				}, {
					value: '外语学院',
					label: '外语学院'
				}, {
					value: '建筑工程学院',
					label: '建筑工程学院'
				}, {
					value: '机电工程学院',
					label: '机电工程学院'
				}, {
					value: '商学院',
					label: '商学院'
				}, {
					value: '食品工程学院',
					label: '食品工程学院'
				}],
				value: '',
				major: [{
					majorValue: '软件工程',
					label: '软件工程'
				}, {
					majorValue: '工商管理',
					label: '工商管理'
				}, {
					majorValue: '英语',
					label: '英语'
				}, {
					majorValue: '土木工程',
					label: '土木工程'
				}, {
					majorValue: '机电工程学院',
					label: '机电工程学院'
				}, {
					majorValue: '物流管理',
					label: '物流管理'
				}, {
					majorValue: '食品科学与工程',
					label: '食品科学与工程'
				}],
				majorValue: '',
				ruleForm: {
					stu_address: '',
					stu_grade: '',
					stu_ins: '',
					stu_class: '',
					stu_dom: '',
					stu_maj: '',
					stu_name: '',
					stu_num: '',
					stu_phone: '',
					stu_sdept: ''
				}
			}
		},
		created() {
			this.fetchData()
		},
		mounted() {

		},
		methods: {
			//筛选学院专业年级班级
			filterClass() {
				this.listLoading = true
				axios.get('api/student/getByClass', {
					params: {
						teacher_id: 10010,
						departments: this.value,
						major: this.majorVaue,
						grade: this.grade,
						myclass: this.stu_class
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//筛选学院专业年级
			filterGrade() {
				this.listLoading = true
				axios.get('api/student/getByGrade', {
					params: {
						teacher_id: 10010,
						departments: this.value,
						major: this.majorVaue,
						grade: this.grade
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//筛选学院专业
			filterMajor() {
				this.listLoading = true
				axios.get('api/student/getByMajor', {
					params: {
						teacher_id: 10010,
						departments: this.value,
						major: this.majorVaue
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//筛选学院
			filterDepart() {
				this.listLoading = true
				axios.get('api/student/getByDepartmentsr', {
					params: {
						teacher_id: 10010,
						departments: this.value
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//筛选学号
			filterId() {
				this.listLoading = true
				axios.get('api/student/getById', {
					params: {
						teacher_id: 10010,
						student_id: this.student_id
					}
				}).then((res) => {
					console.log(res)
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//筛选姓名
			filterName() {
				this.listLoading = true
				axios.get('api/student/getByName', {
					params: {
						teacher_id: 10010,
						name: this.name
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				})
			},
			//筛选宿舍
			filterDorm() {
				this.listLoading = true
				axios.get('api/student/getByNameDormitory', {
					params: {
						teacher_id: 10010,
						dormitory_id: this.dorm
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				})
			},
			//筛选地区
			filterAddress() {
				this.listLoading = true
				axios.get('api/student/getByNameAddress', {
					params: {
						teacher_id: 10010,
						address: this.address
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					this.filterVisible = false
				})
			},
			//创建后调用,匹配网页数据
			fetchData() {
				this.listLoading = true
				axios.get('/api/student/getAllInfo', {
					params: {
						teacher_id: 10010
					}
				}).then((res) => {
					console.log(res)
					this.list = res.data
					this.listLoading = false
				}).catch((err) => {
					this.listLoading = false
					this.$message.error('糟糕，加载数据出错了');
				})
			},
			//筛选
			// filterChange(value, row, column) {
			// 	const property = column['property']
			// 	return row[property] === value
			// },
			//消除过滤器
			clearFilter() {
				this.listLoading = true
				axios.get('/api/student/getAllInfo', {
					params: {
						teacher_id: 10010
					}
				}).then((res) => {
					console.log(res)
					this.list = res.data
					this.listLoading = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//关闭窗口函数
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done()
						this.refresh()
					})
					.catch(_ => {})
			},
			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						var that = this
						/*在这里进行跨域请求*/
						axios.post('/api/student/addStudentold', {}, {
							params: {
								'address': this.ruleForm.stu_address,
								'departments': this.ruleForm.stu_sdept,
								'dormitory_id': this.ruleForm.stu_dom,
								'grade': this.ruleForm.stu_grade,
								'major': this.ruleForm.stu_maj,
								'myclass': this.ruleForm.stu_class,
								'name': this.ruleForm.stu_name,
								'phone': this.ruleForm.stu_phone,
								'student_id': this.ruleForm.stu_num,
								'teacher_id': 10010
							}
						}).then(function(response) {
							that.dialogVisible = false
							that.$message({
								message: '数据添加成功',
								type: 'success'
							});
							location.reload();
						}).catch(function(error) {
							console.log(error)
						})
						// this.refresh()
					}
				})
			},
			// 编辑表单
			editForm() {
				var that = this
				/*在这里进行跨域请求*/
				axios.post('/api/student/editStudentold', {}, {
					params: {
						'address': this.ruleForm.stu_address,
						'departments': this.ruleForm.stu_sdept,
						'dormitory_id': this.ruleForm.stu_dom,
						'grade': this.ruleForm.stu_grade,
						'major': this.ruleForm.stu_maj,
						'myclass': this.ruleForm.stu_class,
						'name': this.ruleForm.stu_name,
						'phone': this.ruleForm.stu_phone,
						'student_id': this.ruleForm.stu_num,
						'teacher_id': 10010
					}
				}).then(function(response) {
					that.updataShow = false
					that.$message({
						message: '数据修改成功',
						type: 'success'
					});
					location.reload();
				}).catch(function(error) {
					console.log(error)
				})
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			//修改按钮点击时
			handleClick(row, formName) {
				this.ruleForm.stu_addressaddress = row.address
				this.ruleForm.stu_class = row.stuClass
				this.ruleForm.stu_name = row.name
				this.ruleForm.stu_num = row.student_id
				this.ruleForm.stu_phone = row.phoneNum
				this.ruleForm.stu_sdept = row.stuSdept

				this.ruleForm.stu_address = row.address,
					this.ruleForm.stu_sdept = row.departments,
					this.ruleForm.stu_dom = row.dormitory_id,
					this.ruleForm.stu_grade = row.grade,
					this.ruleForm.stu_maj = row.major,
					this.ruleForm.stu_class = row.myclass,
					this.ruleForm.stu_name = row.name,
					this.ruleForm.stu_phone = row.phone,
					this.ruleForm.stu_num = row.student_id,
					this.updataShow = true
			},
			// 初始化数据
			refresh() {
				this.ruleForm.stu_address = ''
				this.ruleForm.stu_grade = ''
				this.ruleForm.stu_class = ''
				this.ruleForm.stu_dom = ''
				this.ruleForm.stu_maj = ''
				this.ruleForm.stu_name = ''
				this.ruleForm.stu_num = ''
				this.ruleForm.stu_phone = ''
				this.ruleForm.stu_sdept = ''
			},
			// 删除数据
			deleteData(row) {
				let that = this
				axios.delete('/api/student/deleteStudentold', {
						headers: {
							"Content-Type": "application/json"
						},
						params: {
							student_id: row.student_id
						}
					})
					.then(function(response) {
						that.$message({
							message: '数据删除成功',
							type: 'success'
						});
						location.reload();
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			unique(arr) {
				var hash = []
				for (var i = 0; i < arr.length; i++) {
					if (hash.indexOf(arr[i]) == -1) {
						hash.push(arr[i])
					}
				}
				return hash
			}
		},
	}
	// 添加响应拦截器
	// axios.interceptors.response.use((res) => {
	// 	// 对响应数据做点什么
	// 	// this.list = res.data
	// 	// this.listLoading = false
	// 	return res;
	// }, function(error) {
	// 	// 对响应错误做点什么
	// 	return Promise.reject(error);
	// });
</script>
<style>
</style>
