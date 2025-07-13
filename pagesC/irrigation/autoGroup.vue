<template>
	<view class="valve-control-container">
    <view class="back-color">
        <view class="top">自动轮灌进行中</view>
        <view class="list-group-auto">
          <!-- {
            name:'灌溉组0001',
            status:'0',
            num:27,
            timeTotal:6,
            timePedding:0.5,
            timeStart:'2025-4-18  15:30'
          } -->
          <div class="item" v-for="(list,index) in dataList" :key="index">
            <text class="status status-1" v-if="list.status=='2'"></text>
            <text class="status status-2" v-if="list.status=='1'"></text>
            <text class="status status-3" v-if="list.status=='0'"></text>
            <view class="content">
              <view class="top-c">
                <view class="name-no">{{list.name}}</view><view class="statistics">icon <text class="num-t"> <text style="color: #0F40F5;">{{list.num}}</text> /30</text> </view>
              </view>
              <view class="progress">
                <view class="progress-num" v-if="list.status=='2'" :style="{ width: list.progress +'%' }"></view>
                <view class="progress-num progress-num-1" v-if="list.status=='1'" :style="{ width: list.progress +'%' }"></view>
              </view>
              <view class="bottom-c">
                <text>灌溉时长：</text><text class="time">{{list.timeTotal}}小时</text>
                <text v-if="list.status=='2'" style="margin-left: 28px;">已完成</text>
                <text v-else-if="list.status=='1'">
                  <text style="margin-left: 28px;">已灌溉：</text><text class="time">{{list.timePedding}}小时</text>  
                </text>
                <text style="margin-left: 28px;" v-else-if="list.status=='0'">{{ '预计'+list.timeStart+'开始' }}</text>
              </view>
            </view>
          </div>
        </view>
    </view>
    <view class="tabbar">
        <u-tabbar
            :value="activeTabbar"
            @change="handleTabbarChange"
            activeColor="#81B337"
            :fixed="true"
            :placeholder="true"
            :safeAreaInsetBottom="true"
        >
            <u-tabbar-item text="返回首页">
                <i class="iconfont active" slot="active-icon">&#xe704;</i>
                <i class="iconfont inactive" slot="inactive-icon">&#xe705;</i>
            </u-tabbar-item>
            <u-tabbar-item text="阀门控制">
                <i class="iconfont active" slot="active-icon">&#xe706;</i>
                <i class="iconfont inactive" slot="inactive-icon">&#xe707;</i>
            </u-tabbar-item>
            <u-tabbar-item text="设备管理">
                <i class="iconfont active" slot="active-icon">&#xe708;</i>
                <i class="iconfont inactive" slot="inactive-icon">&#xe709;</i>
            </u-tabbar-item>
        </u-tabbar>
    </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
        activeTabbar: 1,
        dataList:[
          {
            name:'灌溉组0001',
            status:'2',
            num:27,
            timeTotal:6,
            progress:100,
            timePedding:0.5,
            timeStart:'2025-4-18  15:30'
          },
          {
            name:'灌溉组0001',
            status:'1',
            num:27,
            timeTotal:6,
            progress:30,
            timePedding:0.5,
            timeStart:'2025-4-18  15:30'
          },
          {
            name:'灌溉组0001',
            status:'0',
            num:27,
            timeTotal:6,
            progress:0,
            timePedding:0.5,
            timeStart:'2025-4-18  15:30'
          }
        ]
			}
		},
    onLoad() {
    },
		methods: {
      handleTabbarChange(name) {
        if(name === 0) {
              uni.reLaunch({
            url: '/pages/index/index'
        });}else if(name === 2) {
            uni.navigateTo({
            url: '/pagesC/equipManage/index'
          });
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
.back-color {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 1);
  z-index: -1;
  .top {
    color: #0f40f5;
    font-size: 20px;
    padding: 20px;
  }
  .list-group-auto {
    margin-top: 20px;
    padding-left: 17px;
    .item {
      border-left: 2px solid #cecece;
      height: 110px;
      position: relative;
      .status {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        left: -9px;
        top: 0;
        position: absolute;
      }
      .status-1 {
        background-color: #e99d42;
      }
      .status-2 {
        background-color: #0f40f5;
      }
      .status-3 {
        background-color: #81b337;
      }
      .content {
        position: absolute;
        background-color: #fff;
        border-radius: 6px;
        height: 98px;
        width: 92%;
        margin-left: 4%;
        top: -22px;
        padding: 19px 20px;
        box-sizing: border-box;
        .bottom-c {
          font-size: 12px;
          color: #9a9a9a;
          .time {
            color: #0f40f5;
          }
        }
        .progress {
          background-color: #efefef;
          border-radius: 4px;
          height: 3px;
          margin: 10px 0;
          position: relative;
          .progress-num {
            position: absolute;
            background-color: #e99d42;
            width: 80%;
            border-radius: 4px;
            height: 3px;
            left: 0;
          }
          .progress-num-1 {
            background-color: #0f40f5;
          }
        }
        .top-c {
          display: flex;
          .name-no {
            flex: 1;
            color: #101010;
            font-size: 16px;
            border-right: 1px solid #cecece;
          }
          .statistics {
            text-align: right;
            flex-basis: 100px;
            padding-left: 20px;
            .num-t {
              margin-left: 8px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .list-group-auto .item:last-child {
    height: 1px !important;
  }
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
  .tabbar {
    ::v-deep .u-tabbar {
      .u-tabbar--fixed {
        border-color: #cecece !important;
      }
      .u-tabbar-item {
        flex-direction: row;
        .u-tabbar-item__icon {
          width: auto;
          font-size: 14px;
        }
        .u-tabbar-item__text {
          font-size: 14px;
          margin-left: 10px;
          margin-top: 0;
        }
        &:nth-of-type(2) {
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 20%;
            left: 0;
            width: 1px;
            height: 60%;
            background: #cecece;
          }
          &::after {
            content: "";
            position: absolute;
            top: 20%;
            right: 0;
            width: 1px;
            height: 60%;
            background: #cecece;
          }
        }
      }
    }
  }
}
</style>