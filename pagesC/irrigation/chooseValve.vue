<template>
	<view class="valve-control-container">
    <view class="back-color">
        <view class="list-group">
          <view class="item" v-for="(item,index) in dataList" :key="index" @click="checkShow(item)">
            <view class="tit">
                <view class="left"> icon <text class="name-text">{{item.name}}</text></view>
                <view class="right"> icon <text class="num">{{item.num}}</text></view>
            </view>
            <view class="li-box" v-if="item.show">
              <view class="li" v-for="(list,i) in item.group" :key="i">
                <view class="li-1">
                  <image class="content-item-left-img" src="/static/images/common.jpg"></image>
                </view>
                <view class="li-2">
                  <view>
                    {{ list.plotName }}
                  </view>
                  <view class="text">
                    <text>icon</text><text>icon</text><text style="margin-left: 4px;">{{list.progress}}</text>%
                  </view>
                </view>
                <view class="li-3">
                  <u-radio-group
                    v-model="list.radiovalue1"
                    placement="row"
                    :key="i"
                  >
                    <u-radio
                      :activeColor="'#0F40F5'"
                      :customStyle="{marginRight: '20px'}"
                      v-for="(ob, obi) in groupArr"
                      :key="obi"
                      :label="ob.nameStatic"
                      :name="ob.nameStatic"
                      @change="() => radioChange(item,list,ob)"
                    >
                    </u-radio>
                  </u-radio-group>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="choose-list" :class="lookDetail?'look-detail':''">
          <view class="title">已选择  <text style="margin: 0 6px;" :class="chooseValve.length?'num-choose':''">{{ chooseValve.length }}</text> 台灌溉阀 <text class="look-chooose" @click="lookDetail=!lookDetail">{{lookDetail?'收起详情':'展开详情'}}</text> </view>
          <view v-show="lookDetail">
            <view class="list">
              <view class="li" v-for="(item,index) in chooseValve" :key="index">
                <view class="item-1"><image class="content-item-left-img" src="/static/images/common.jpg"></image></view>
                <view class="item-2">{{item.plotName}}</view>
                <view class="item-3">{{item.nameStatic}}</view>
                <view class="item-4">{{item.name}}</view>
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
        chooseValve:[],//选择的阀
        activeTabbar: 1,
        lookDetail:false,
        dataList:[
          {
            name:'默认地块',
            num:100,
            group:[
              {
                plotName:'13-1-2',
                radiovalue1:'',
                progress:86,
                id:'1'
              },
              {
                plotName:'13-1-3',
                radiovalue1:'',
                progress:55,
                id:'2'
              }
            ],
            show:true,
          },
          {
            name:'默认地块2',
            num:100,
            group:[
              {
                plotName:'14-1-2',
                radiovalue1:'',
                progress:86,
                id:'3'
              },
              {
                plotName:'14-1-3',
                radiovalue1:'',
                progress:55,
                id:'4'
              }
            ],
            show:false,
          },
          {
            name:'默认地块3',
            num:100,
            group:[
              {
                plotName:'15-1-2',
                radiovalue1:'',
                progress:86,
                id:'5'
              },
              {
                plotName:'15-1-3',
                radiovalue1:'',
                progress:55,
                id:'6'
              }
            ],
            show:false,
          }
        ],
        // 基本案列数据
        groupArr: [
          {
            nameStatic: 'A阀',
          },
            {
              nameStatic: 'B阀',
            }
          ],
          // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			}
		},
    onLoad() {
    },
		methods: {
      radioChange(item,list,obj){
        console.log(item,list,obj);
        let objTotal = {...item,...list,...obj};  //注意不要有相同name属性
        let chooseObj = this.chooseValve.find((item)=> item.id==objTotal.id);
        if(chooseObj==undefined){
          this.chooseValve.push(objTotal);
        }else if(chooseObj!==undefined){
          chooseObj.nameStatic = objTotal.nameStatic;
          chooseObj.id = objTotal.id;
        }
        console.log('最终',this.chooseValve)
      },
      checkShow(item){
        item.show = !item.show;
      },
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
  z-index: 1;
}
.list-group {
  .item {
    border-bottom: 1px solid #efefef;
    .content-item-left-img {
      width: 33px;
      height: 33px;
      border-radius: 100%;
      margin-right: 15px;
      position: relative;
      top: -1px;
    }
    .tit {
      display: flex;
      background-color: #fff;
      height: 60px;
      padding: 20px 18px;
      box-sizing: border-box;
      .left {
        flex: 1;

        .name-text {
          vertical-align: top;
          font-size: 14px;
          color: #4f4f4f;
          margin-left: 7px;
        }
      }
      .right {
        border-left: 1px solid #cecece;
        padding-left: 22px;
        .num {
          color: #0f40f5;
          margin-left: 8px;
          font-size: 14px;
        }
      }
    }
    .li-box {
      padding: 12px;
      .li {
        display: flex;
        background: #fff;
        height: 60px;
        border-radius: 6px;
        margin-bottom: 12px;
        padding: 14px 19px;
        box-sizing: border-box;
        padding-right: 0;
        .li-1 {
        }
        .li-2 {
          font-size: 16px;
          color: #4f4f4f;
          flex: 1;
          position: relative;
          top: -3px;
          .text {
            font-size: 12px;
            color: #81b337;
          }
        }
        .li-3 {
          padding-top: 7px;
        }
      }
    }
    .li-box .li:last-child {
      margin-bottom: 0;
    }
  }
}
.list-group .item:last-child {
  border-bottom: none;
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
      display: flex;
      box-sizing: border-box;
      border-radius: 6px;
      height: 60px;
      padding: 10px 13px;
      background-color: rgba(239, 239, 239, 1);
      margin-bottom: 12px;
      color: #666666;
      font-size: 16px;
      .item-1 {
        flex-basis: 33px;
        height: 40px;
        line-height: 40px;
      }
      .item-2 {
        height: 40px;
        line-height: 40px;
        flex: auto;
      }
      .item-4 {
        height: 40px;
        line-height: 40px;
        flex: auto;
        padding-left: 10px;
      }
      .item-3 {
        height: 20px;
        line-height: 20px;
        border-left: 1px solid #cecece;
        border-right: 1px solid #cecece;
        position: relative;
        top: 10px;
        padding: 0 20px;
      }
    }
    .content-item-left-img {
      width: 33px;
      height: 33px;
      border-radius: 100%;
      margin-right: 15px;
      position: relative;
      top: 4px;
    }
  }
}
</style>