<template>
	<view class="valve-control-container">
      <view class="group-irrigation">
        <view class="left">
          <view class="item">
            <view class="text-1">灌溉状态</view>
            <view class="text-2">空闲中/运行中</view>
          </view>
        </view>
        <view class="right">
          <view class="item">
            <view class="text-1">灌溉阀状态</view>
            <view class="text-2">A <text class="num num1">12</text> B <text class="num num2">2</text> </view>
          </view>
        </view>
      </view>
      <view class="back-color">
        <div style="padding: 0 15px;">
            <view class="list-group">
              <view class="item" v-for="(list ,index) in dataList" :key="index">
                <view class="li-1">
                  <image class="content-item-left-img" src="/static/images/common.jpg"></image>
                </view>
                <view class="li-2">
                  <view class="top">
                    <text class="no">{{list.no}}</text><text class="name-2">{{list.name}}</text>
                  </view>
                  <view class="bottom">
                    <text>icon</text><text class="name">{{list.text}}</text>
                  </view>
                </view>
                <view class="li-3"><text>{{list.num1}}</text><text style="color: #101010;margin: 0 6px;"> / </text><text>{{list.num2}}</text></view>
                <view class="li-4">操作</view>
            </view>
          </view>
        </div>
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
            name:'A阀',
            id:0,
            no:'13-1-1',
            text:'这里是地块名称',
            num1:3.2,
            num2:'80%'
          },
          {
            name:'A阀',
            id:0,
            no:'13-1-1',
            text:'这里是地块名称',
            num1:3.2,
            num2:'80%'
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
.list-group {
  margin-top: 90px;
  .item {
    border-radius: 6px;
    margin-top: 12px;
    background-color: #fff;
    height: 60px;
    display: flex;
    .li-1 {
      box-sizing: border-box;
      padding: 0 13px;
      flex-basis: 60px;
      .content-item-left-img {
        width: 33px;
        height: 33px;
        border-radius: 100%;
        padding-top: 13px;
      }
    }
    .li-2 {
      box-sizing: border-box;
      padding-top: 10px;
      flex: 1;
      font-size: 16px;
      color: #101010;
      .top {
        .name-2 {
          border-left: 1px solid #cecece;
          padding-left: 10px;
        }
        .no {
          padding-right: 10px;
        }
      }
      .bottom {
        margin-top: 6px;
        font-size: 12px;
        color: #9a9a9a;
        .name {
          margin-left: 4px;
        }
      }
    }
    .li-3 {
      box-sizing: border-box;
      flex-basis: 80px;
      text-align: center;
      color: #0f40f5;
      line-height: 60px;
      margin-right: 20px;
    }
    .li-4 {
      box-sizing: border-box;
      flex-basis: 40px;
      padding-right: 10px;
      text-align: center;
      color: #0f40f5;
      font-size: 14px;
      line-height: 60px;
    }
  }
}
.group-irrigation {
  box-sizing: border-box;
  height: 70px;
  background-color: #fff;
  position: fixed;
  padding: 13px 0;
  top: 0;
  display: flex;
  width: 100%;
  .left,
  .right {
    padding-left: 20px;
    text-align: left;
    flex: 1;
    .text-1 {
      font-size: 14px;
      color: #666;
      margin-bottom: 3px;
    }
    .num {
      margin-left: 10px;
    }
  }
  .left .item {
    border-right: 1px solid #cecece;
    .text-2 {
      color: #0f40f5;
      font-size: 16px;
    }
  }
  .right .item {
    .num {
      color: #0f40f5;
    }
    .num1 {
      margin-right: 30px;
    }
  }
}
.back-color {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 1);
  z-index: -1;
}
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