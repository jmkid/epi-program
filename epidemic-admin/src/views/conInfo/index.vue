<template>
  <div>
    学生姓名：张三
    学生学号：{{ stuId }}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        stuId: this.$route.query.student_id
      }
    }
  }
</script>
