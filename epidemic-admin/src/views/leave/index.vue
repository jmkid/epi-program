<template>
	<!-- 请假信息报表 -->
	<div class="app-container">
		<el-button @click="filterVisible=true" style="margin-bottom:20px;background-color:royalblue;color:white;user-select:none">添加筛选</el-button>
		<el-table empty-text="暂无内容或数据加载失败,请联系管理员解决问题" ref="filterTable" v-loading="listLoading" :data="list"
		 element-loading-text="Loading" border fit highlight-current-row>
			<!--   display data   -->
			<el-table-column align="center" label="编号" width="60" type="index"></el-table-column>
			<el-table-column label="学号" align="center" width="150">
				<template slot-scope="scope">{{ scope.row.stuNum }}</template>
			</el-table-column>
			<el-table-column label="学生姓名" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.stuName }}</span>
				</template>
			</el-table-column>
			<el-table-column label="请假时间" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.stuTem }}</span>
				</template>
			</el-table-column>
			<el-table-column label="请假原因" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.stuTem }}</span>
				</template>
			</el-table-column>
			<el-table-column label="学生详情" align="center">
				<el-link type="primary" @click="changeView">[查看详情]</el-link>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row,'ruleForm')" type="text" size="small">同意</el-button>
					<el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog t itle="添加筛选" :visible.sync="filterVisible" width="1000px" :before-close="handleClose">
			<el-tabs type="border-card">
				<el-tab-pane label="查询某天记录">
					<el-date-picker style="width: 200px;" v-model="value2" align="right" type="date" placeholder="选择日期"
					 :picker-options="pickerOptions">
					</el-date-picker>
					<el-button class="fil-btn" type="primary" @click="getByDate()">筛选</el-button>
				</el-tab-pane>
				<el-tab-pane label="通过学生id查找记录">
					<el-input style="width: 200px;" placeholder="请输入内容" v-model="studentId" clearable>
					</el-input>
					<el-button class="fil-btn" type="primary" @click="getById()">筛选</el-button>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
		<view-details ref="vdetail"></view-details>
	</div>
</template>

<script>
	import axios from 'axios'
	import viewDetails from '@/components/Viewdetails/index'

	export default {
		components: {
			viewDetails
		},
		data() {
			return {
				list: null,
				listLoading: true,
				ApprovvalNo: null,
				filterVisible: false,
				studentId: null,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value2: '',
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			//创建后调用
			fetchData() {
				this.listLoading = true
				axios.get('/api/student/getstudentleavebyteacherid', {
					params: {
						teacher_id: 10010
					}
				}).then((res) => {
					console.log(res)
					this.list = res.data
					this.listLoading = false
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].date = this.list[i].date.substring(0, 10) + ' ' + this.list[i].date.substring(11, 16);
					}
				}).catch((err) => {
					this.listLoading = false
					this.$message.error('糟糕，加载数据出错了');
				})
				// getList().then(response => {
				//   this.list = response.data.items
				//   this.listLoading = false
				// })
			},
			changeView() {
				this.$refs.vdetail.dialogTableVisible = true;
			},
			// 请假审批
			handleClick() {
				axios.post('/api/student/Approve', {
					ApprovvalNo: ''
				}).then((res) => {
					console.log(res)
				}).catch((err) => {
					console.log(err)
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done()
						this.refresh()
					})
					.catch(_ => {})
			},
			getByDate() {
				this.listLoading = true
				axios.get('/api/student/getclassroombydate', {
					params: {
						date: this.value2,
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
			getById() {
				this.listLoading = true
				axios.get('/api/student/getstudentleavebystudentid', {
					params: {
						student_id: this.studentId
					}
				}).then((res) => {
					console.log(res)
					this.list = res.data
					this.listLoading = false
				}).catch((err) => {
					this.listLoading = false
					this.$message.error('糟糕，加载数据出错了');
				})
			}
		}
	}
</script>
<style>
	.fil-btn {
		margin-left: 20px;
	}
</style>
