<template>
	<aside>
		<!-- Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support
    caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching
    effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all
    pages directly. See details <br>
		keep-alive不能缓存创建和编辑页面，因为keep-alive include当前不支持基于路由的缓存，因此当前基于组件名称来缓存。如果要实现类似的缓存效果，可以使用浏览器缓存方案，例如localStorage。或者不要使用保持活动包含直接缓存所有页面。查看详细资料 -->
		本页用于编辑信息发送给需要接收的对象，暂时不支持上传图片和文件等功能，文章标题、接收人id(学号)、文章内容为必填项，其中学号输入0为向全体学生发送消息
		<!-- <a href="https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html" target="_blank">Document</a> -->
	</aside>
</template>
