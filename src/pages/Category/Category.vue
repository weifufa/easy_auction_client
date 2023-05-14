<!-- <template>
    <div>
        <div>分类</div>
        <van-sidebar v-model="activeKey">
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
            <van-sidebar-item title="标签名称" />
        </van-sidebar>
    </div>
</template>

<script>

import { Sidebar, SidebarItem } from 'vant';

export default {
    data() {
        return {
            activeKey: 0,
        };
    },
}
</script>

<style></style> -->

<template>
  <div class="maint">
    <van-sidebar v-model="classifyKey">
      <!-- 遍历渲染主类 -->
      <van-sidebar-item
        v-for="(item, i) in classify"
        :key="i"
        @click="classSwitch(i)"
        :title="item.name"
      />
    </van-sidebar>
    <div class="category">
      <!-- 遍历渲染二级分类 -->
      <!-- <div v-for="(cate, i) in category" :key="i">
        <p class="cat_Secondary">{{ cate.name }}</p> -->
      <van-grid :border="false" :column-num="3">
        <!-- 遍历渲染三级分类 -->
        <van-grid-item v-for="(item, i) in category" :key="i">
          <img class="goods_img" :src="item.img" />
          <!-- <div style="width:76px;height:76px;background:red"></div> -->
          <p class="goods_name">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
// 引入数据
import data from "../data2.json";
export default {
  data() {
    return {
      // 主类
      classify: [],
      classifyKey: 0,
      // 侧边内容
      category: [],
    };
  },
  created() {
    this.classify = data.data;
    // 默认二级分类显示的数据
    this.category = this.classify[0].childList;
  },
  methods: {
    classSwitch(i) {
      // 点击主类级别导航切换
      this.classify = data.data;
      // 根据i进行二级菜单筛选
      this.category = this.classify[i].childList;
    },
  },
};
</script>
 
<style >
.maint {
  display: flex;
}
.category {
  width: 100%;
  height: 100%;
}
.cat_Secondary {
  width: -webkit-fit-content;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 10px 10px;
}
.goods_img {
  width: 76px;
  height: 76px;
}
.goods_name {
  font-size: 14px;
  font-weight: bolder;
}
</style>