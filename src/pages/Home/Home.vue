<template>
	<div>
		<Swiper></Swiper>
		<Navigation></Navigation>
		<Like></Like>
	</div>
</template>

<script>
import Swiper from '../../pages/Home/swiper';
import Navigation from '../../pages/Home/Navigation';
import Like from '../../pages/Home/Like'

export default {
	components: {
		Swiper,
		Navigation,
		Like
	},
	data() {
		return {

		};
	},
}
</script>

<style></style> 

