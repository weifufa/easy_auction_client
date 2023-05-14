<template>
	<!--<van-swipe :autoplay="3000">
		   <van-swipe-item v-for="(image, index) in images" :key="index">
		    <img :src="image"/>
		  </van-swipe-item> 
		</van-swipe>-->
	<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		<van-swipe-item v-for="(image, index) in images" :key="index"><img
				:src="require('@/assets/' + image)" /></van-swipe-item>
		<!--  <van-swipe-item>2</van-swipe-item>
		  <van-swipe-item>3</van-swipe-item>
		  <van-swipe-item>4</van-swipe-item> -->
	</van-swipe>
	<!-- 	<img src="../../../assets/bj2.png" > -->
</template>

<script>
import { SwipeItem, Lazyload } from 'vant';
export default {
	name: '',
	data() {
		return {
			images: [
				'bj1.png',
				'bj2.png',
			],
		};
	},
}
</script>

<style>
.my-swipe {
	line-height: 13px;
}

.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;

	text-align: center;
	background-color: #39a9ed;
}

.img {
	max-width: 100%;
	max-height: 100%;
}
</style> 

