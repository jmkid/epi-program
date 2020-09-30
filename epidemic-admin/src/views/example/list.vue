<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
			<el-table-column align="center" label="ID">
				<template slot-scope="scope">
					<span>{{ scope.row.studentId }}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Date">
				<template slot-scope="scope">
					<span>{{ scope.row.date }}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="building">
				<template slot-scope="scope">
					<span>{{ scope.row.building }}</span>
				</template>
			</el-table-column>

			<el-table-column class-name="status-col" label="classroom">
				<template slot-scope="{row}">
					{{ row.classroom }}
				</template>
			</el-table-column>

		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
	</div>
</template>

<script>
	// import {
	// 	fetchList
	// } from '@/api/article'
	import axios from 'axios'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

	export default {
		name: 'ArticleList',
		components: {
			Pagination
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				}
				return statusMap[status]
			}
		},
		data() {
			return {
				list: null,
				total: 0,
				listLoading: true,
				listQuery: {
					page: 1,
					limit: 20
				}
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.listLoading = true
				axios.get('/api/student/getclassroombysendmessageid', {
					params: {
						sendMessageId: 10010
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
				// fetchList(this.listQuery).then(response => {
				//   this.list = response.data.items
				//   this.total = response.data.total
				//   this.listLoading = false
				// })
			}
		}
	}
</script>

<style scoped>
	.edit-input {
		padding-right: 100px;
	}

	.cancel-btn {
		position: absolute;
		right: 15px;
		top: 10px;
	}
</style>
