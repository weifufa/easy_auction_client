<template>
	<div class="conter">
		<div class="category_nav" v-for="(item,index) in data" :key="index" >
			<img class="nav_img" :src="item.icon" alt="图片显示失败" >
			<p class="text">{{item.text}}</p>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:[
					{
						icon:require('@/assets/icon/jewelry.png'),
						text:"玉翠珠宝",
						},
					{
						icon:require('@/assets/icon/tea.png'),
						text:"茶酒滋补",
						},
					{
						icon:require('@/assets/icon/tea1.png'),
						text:"紫砂陶瓷",
						},
					{
						icon:require('@/assets/icon/tea1.png'),
						text:"工艺品",
						},
					{
						icon:require('@/assets/icon/Luxury.png'),
						text:"奢侈品",
						},
					{
						icon:require('@/assets/icon/phone.png'),
						text:"手机",
						},
					{
						icon:require('@/assets/icon/Computer.png'),
						text:"电脑",
						},
					{
						icon:require('@/assets/icon/book.png'),
						text:"文玩收藏",
						},
						]	
			}
		},
		methods:{

		}
	}
</script>

<style>
	.conter{
		width: 100%;
		height: 100%;
		margin-top: 10px;
		display: flex;	
		flex-wrap: wrap;
	}
	 .category_nav{
	 	width: 75px;
	 	height: 75px;
		margin-left: 2px;
	 	/* background-color: pink; */
	 }
	 .nav_img{
		 width: 40px;
		 height: 40px;
		 border-radius: 50%;
	 }
	 .text{
		 font-size: 12px;
		 font-weight: bold;
		 color: #9F9F9F;
	 }
	
</style>
