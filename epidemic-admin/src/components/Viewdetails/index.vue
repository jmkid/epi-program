<template>
	<div>
		<el-dialog title="学生详情" :visible.sync="dialogTableVisible">
			<el-table :data="gridData">
				<el-table-column property="student_id" label="学号">
					<template slot-scope="scope">{{ scope.row.student_id }}</template>
				</el-table-column>
				<el-table-column property="name" label="姓名">
					<template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column property="address" label="状态">
					<template slot-scope="scope">{{ scope.row.statues }}</template>
				</el-table-column>
				<el-table-column property="address" label="体温">
					<template slot-scope="scope">{{ scope.row.temperature }}</template>
				</el-table-column>
				<el-table-column property="address" label="时间">
					<template slot-scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'vd',
		data() {
			return {
				gridData: null,
				dialogTableVisible: false,
				stu_id: '',
				formLabelWidth: '120px',
			}
		},
		methods: {
			getInfo() {
				console.log()
				axios.get('api/studentCon/checkById', {
					params: {
						student_id: this.stu_id
					}
				}).then((res) => {
					console.log(res)
					this.gridData = res.data
					console.log(this.gridData[0].date)
					for (let i = 0; i < this.gridData.length; i++) {
						this.gridData[i].date = this.gridData[i].date.substring(0, 10) + ' ' + this.gridData[i].date.substring(11, 16);
					}
					// console.log(res.data)
					// console.log(this.gridData)
				})
			}
		}
	}
</script>

<style scoped>

</style>
