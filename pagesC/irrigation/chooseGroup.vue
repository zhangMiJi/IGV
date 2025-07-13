<template>
	<view class="valve-control-container">
    <view class="back-color">
        <view class="list-group">
          <view class="choose-t">请选择参与轮灌的灌溉组</view>
          <view class="item" v-for="(item,index) in dataList" :key="index" @click="checkShow(item)">
            <u-checkbox-group 
                v-model="item.checked"
                iconPlacement="right"
                shape="circle" 
                placement="row">
              <u-checkbox activeColor="#0F40F5" :label="item.name"></u-checkbox>
            </u-checkbox-group>
          </view>
        </view>
        <view class="choose-list" :class="lookDetail?'look-detail':''">
          <view class="title">已选择  <text style="margin: 0 6px;" :class="checkedChoose.length?'num-choose':''">{{ checkedChoose.length }}</text> 个灌溉组 <text class="look-chooose" @click="lookDetail=!lookDetail">{{lookDetail?'收起详情':'展开详情'}}</text> </view>
          <view v-show="lookDetail" class="sort-c">点击右侧按钮调整灌溉组的轮灌顺序</view>
          <view v-show="lookDetail">
            <view class="list">
              <view v-for="(item,index) in dataList" :key="index">
                  <view class="li" v-if="item.checked">
                    <view>{{item.name }}</view>
                    <view v-if="index==0"><text>icon</text> <text class="up-down">下移</text> </view>
                    <view v-else><text>icon</text> <text class="up-down">上移</text> </view>
                  </view>
              </view>
            </view>
          </view>
        </view>
        <view class="choose-list-mask" v-if="lookDetail"></view>
    </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
        lookDetail:false,
        dataList:[
          {
            name:'灌溉组0001',
            checked:false,
            id:0
          },
          {
            name:'灌溉组0002',
            checked:false,
            id:1
          },
          {
            name:'灌溉组0003',
            checked:false,
            id:2
          }
        ],
			}
		},
    onLoad() {
    },
    computed: {
      checkedChoose() {
        // 返回计算结果
        return this.dataList.filter((item)=> item.checked);
      }
    },
		methods: {
      checkShow(item){
        item.show = !item.show;
      },
		}
	}
</script>

<style lang="scss" scoped>
.list-group {
  padding: 0 15px;
  .item {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  ::v-deep .u-checkbox-group {
    flex-direction: column;
    // padding: 20px 20px;
  }
  ::v-deep .u-checkbox-group .u-checkbox {
    padding: 20px 20px;
  }
}
.choose-t {
  padding: 20px 9px;
  font-size: 14px;
  color: #101010;
}
.back-color {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 1);
  z-index: 1;
}

//tab---
.valve-control-container {
  ::v-deep .u-cell {
    &__title-text {
      font-size: 14px;
      font-weight: 600;
      color: #4f4f4f;
    }
  }
  ::v-deep .u-collapse-item__content {
    background: #efefef;
    &__text {
      padding: 10px !important;
    }
  }
}
.choose-list-mask {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: #969696;
}
.choose-list {
  position: fixed;
  z-index: 8;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 20px 20px 0px 0px;
  color: #101010;
  font-size: 16px;
  padding: 0 20px;
  .sort-c {
    color: #4f4f4f;
    font-size: 14px;
    margin-bottom: 16px;
  }
  .look-chooose {
    color: #0f40f5;
    margin-left: 10px;
  }
  .num-choose {
    color: #0f40f5;
  }
  .title {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 16px;
  }
  .list {
    height: calc(100vh - 120px);
    overflow: scroll;
    .li {
      font-size: 16px;
      color: #101010;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 6px;
      margin-bottom: 12px;
      height: 60px;
      line-height: 60px;
      background-color: #efefef;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .up-down {
        color: #9a9a9a;
        margin-left: 10px;
      }
    }
  }
}
</style>