<template>
  <div class="detail">
    <Swiper></Swiper>
    <div class="mark">
      <div class="In_auction">拍卖中</div>
      <div class="end_time">
        <p>距拍卖结束:</p>
        <div class="count_down">
          <van-count-down :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
    </div>
    <!-- 名称详情 -->
    <div class="goods_detail">
      <p class="goods_name">宜兴原矿紫砂壶全手工美人壶茶壶功夫茶具</p>
      <div class="goods_remark">二拍</div>
      <div class="price_concern">
        <div class="price">
          <p>当前价</p>
          <div class="good_price">￥12345.6</div>
        </div>
        <div class="concern">
          <img src="../../assets/icon/concern.png" />
          <p>关注</p>
        </div>
      </div>
    </div>
    <!-- 名称详情 -->
    <div class="goods_detail1">
      <img src="../../assets/temp/temp1.png" width="100%" />
    </div>
    <!-- 商品选项 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="danger" text="参与竞拍" />
    </van-goods-action>
  </div>
</template>

<script>
import Swiper from "../../pages/Home/swiper";
import { CountDown } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
export default {
  components: {
    Swiper,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
    };
  },
  methods: {},
};
</script>

<style>
.detail {
  padding: 0 10px;
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
  height: 80px;
  display: flex;
  margin-top: 15px;
}
.price {
  width: 75%;
  display: flex;
}
.price p {
  font-size: 14px;
  font-weight: bold;
  color: #9b9b9b;
  margin: 10px 15px 0px 10px;
}
.good_price {
  font-size: 28px;
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
</style>
