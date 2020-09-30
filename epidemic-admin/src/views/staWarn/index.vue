<template>
	<!-- 异常学生提醒 -->
	<div class="app-container">
		<el-table ref="filterTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit
		 highlight-current-row empty-text="暂无内容或数据加载失败,请联系管理员解决问题">
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
			<el-table-column label="当天体温" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.temperature }}</span>
				</template>
			</el-table-column>
			<el-table-column label="详情" align="center">
				<template slot-scope="scope">
					<el-link type="primary" @click="changeView(scope.row)">[查看详情]</el-link>
				</template>
			</el-table-column>
			<el-table-column align="center" label="上传时间" prop="display_time" filter-placement="bottom-end">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.date }}</span>
				</template>
			</el-table-column>
		</el-table>
		<view-details ref="vdetail"></view-details>
	</div>
</template>

<script>
	import viewDetails from '@/components/Viewdetails/index'
	import axios from 'axios'

	export default {
		components: {
			viewDetails
		},
		data() {
			return {
				list: null,
				listLoading: true,
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			//创建后调用
			fetchData() {
				this.listLoading = true
				axios.get('api/studentCon/noticeAll', {
					params: {
						teacher_id: 10010
					}
				}).then((res) => {
					this.list = res.data
					this.listLoading = false
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].date = this.list[i].date.substring(0, 10) + ' ' + this.list[i].date.substring(11, 16);
					}
				}).catch((err)=>{
					this.listLoading = false
					this.$message.error('糟糕，加载数据出错了');
				})
				//
				// getList(123).then(response => {
				//  .items
				//
				// })
			},
			changeView(row) {
				this.$refs.vdetail.dialogTableVisible = true
				this.$refs.vdetail.stu_id = row.student_id
				this.$refs.vdetail.getInfo()
			}
		}
	}
</script>
<style>
</style>
