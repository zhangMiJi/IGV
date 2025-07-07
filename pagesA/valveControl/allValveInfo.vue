<template>
	<view class="valve-info-container">
        <view class="top-box">
            <view style="display: flex;align-items: center;">
                <view class="input-box">
                    <view @click="handleOpenStartTimeModal">
                        <u-input
                            placeholder="请选择开始时间"
                            shape="circle"
                            v-model="startTime"
                            readonly
                        ></u-input>
                        <u-datetime-picker
                            :show="startTimeShow"
                            v-model="startTimeValue"
                            mode="datetime"
                            @cancel="handleCloseStartTimeModal"
                            @confirm="handleConfirmStartTime"
                        ></u-datetime-picker>
                    </view>
                    <view class="input-line"></view>
                    <view @click="handleOpenEndTimeModal">
                        <u-input
                            placeholder="请选择结束时间"
                            shape="circle"
                            v-model="endTime"
                            readonly
                        ></u-input>
                        <u-datetime-picker
                            :show="endTimeShow"
                            v-model="endTimeValue"
                            mode="datetime"
                            @cancel="handleCloseSEndimeModal"
                            @confirm="handleConfirmEndTime"
                        ></u-datetime-picker>
                    </view>
                </view>
                <view style="color: #fff; margin:0 8px 0 20px;">
                    <i class="iconfont" @click="handleSearch">&#xe712;</i>
                </view>
            </view>
            <!-- <u-calendar :show="show" mode="range" color="#81B337" @close="handleCloseDateModal" @confirm="handleConfirm"></u-calendar> -->
            <view class="operation-box" style="padding: 0 12px;">
                <view class="check-box">
                     <!-- uview官方推荐u-checkbox必须配合u-checkbox-group使用，否则控制台会报错 -->
                    <u-checkbox-group v-model="checkAll" @change="handleCheckAll">
                        <u-checkbox name="all" activeColor="#81B337" shape="circle" label="全选"></u-checkbox>
                    </u-checkbox-group>
                </view>
                <view class="btn-box">
                    <u-button type="primary" text="一键关阀" @click="handleOpenCloseValveModal"></u-button>
                    <u-button type="primary" text="批量控制" @click="handleOpenValveBatch"></u-button>
                </view>
            </view>
        </view>
        <view class="valve-content">
            <view v-for="(item, index) in list" class="valve-content-item">
                <view class="valve-content-item-title">
                    <u-checkbox-group v-model="item.ckeckStatus"  class="valve-content-item-title-left" @change="() => handleToogleCheckStatus(item)">
                        <u-checkbox name="checked" activeColor="#81B337" shape="circle" :label=item.locationName></u-checkbox>
                    </u-checkbox-group>
                    <view class="valve-content-item-title-right">
                        <!-- 信号大于75 -->
                        <i v-if="Number(item.signal)>75" class="iconfont orange" style="padding-right: 8px;">&#xe70b;</i>
                        <!-- 信号大于50 -->
                        <i v-else-if="Number(item.signal)>=50" class="iconfont orange" style="padding-right: 8px;">&#xe71b;</i>
                        <!-- 信号小于50 -->
                        <i v-else="Number(item.signal)<50" class="iconfont orange" style="padding-right: 8px;">&#xe71c;</i>
                        <i class="iconfont" 
                            :class="[
                            Number(item.batteryNum) >= 50 ? 'green' : 
                            Number(item.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                            style="padding-right: 4px;">&#xe70d;</i>
                        <text 
                            :class="[
                                Number(item.batteryNum) >= 50 ? 'green' : 
                                Number(item.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                           >{{item.batteryNum}}%</text>
                    </view>
                </view>
                <view class="valve-content-item-sup-title">
                    <i class="iconfont" style="padding-right: 2px;">&#xe719;</i>
                    <text style="padding-right: 6px;">{{item.date}}</text>
                    <text style="padding-right: 10px;">{{item.time}}</text>
                    <i class="iconfont" style="padding-right: 4px;">&#xe718;</i>
                    <text style="padding-right: 9px;">{{item.valveStatus}}</text>
                    <i class="iconfont" style="padding-right: 3px;">&#xe717;</i>
                    <text>{{item.mode}}</text>
                </view>
                <u-line color="#cecece"></u-line>
                <view class="valve-content-item-content">
                    <view class="valve-button-box">
                        <view :class="['valve-button', item.activeValve === 'A' ? 'active' : '']">
                            <view>{{item.leftValveName}}</view>
                            <view class="circle-dot"></view>
                        </view>
                        <view class="valve-teptcent">
                            <u-line-progress :percentage="50" activeColor="#81B337" :showText="false"></u-line-progress>
                            <text style="color: #81B337;">{{item.percentNum}}%</text>
                        </view>
                        <view :class="['valve-button', item.activeValve === 'B' ? 'active' : '']">
                            <view>{{item.rightValveName}}</view>
                            <view class="circle-dot"></view>
                        </view>
                    </view>
                    <view class="valve-content-item-content-bottom" @click="goDetail(item)">
                        <view class="valve-content-item-content-bottom-item">
                            <view>
                                <text>当前流量：</text>
                                <text>{{ item.currentFlow }}m³/h</text>
                            </view>
                            <view style="margin-top: 5px;">
                                <text>本次时长：</text>
                                <text>{{ item.currentDuration  }}h</text>
                            </view>
                        
                        </view>
                        <view class="valve-content-item-content-bottom-item">
                            <view style="margin-left: 20px;">
                                <text>剩余时长：</text>
                                <text>{{ item.remainDuration }}h</text>
                            </view>
                            <view style="margin-top: 5px;margin-left: 20px;">
                                <text>本次累计：</text>
                                <text>{{ item.allDuration  }}m³
                                </text>
                            </view>
                        </view>
                        <view class="arrow-right">
                            <i class="iconfont">&#xe711;</i>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 加载更多提示 -->
			<view v-if="loadingMore" class="loading-more">加载中...</view>
			<view v-else-if="noMoreData" class="no-more-data"><text class="icon-1">-</text><text style="padding: 0 5px;">没有更多了</text><text class="icon-1">-</text></view>
        </view>
        <u-popup :closeOnClickOverlay="false" :show="valveBatchShow">
            <view class="popup-container">
                <view class="popup-header">
                    <u-button type="primary" :plain="true" text="取消" @click="handleSettingCancel"></u-button>
                    <text>请设置</text>
                    <u-button type="primary" :plain="true" text="确定" @click="handleSettingCinfirm"></u-button>
                </view>
                <view class="popup-body">
                    <view class="popup-title">设置阀门工作参数</view>
                    <view class="popup-body-item">
                        <view class="popup-select-box">
                            <u-row  gutter="10">
                                <u-col span="4">
                                    <view class="popup-select-box-item">
                                        <text>选择阀门</text>
                                        <view>
                                            <view class="cover-container"  @click="handleShowValve1">
                                                <u-input
                                                    placeholder="请选择"
                                                    v-model="valve1"
                                                    suffixIcon="arrow-down"
                                                    :customStyle="{
                                                        borderColor: '#bbb',
                                                    }"
                                                    readonly
                                                >
                                                </u-input>
                                                <view class="cover-box"></view>
                                            </view>
                                            <u-action-sheet
                                                :show="showValve1"
                                                :actions="valveActions1"
                                                closeOnClickOverlay
                                                @close="showValve1 = false"
                                                @select="handleChangeValve1"
                                            >
                                            </u-action-sheet>
                                        </view>
                                    </view>
                                </u-col>
                                <u-col span="4">
                                    <view class="popup-select-box-item">
                                        <text>工作模式</text>
                                        <view>
                                            <view class="cover-container"  @click="handleShowValve2">
                                                <u-input
                                                    placeholder="请选择"
                                                    v-model="valve2"
                                                    suffixIcon="arrow-down"
                                                    :customStyle="{
                                                        borderColor: '#bbb',
                                                    }"
                                                    readonly
                                                >
                                                </u-input>
                                                <view class="cover-box"></view>
                                            </view>
                                            <u-action-sheet
                                                :show="showValve2"
                                                :actions="valveActions2"
                                                closeOnClickOverlay
                                                @close="showValve2 = false"
                                                @select="handleChangeValve2"
                                            >
                                            </u-action-sheet>
                                        </view>
                                    </view>
                                </u-col>
                                <u-col span="4">
                                    <view class="popup-select-box-item">
                                        <text>参数</text>
                                        <view>
                                            <view class="cover-container">
                                                <u-input
                                                    placeholder="请输入"
                                                    v-model="valve3"
                                                    :customStyle="{
                                                        borderColor: '#bbb',
                                                    }"
                                                    @confirm="handleChangeValve3"
                                                >
                                                </u-input>
                                                <!-- <view class="cover-box"></view> -->
                                            </view>
                                            <!-- <u-action-sheet
                                                :show="showValve3"
                                                :actions="valveActions3"
                                                closeOnClickOverlay
                                                @close="showValve3 = false"
                                                @select="handleChangeValve3"
                                            >
                                            </u-action-sheet> -->
                                        </view>
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                    </view>
                    <view class="popup-title">设置阀门结束参数</view>
                    <view class="popup-body-item">
                        <view>
                            <u-radio-group
                                v-model="valveSettingData.endParam"
                                shape="circle"
                                placement="row"
                                activeColor="#81B337"
                                @change="handleValveSetting"
                            >
                                <u-radio
                                    v-for="(item, index) in valveSettingList"
                                    :key="index"
                                    :label="item.name"
                                    :name="item.name"
                                >
                                </u-radio>
                            </u-radio-group>
                        </view>
                        <u-line color="#bbb"></u-line>
                        <view class="popup-body-item-input">
                            <u--input
                                placeholder="请输入阀门结束容量m³，如150m³，直接填写150即可"
                                v-model="valveSettingData.endNum"
                                :customStyle="{
                                    borderColor: '#bbb',
                                }"
                            ></u--input>
                        </view>
                    </view>
                </view>
            </view>
		</u-popup>
        <!-- 一键关阀弹窗 -->
		<CustomModal 
			:showModal="closeValveModalVisiable"
			title="一键关阀" 
            @cancel="handlecloseValveModal"
			@confirm="handlecloseValveCinfirm"
		>
			<view slot="content">
				<view class="modal-text">
					你确定要关闭所选的阀门吗？
				</view>
			</view>
		</CustomModal>
	</view>
</template>
<script>
	import CustomModal from '@/components/CustomModal/index';
	export default {
		data() {
			return {
                startTimeShow: false,
                startTimeValue: Number(new Date()),
                startTime: '',
                endTimeShow: false,
                endTimeValue: Number(new Date()),
                endTime: '',
				dateRange: '',
                show: false,
                checkAll: [],
                list: [], 
				page: 1, 
			    pageSize: 10, 
			    loadingMore: false, 
			    noMoreData: false,  
				mockObj: { //模拟的数据对象
					ckeckStatus: [],
					locationName: '名字不超过8个字',
					signal: '90',
					batteryNum: '98',
					date: '2024-05-15',
					time: '12:45:56',
					valveStatus: '运行中',
					mode: '开度',
					leftValveName: 'A阀',
					rightValveName: 'B阀',
					activeValve: 'A',
					percentNum: '50',
					currentFlow: '3',
					remainDuration: '0.5',
					currentDuration: '3',
					allDuration: '50'
				},
                valveBatchShow: false,
                closeValveModalVisiable: false,
                valveSettingData: {
                    endParam: [],
                    endNum: ''
                },
                valve1: '',
                showValve1: false,
                valveActions1: [
                    {
                        name: 'A阀',
                    },
                    {
                        name: 'B阀',
                    }
                ],
                valve2: '',
                showValve2: false,
                valveActions2: [
                    {
                        name: '开度模式%',
                    },
                    {
                        name: '流量模式m³/h',
                    }
                ],
                valve3: '',
                showValve3: false,
                valveActions3: Array.from({ length: 101 }, (_, i) => {
                    return {
                        name: 100 - i, // 从100开始倒序生成
                    };
                }),
                valveSettingList: [
                    {
                        name: '定时结束',
                    },
                    {
                        name: '定量结束',
                    },
                    {
                        name: '手动结束',
                    },
                ]
			}
		},
        components: {
			CustomModal
		},
        onLoad(options) {
            // 上一个页面的地块信息
            const valveInfo = JSON.parse(options.valveInfo);
            // uni.setNavigationBarTitle({
            //     title: valveInfo.locationName
            // });
        },
        mounted() {
		   this.loadData();
		},
		onPullDownRefresh() {
            console.log('开始下拉刷新');
            this.loadData(true); 
        },
        onReachBottom() {
            if (!this.noMoreData && !this.loadingMore) {
                console.log('触底，开始加载更多数据');
                this.page++;
                this.loadData();
            }
        },
		methods: {
            loadData(isRefresh = false) {
			  if (isRefresh) {
				this.page = 1; 
				this.noMoreData = false;
			  }
		
			  this.loadingMore = true;
		
			  setTimeout(() => {
				const newData = [];
				for (let i = 0; i < this.pageSize; i++) {
				  const newItemIndex = (this.page - 1) * this.pageSize + i;
				  if (newItemIndex >= 20) { 
					this.noMoreData = true;
					break;
				  }
				  newData.push(this.mockObj);
				}
		
				if (isRefresh) {
				  this.list = newData;
				} else {
				  this.list = this.list.concat(newData);
				}
		
				this.loadingMore = false;
				if (!isRefresh) {
				  uni.stopPullDownRefresh(); 
				}
			  }, 1000);
			},

            handleOpenStartTimeModal() {
                this.startTimeShow = true;
            },

            handleCloseStartTimeModal() {
                this.startTimeShow = false;
            },

            handleConfirmStartTime(e) {
                const value = e.value;
                this.startTimeValue = value
                const timeFormat = uni.$u.timeFormat
                const formatValue = timeFormat(value, 'yyyy-mm-dd hh:MM')
                this.startTimeShow = false;
                this.startTime = formatValue;
            },

            handleOpenEndTimeModal() {
                this.endTimeShow = true;
            },

            handleCloseSEndimeModal() {
                this.endTimeShow = false;
            },

            handleConfirmEndTime(e) {
                const value = e.value;
                this.endTimeValue = value
                const timeFormat = uni.$u.timeFormat
                const formatValue = timeFormat(value, 'yyyy-mm-dd hh:MM')
                this.endTimeShow = false;
                this.endTime = formatValue;
            },

            handleSearch() {
                console.log('搜索');
            },

            // 选择时间
			handleConfirm(value) {
                this.show = false;
                if(Array.isArray(value)&&value.length>0) {
                    const startDate = value[0];
                    const endDate = value[value.length - 1];
                    this.dateRange = `${startDate} 至 ${endDate}`;
                }else {
                    this.dateRange = '';
                }
            },

            // 全选
            handleCheckAll(value) {
                this.checkAll = value;
                if(value.length>0) {
                    this.valveData.forEach(item => {
                        item.ckeckStatus = ['checked'];
                    });
                }else {
                    this.valveData.forEach(item => {
                        item.ckeckStatus = [];
                    });
                }
            },

            // 打开一键关阀弹窗
            handleOpenCloseValveModal() {
                this.closeValveModalVisiable = true;
            },

            // 关闭一键关阀弹窗
            handlecloseValveModal() {
                this.closeValveModalVisiable = false;
            },

            // 确认一键关阀
            handlecloseValveCinfirm() {
                this.closeValveModalVisiable = false;
            },

            // 切换选中状态
            handleToogleCheckStatus(item) {
                if(item.ckeckStatus.length === 0) {
                    item.ckeckStatus = ['checked'];
                }else {
                    item.ckeckStatus = [];
                }
            },

            // 打开批量控制
            handleOpenValveBatch() {
                this.valveBatchShow = true;
            },

            // 关闭设置
            handleSettingCancel() {
                this.valveBatchShow = false;
            },

            // 确认设置
            handleSettingCinfirm() {
                this.valveBatchShow = false;
            },

            // 批量控制参数设置
            handleValveSetting(value) {
                this.$set(this.valveSettingData, 'endParam', value);
                console.log('value', this.valveSettingData);
            },

            // 详情页面
            goDetail(item){
				console.log(item);
				uni.navigateTo({
					url: '/pagesA/valveControl/valveSet'
				});
			},

            handleShowValve1() {
                this.showValve1 = true;
            },

            handleChangeValve1(action) {
                this.valve1 = action.name;
                this.showValve1 = false;
            },

            handleShowValve2() {
                this.showValve2 = true;
            },

            handleChangeValve2(action) {
                this.valve2 = action.name;
                this.showValve2 = false;
            },

            handleShowValve3() {
                this.showValve3 = true;
            },

            handleChangeValve3(action) {
                this.valve3 = action.name;
            },

            handleValveSetting(value) {
                this.$set(this.valveSettingData, 'endParam', value);
                console.log('value', this.valveSettingData);
            },
		}
	}
</script>

<style lang="scss" scoped>
	.loading-more, .no-more-data {
	  font-size: 14px;
	  text-align: center;
      padding: 20px 0 40px 0;
	  color: rgba(154,154,154,1);
	  .icon-1{
		  font-size: 18px;
	  }
	}
    .valve-info-container {
        height: 100vh;
        background-color: #F8F8F8;
        .top-box {
            padding: 12px;
            background: $u-main-color;
            .input-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: $u-dark-color;
                border-radius: 20px;
                ::v-deep .u-input {
                    // background: $u-dark-color;
                    border: none;
                    &__content__field-wrapper__field  {
                        color: #fff !important;
                    }
                }
                i {
                    color: #fff;
                    padding-left: 26px;
                }
                .input-line {
                    width: 20px;
                    height: 1px;
                    background: #fff;
                    // border: 1px solid #fff;
                }
            }
            .operation-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                .check-box {
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 14px;
                    ::v-deep .u-checkbox {
                        &__icon-wrap {
                            border-color: #fff !important;
                        }
                        text {
                            color: #fff !important;
                            font-size: 16px !important;
                        }
                    }
                }
                .btn-box {
                    display: flex;
                    ::v-deep .u-button {
                        height: 32px !important;
                        color: #fff;
                        border-color: #fff;
                        background: $u-main-color;
                        border-radius: 20px;
                        font-size: 12px !important;
                        &+ .u-button {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .init-box {
            margin: 100px 0;
            ::v-deep .u-button {
                width: 120px !important;
                padding: 5px 12px !important;
                border-radius: 4px;
            }
        }
        .valve-content {
            background: #f5f5f5;
            &-item {
                &+ .valve-content-item {
                    margin-top: 10px;
                }
                background: #fff;
                padding: 18px 24px;
                &-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    ::v-deep .u-checkbox {
                        &>text {
                            font-size: 16px !important;
                            color: #4f4f4f !important;
                            font-weight: 600;
                            line-height: 20px !important;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 130px;
                        }
                    }
                    &-right {
                        display: flex;
                        align-items: center;
                        .red {
                            color: #BD3124;
                        }
                       .orange {
                            color: #ff9900;
                        }
                       .green {
                            color: $u-main-color;
                        }
                    }
                }
                &-sup-title {
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    color: #9a9a9a;
                    font-size: 14px;
                }
                &-content {
                    margin-top: 10px;
                    .valve-button-box {
                        display: flex;
                        margin-bottom: 8px;
                        .valve-button {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 48px;
                            height: 22px;
                            line-height: 22px;
                            padding: 5px 10px;
                            border-radius: 18px;    
                            background: #efefef; 
                            ::v-deep u-button {
                                text-align: center;
                                font-size: 16px;
                                font-weight: 600;
                                color: #4f4f4f;
                            }
                            .circle-dot {
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: #bebebe;
                            }
                            &.active {
                                color: #fff;
                                background: $u-main-color; 
                                .circle-dot {
                                    background: #fff;
                                }
                            }   
                        }
                        .valve-teptcent {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            padding: 0 10%;
                            ::v-deep .u-line-progress {
                                margin-right: 10px;
                                .u-line-progress__background {
                                    height: 6px !important;
                                }
                                .u-line-progress__line {
                                    height: 6px !important;
                                }
                            }
                        }
                    }
                    &-bottom {
                        display: flex;
                        font-size: 14px;
                        color: #4f4f4f;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }
		.modal-text {
			display: block;
			font-size: 14px;
			margin-top: 10px;
			text-align: center;
            color: #000;
		}
        .popup-container {
            margin-bottom: 35px;
            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 17px;
                color: #fff;
                background: $u-main-color;
                text {
                    margin: auto;
                }
                ::v-deep .u-button {
                    width: 80px;
                    height: 32px !important;
                    font-size: 16px;
                    color: #fff;
                    border-color: #fff;
                    background: $u-main-color;
                    border-radius: 20px;
                    font-size: 12px !important;
                    margin: 0;
                    &+ .u-button {
                        margin-left: 10px;
                    }
                }
            }
            .popup-body-item {
                padding: 0 15px;
                ::v-deep .u-checkbox {
                    &> text {
                        color: #333 !important;
                        font-size: 14px !important;
                    }
                }
                ::v-deep .u-checkbox-group {
                    justify-content: space-around;
                    padding: 20px 0;
                }
                &-input {
                    margin-top: 13px;
                }

                ::v-deep .u-radio-group {
                    justify-content: space-around;
                    padding: 20px 0;
                }
            }
            .popup-title {
                height: 40px;
                line-height: 40px;
                background: #efefef;
                color: #333;
                font-size: 16px;
                text-align: center;
            }
            .popup-select-box {
                margin: 10px 10px 40px 10px;
                &-item {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    text {
                        font-size: 14px;
                        color: #101010;
                        padding-bottom: 10px;
                    }
                    .cover-container {
                        position: relative;
                        .cover-box {
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 10;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            ::v-deep .u-border {
                border-color: #bbb !important
            }
            ::v-deep .u-action-sheet__item-wrap__item__name {
                color: #333 !important;
            }
        }
    }
    ::v-deep .u-picker {
        .u-toolbar__wrapper__confirm {
            color: $u-main-color !important;
        }
        .u-picker__view__column__item {
            color: #333 !important;
        }
    }
</style>