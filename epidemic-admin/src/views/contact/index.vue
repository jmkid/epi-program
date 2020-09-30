<template>
	<!-- 学生接触记录 -->
	<div class="app-container">
		<el-table ref="filterTable" v-loading="listLoading" empty-text="暂无内容或数据加载失败,请联系管理员解决问题" :data="list"
		 element-loading-text="Loading" border fit highlight-current-row>
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
			<el-table-column class-name="status-col" label="状态" align="center" prop="status" filter-placement="bottom-end"
			 :filters="[{ text:'健康',value:'健康'},{ text:'发热',value:'发热'},{ text:'其他',value:'其他'}]" :filter-method="filterChange">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status | statusFilter">{{ scope.row.statues }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="上传时间" prop="display_time">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="学生详情" align="center">
				<template slot-scope="scope">
					<el-link type="primary" @click="changeView(scope.row)">[查看详情]</el-link>
				</template>
			</el-table-column>
			<el-table-column label="接触记录" align="center">
				<template slot-scope="scope">
					<el-link type="primary" @click="toContact(scope.row)">[查看详情]</el-link>
				</template>
			</el-table-column>
		</el-table>
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
		filters: {
			statusFilter(status) {
				const statusMap = {
					健康: 'success',
					其他: 'gray',
					发热: 'danger'
				}
				return statusMap[status]
			}
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
				axios.get('api/studentInfo/getAll', {
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
					console.log(err)
					this.listLoading = false
					this.$message.error('糟糕，加载数据出错了');
				})
				// getList().then(response => {
				//   this.list = response.data.items
				//   this.listLoading = false
				// })
			},
			filterChange(value, row, column) {
				const property = column['property']
				return row[property] === value
			},
			changeView(row) {
				this.$refs.vdetail.stu_id = row.student_id
				this.$refs.vdetail.getInfo()
				this.$refs.vdetail.dialogTableVisible = true;
			},
			toContact(row) {
				this.$router.push({
					path: '/conInfo',
					query: {
						student_id: row.student_id
					}
				})
			}
		}
	}
</script>
<style>
</style>
