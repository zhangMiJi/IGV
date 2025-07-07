<template>
	<view class="valve-control-container">
    <view class="title-lg">
              <view class="item" @click="handleCheckTab(item.id)" :class="activTopIrrigation==item.id?'item-act':''" v-for="(item,index) in irrigationTab" :key="index">{{item.name}}</view>
              <view class="item-add" @click="addGroup">+</view>
    </view>
    <view class="back-color">
      <view class="no-content" v-if="!isNoData">
          <view class='text-c'>
            <view>您还未创建灌溉组或自动轮灌！</view>
            <view class="text-2">请点击右上角的 <text class="add-icon">+</text> 图标新建灌溉组或自动轮灌
            </view>    
          </view>
          <view class='text-c'>
            <view>您还未创建灌溉组！</view>
            <view class="text-2">请点击右上角的 <text class="add-icon">+</text> 图标新建灌溉组
            </view>    
          </view>
          <view class='text-c'>
            <view>您还未创建自动轮灌！</view>
            <view class="text-2">请点击右上角的 <text class="add-icon">+</text> 图标新建自动轮灌
            </view>    
          </view>
      </view>
      <view v-else class="page-data">
        <view class="list" @click="goListDetail" v-for="(list,index) of ListData" :key="index">
          <view class="left">icon</view>
          <view class="right">
            <view class="name">{{list.name}}</view>
            <view class="dec"><text>{{list.decText}}： <text class="num">{{list.num}}</text> 台  |  运行中/空闲中</text></view>
          </view>
          <text class="more">icon</text>
        </view>
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
                isNoData:true,
                ListData:[
                  {
                    name:'灌溉组025',
                    decText:'灌溉组数量',
                    statusText:'运行中',
                    id:0,
                    num:12,
                    type:'0',
                  },
                  {
                    name:'自动轮灌001',
                    decText:'灌溉组数量',
                    statusText:'空闲中',
                    id:1,
                    num:12,
                    type:'1',
                  }
                 
                ],
                activTopIrrigation:2,
                irrigationTab:[
                  {name:'轮灌',id:0},
                  {name:'灌溉组',id:1},
                  {name:'全部',id:2}
                ]
			}
		},
        onLoad() {
            
            
        },
		methods: {
        handleCheckTab(id) {
                this.activTopIrrigation = id;
            },
            addGroup() {
                console.log('添加');
            },

            handleNavigateTo(valveInfo) {
                console.log(valveInfo.locationName);
                uni.navigateTo({
                    url: '/pagesA/valveControl/valveInfo?valveInfo=' + JSON.stringify(valveInfo),
                });
            },

            handleTabbarChange(name) {
                if(name === 0) {
                    uni.reLaunch({
						url: '/pages/index/index'
					});
                }else if(name === 2) {
                    uni.navigateTo({
						url: '/pagesC/equipManage/index'
					});
                }
            }

		}
	}
</script>

<style lang="scss" scoped>
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
  .back-color {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(246, 246, 246, 1);
    z-index: -1;
  }
  .title-lg {
    position: fixed;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    display: flex;
    text-align: center;
    height: 64px;
    padding: 12px 20px 0 20px;
    background-color: rgba(15, 64, 245, 1);
    .item {
      height: 40px;
      line-height: 40px;
      padding: 0 19px;
      border-radius: 20px;
      border: 1px solid rgba(248, 248, 248, 1);
      margin-right: 12px;
      color: rgba(248, 248, 248, 1);
      font-size: 14px;
    }
    .item-add {
      width: 40px;
      height: 40px;
      line-height: 40px;
      color: rgba(248, 248, 248, 1);
      margin-left: auto;
      border-radius: 100%;
      border: 1px solid rgba(255, 255, 255, 1);
    }
    .item-act {
      background-color: #fff;
      color: rgba(15, 64, 245, 1);
    }
  }
  .no-content {
    color: rgba(154, 154, 154, 1);
    font-size: 18px;
    text-align: center;
    .text-c {
      padding-top: 90px;
    }
    .add-icon {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(15, 64, 245, 1);
      margin: 0 10px;
      font-size: 22px;
      color: rgba(15, 64, 245, 1);
      border-radius: 100%;
    }
    .text-2 {
      padding-top: 10px;
      font-size: 14px;
    }
  }
  .page-data {
    padding: 84px 15px 0 15px;
    .list {
      margin-bottom: 12px;
      position: relative;
      display: flex;
      border-radius: 6px;
      padding: 15px 9px;
      background-color: rgba(255, 255, 255, 1);
      .left {
        flex-basis: 40px;
        margin-right: 11px;
      }
      .right {
        flex: 1;
        .name {
          color: rgba(79, 79, 79, 1);
          font-size: 16px;
          margin-bottom: 3px;
        }
        .dec {
          color: rgba(154, 154, 154, 1);
          font-size: 12px;
          .num {
            color: rgba(15, 64, 245, 1);
          }
        }
      }
      .more {
        position: absolute;
        right: 20px;
      }
    }
  }
}
</style>