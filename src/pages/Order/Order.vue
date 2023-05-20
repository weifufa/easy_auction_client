<template>
  <div>
    <div class="arr_icon">
      <van-icon class="arrow-left" name="arrow-left" size="1.5rem" @click="$router.back()" />
    </div>
    <div v-for="(item,index) in dataFrom" :key="index">
      <van-card
        :num="item.auctionCount"
        :price="item.currentPrice"
        :title="item.auctionName"
        :thumb="item.auctionImage"
      >
        <template #tags>
          <van-tag plain type="warning" v-if="item.orderState===0">待发货</van-tag>
          <van-tag plain type="success" v-else-if="item.orderState===1">交易成功</van-tag>
          <van-tag plain type="danger" v-else-if="item.orderState===2">交易失败</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
// import
import { getOrderMessage } from "@/api";
export default {
  data() {
    return {
      dataFrom: {}
    };
  },
  methods: {
    //初始化数据
    async inItData() {
      const res = await getOrderMessage();
      if (res.code == 0) {
        this.dataFrom = res.data;
      }
    }
  },
  mounted() {
    this.inItData();
  }
};
</script>

<style scoped>
.arrow-left {
  float: left;
  margin: 13px 0 0 10px;
}
.arr_icon {
  height: 40px;
}
</style>