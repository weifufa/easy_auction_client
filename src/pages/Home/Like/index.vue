<template>
  <div class="like">
    <p class="p">--猜你喜欢--</p>
    <div class="contet">
      <div
        class="main"
        v-for="(item, index) in dataFrom"
        :key="index"
        @click="GoDetail"
      >
        <img :src="item.imageArray[0]" />
        <div class="name">{{ item.auctionName }}</div>
        <div class="remark">
          {{ item.remark }}
        </div>
        <div class="price">
          <p>起拍价：￥{{ item.startPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuctionNotStart } from "@/api";
export default {
  data() {
    return {
      dataFrom: {},
      images11: "",
      // dataFrom: [
      //   {
      //     img: "https://img11.360buyimg.com/n1/s600x600_jfs/t1/194306/22/32744/51148/6407eebbF54e98f18/6b5b0c8fcc5d1ba5.jpg!q70",
      //     FoodName: "和田玉吊坠[花开富贵]和田玉白玉莲花牌子挂件吊坠-T5948",
      //     remark: "包邮",
      //     price: 5126,
      //     number: 12,
      //   },
      //   {
      //     // img:require('@/assets/logo.png'),
      //     img: "https://img30.360buyimg.com/n1/s600x600_jfs/t1/60105/33/18214/87699/62849b7bE981dcc82/b9e85815f32b4294.jpg!q70",
      //     FoodName:
      //       "海南沉香16mm手串重量1 6克左右清雅纯正文玩佛珠男女款送礼自戴",
      //     remark: "不包邮",
      //     price: 576,
      //     number: 12,
      //   },
      //   {
      //     // img:require('@/assets/logo.png'),
      //     img: "https://img20.360buyimg.com/n1/s600x600_jfs/t1/126286/33/33300/80807/639022e4E9b7bcb8a/459e613bd243872e.jpg!q70",
      //     FoodName: "[保真带证书能典当]当代印度小叶紫植牛毛纹笔筒",
      //     remark: "包邮",
      //     price: 523,
      //     number: 1,
      //   },
      //   {
      //     // img:require('@/assets/logo.png'),
      //     img: "https://img11.360buyimg.com/n1/s600x600_jfs/t1/126662/8/32620/57202/6407f04aF347740bc/f76b06f15b58f7e7.jpg!q70",
      //     FoodName: "和田玉吊坠[观音赐福]和田玉白玉观音蝙蝠挂件吊坠-T6408",
      //     remark: "包邮",
      //     price: 5123,
      //     number: 4,
      //   },
      // {
      // 	img:require('@/assets/logo.png'),
      // 	FoodName:"哈哈哈哈哈哈哈嘿嘿嘿",
      // 	remark:"包邮",
      // 	price:576,
      // 	number:12
      // },
      // ],
    };
  },
  methods: {
    // 跳转详情页
    GoDetail() {
      this.$router.push("/detail");
    },
    async getAuctionNotStart() {
      const result = await getAuctionNotStart();
      if (result.code == 0) {
        this.dataFrom = result.data;
      }
    },
  },
  created() {
    //获取未开拍商品
    this.getAuctionNotStart();
  },
};
</script>

<style scoped>
.like {
  width: 100%;
  height: 100%;
}

.p {
  margin-bottom: 10px;
}

.contet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.main {
  width: 45%;
  height: 250px;
  background-color: #f9fafc;
  margin-bottom: 10px;
  border-radius: 2px;
  box-shadow: 2px 2px 2px 2px #d5d5d5;
  align-items: center;
}

.main img {
  max-height: 161px;
  max-width: 164px;
}

.name {
  width: 120px;
  height: 25px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  line-height: 25px;
}

.remark {
  width: fit-content;
  height: 15px;
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  line-height: 15px;
  color: #af454f;
  border: 1px solid #af454f;
  border-radius: 2px;
  margin-left: 15px;
}

.price {
  width: 80%;
  height: 20px;
  display: flex;
  margin: 10px 0px 0px 5px;
}

.price p {
  font-size: 15px;
  font-weight: bolder;
  color: #af454f;
  line-height: 20px;
}

.price span {
  font-size: 12px;
  color: #a4a4a9;
  line-height: 20px;
  margin: 0px 0px 0px 5px;
}
</style>
