<template>
  <div class="detail">
    <van-icon
      class="arrow-left"
      name="arrow-left"
      size="1.5rem"
      @click="$router.back()"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in dataFrom.images" :key="index"
        ><img :src="image" class="img"
      /></van-swipe-item>
    </van-swipe>
    <div class="mark">
      <div class="In_auction">拍卖中</div>
      <div class="end_time">
        <p>距拍卖结束:</p>
        <div class="count_down">
          <!-- <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒">
            <template #default="timeData">
              <span class="block">{{ timeData.days }}</span>
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down> -->
          <van-count-down
            style="color: #ee0a24"
            :time="time"
            format="DD 天 HH 时 mm 分 ss 秒"
          />
        </div>
      </div>
    </div>
    <!-- 名称详情 -->
    <div class="goods_detail">
      <p class="goods_name">{{ dataFrom.auctionName }}</p>
      <div class="goods_remark">一拍</div>
      <div class="price_concern">
        <div class="price">
          <p>起拍价</p>
          <div class="good_price">￥{{ dataFrom.startPrice }}</div>
        </div>
        <div class="price">
          <p>最高价</p>
          <div class="good_price">￥{{ maxPrice }}</div>
        </div>

        <div class="concern">
          <img src="../../assets/icon/concern.png" />
          <p>关注拍品</p>
        </div>
      </div>
      <div class="price">
        <p>已出价</p>
        <div class="good_price">￥{{ AlreadyBid }}</div>
      </div>
    </div>
    <div class="auction_detail">{{ dataFrom.auctionName }}</div>
    <!-- 名称详情 -->
    <div class="goods_detail1">
      <img src="../../assets/temp/temp1.png" width="100%" />
    </div>
    <!-- 商品选项 -->
    <van-goods-action class="goods_action">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="danger"
        text="参与竞拍"
        @click="toggleShow()"
      />
      <van-popover placement="top" />
    </van-goods-action>

    <!-- 遮罩层 -->
    <div class="discount_wrapper" v-if="isShow">
      <div class="cont">
        <van-icon class="clear" @click="show" name="cross" />
        <!-- <div class="clear" @click="show">清空</div> -->
        <div class="upprice">
          <van-tag type="danger" @click="actionSubmit(100)">+100</van-tag>
          <van-tag type="danger" size="medium" @click="actionSubmit(200)"
            >+200</van-tag
          >
          <van-tag type="danger" size="large" @click="actionSubmit(300)"
            >+300</van-tag
          >
        </div>
        <div class="other_price">
          <span> 请输入价格：</span>
          <van-stepper
            class="stepper"
            theme="round"
            v-model="risePrice"
            input-width="45px"
            button-size="22"
          />
        </div>
        <!-- <div class="sum">确认提交</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast, SwipeItem } from "vant";
// import Swiper from "../../pages/Home/swiper";
import { CountDown } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import {
  getAuctionDetail,
  submitAuction,
  getMaxPrice,
  getAlreadyBid,
} from "@/api";
export default {
  data() {
    return {
      //isAlreadyBid: false, //是否是最高价
      AlreadyBid: 0, //已出价
      maxPrice: 0, //最高出价
      schedule: 0, //出价进度 0关闭，1弹出出来，2出价成功
      risePrice: 0, //手动输入出价
      bidPrice: 0, //快捷出价
      time: 0,
      dataFrom: { images: [] },
      isShow: false,
      queryId: this.$route.query.queryId,
    };
  },
  methods: {
    //初始化数据
    async inItData() {
      const res = await getAuctionDetail(this.queryId);
      if (res.code == 0) {
        this.dataFrom = res.auction;
        this.dataFrom.images = JSON.parse(res.auction.images);
        var now = new Date().getTime();
        var endtime = Date.parse(res.auction.auctionEndTime);
        console.log("now：" + now);
        console.log("endtime" + endtime);
        this.time = endtime - now; //结束时间转换成毫秒-当前时间毫秒==倒计时
        console.log(this.time);
      }
    },
    //出价
    actionSubmit(bid) {
      var offerPrice = this.AlreadyBid + bid;
      if (offerPrice < this.dataFrom.startPrice) {
        Toast.fail("出价不能低于当前价");
        return;
      }
      if (offerPrice < this.maxPrice) {
        Toast.fail("加价的金额太少！未超过最高价！");
        return;
      }
      Dialog.confirm({
        title: "出价",
        message: "您确定加价" + bid + "元吗？",
      })
        .then(() => {
          var data = { auctionId: this.dataFrom.auctionId, bid: offerPrice }; //出价后的价格
          submitAuction(data).then((res) => {
            console.log(res);
            if (res.code == 0) {
              Toast.success("出价成功");
              this.isShow = !this.isShow; //关闭遮罩层
              this.schedule = 0; //参与竞拍步骤清0
              this.risePrice = 0; //手动出价清0
              this.AlreadyBid = res.AlreadyBid;
              //this.maxPrice =
              // this.maxPrice < res.AlreadyBid ? res.AlreadyBid : this.maxPrice; //已出价去和最高价对比，刷新最高价
            } else {
              Toast.fail("出价失败！");
            }
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取当前拍品最高价
    async getMaxPrice() {
      const res = await getMaxPrice(this.queryId);
      if (res.code == 0) {
        this.maxPrice = res.maxPrice;
      }
    },
    //进来自动获取已出价
    async getAlreadyBid() {
      const res = await getAlreadyBid(this.queryId);
      if (res.code == 0) {
        this.AlreadyBid = res.AlreadyBid;
      }
    },

    // 遮罩层
    toggleShow() {
      if (this.schedule == 0) {
        //如果等于0那么就是没弹出遮罩层
        this.schedule = 1; // 改成1,说明下次再点击的时候就是提交请求
        this.isShow = !this.isShow; //取反显示
      } else if (this.schedule == 1) {
        this.actionSubmit(this.risePrice); //提交请求
      }
    },
    // 清空遮罩层内容
    show() {
      this.isShow = !this.isShow; //关闭·
      this.schedule = 0;
    },
  },
  created() {
    this.inItData();
    this.getMaxPrice();
    this.getAlreadyBid(); //获取已出价
  },
  mounted() {
    //在组件挂在时启动定时器，5秒获取一次最高价
    setInterval(() => {
      this.getMaxPrice();
    }, 5000);
  },
  computed: {},
};
</script>

<style scoped>
.detail {
  padding: 0 10px;
}
.detail .arrow-left {
  z-index: 100;
  position: absolute;
  top: 16px;
  left: 16px;
}
.mark {
  width: 100%;
  height: 55px;
  display: flex;
  /* padding: 0 10px; */
}
.In_auction {
  width: 25%;
  height: 55px;
  background-color: #b72d2b;
  color: white;
  line-height: 55px;
}
.end_time {
  width: 75%;
  height: 55px;
  line-height: 55px;
  background-color: #fbece7;
  display: flex;
}
.end_time p {
  font-size: 12px;
  color: #b72d2b;
  margin-left: 30px;
}
.count_down {
  width: -webkit-fit-content;
  height: 25px;
  margin-top: 17px;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.goods_detail {
  width: 100%;
  height: 108px;
  padding-top: 25px;
}
.goods_name {
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin: 0px 0px 10px 10px;
}
.goods_remark {
  width: -webkit-fit-content;
  height: 17px;
  font-size: 10px;
  background-color: #b72d2b;
  color: white;
  margin-left: 10px;
  line-height: 17px;
  border-radius: 2px;
}
.price_concern {
  width: 100%;
  height: 36px;
  display: flex;
  margin-top: 15px;
}
.price {
  width: 40%;
  display: flex;
}
.price p {
  font-size: 14px;
  font-weight: bold;
  color: #9b9b9b;
  margin: 5px 15px 0px 10px;
}
.good_price {
  font-size: 20px;
  font-weight: bold;
  color: #b72d2b;
}
.concern {
  align-items: flex-end;
}
.line {
  width: 2px;
  height: 25px;
  background-color: azure;
}
.concern img {
  width: 30px;
  height: 30px;
}
.concern p {
  font-size: 14px;
  color: #9b9b9b;
}
.my-swipe {
  line-height: 13px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  height: 355px;
  background-color: #39a9ed;
}

.img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
.auction_detail {
  float: left;
  margin: 20px 10px;
}
.lisk-mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
}
/* 这遮罩层 */
.discount_wrapper {
  width: 100%;
  height: 92%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  /* transition: 1s; */
}
.cont {
  width: 100%;
  height: 130px;
  background-color: white;
  margin-top: 135%;
}
.clear {
  float: right;
  margin: 10px 20px 10px 0;
}
.upprice p {
  display: flex;
  margin-left: 70px;
}
.upprice p {
  font-size: 18px;
  color: #9b9b9b;
  margin: 45px 15px 0px 10px;
}
.other_price {
  line-height: 45px;
  margin: 10px 2px 10px 80px;
}
.other_price span {
  float: left;
}
.stepper {
  float: left;
}
.goods_action {
  z-index: 51;
}
/* .input {
  border: 1px solid #9b9b9b;
} */
/* .sum {
  width: 80px;
  height: 30px;
  border: 1px solid #9b9b9b;
  line-height: 30px;
  text-align: center;
  float: right;
  margin-right: 20px;
  margin-top: 30px;
} */
</style>
