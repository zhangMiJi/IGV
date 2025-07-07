<template>
	<view class="valve-info-container">
        <view class="sacn-input-box">
            <u-input
				placeholder="请输入设备IMEI码"
				shape="circle"
				v-model="scanValue"
				@change="handleScanChange"
			>
			<template slot="suffix">
				<i class="iconfont" style="color: #fff;" @click="handleScan">&#xe713;</i>
			</template>
			</u-input>
			<view>
				<i class="iconfont" @click="handleSearch">&#xe712;</i>
			</view>
		</view>
        <view class="valve-content">
            <view class="valve-content-item">
                <view class="valve-content-item-title">
                    <view class="valve-content-item-title-left">
                        <image class="content-item-left-img" src="/static/images/common.jpg"></image>
                        <view style="font-weight: 600;">{{valveData.locationName}}</view>
                    </view>
                    <view class="valve-content-item-title-right">
                        <i class="iconfont orange" style="padding-right: 8px;">&#xe70b;</i>
                        <i class="iconfont" 
                            :class="[
                            Number(valveData.batteryNum) >= 50 ? 'green' : 
                            Number(valveData.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                            style="padding-right: 4px;">&#xe70d;</i>
                        <text 
                            :class="[
                                Number(valveData.batteryNum) >= 50 ? 'green' : 
                                Number(valveData.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                        >{{valveData.batteryNum}}%</text>
                    </view>
                </view>
                <view class="valve-content-item-sup-title">
                    <i class="iconfont" style="padding-right: 2px;">&#xe719;</i>
                    <text style="padding-right: 6px;">{{valveData.date}}</text>
                    <text style="padding-right: 10px;">{{valveData.time}}</text>
                    <i class="iconfont" style="padding-right: 4px;">&#xe718;</i>
                    <text style="padding-right: 9px;">{{valveData.valveStatus}}</text>
                    <i class="iconfont" style="padding-right: 3px;">&#xe717;</i>
                    <text>{{valveData.mode}}</text>
                </view>
				<view class="valve-content-item-sup-title">
				    <i class="iconfont" style="padding-right: 3px;">&#xe70c;</i>
				    <text>{{valveData.no}}</text>
				</view>
				<u-line color="#cecece"></u-line>
            </view>
			<view class="flex-content">
			    <view class="li">
			    	<text>本次累计：</text>{{'50m³'}}
			    </view>
				<view class="li">
					<text>当前开度：</text>{{'30%'}}
				</view>
				<view class="li">
					<text>总累积量：</text>{{'150m³'}}
				</view>
				<view class="li">
					<text>当前流量：</text>{{'3m³/h'}}
				</view>
				<view class="li">
					<text>剩余时长：</text>{{'30min'}}
				</view>
				<view class="li">
					<text>本次时长：</text>{{'3h'}}
				</view>
			</view>
			<view class="img-list">
				<view class="left" @click="checkValveFn(0)">
					<text style="font-weight: 600;">B阀</text>
					<i class="icon1" :class="!actIndex?'act-icon1':''"></i>
				</view>
				<view class="right" @click="checkValveFn(1)">
					<text style="font-weight: 600;">A阀</text>
					<i class="icon1" :class="actIndex?'act-icon1':''"></i>
				</view>
				<image mode="scaleToFill" style="width: 100%;;" :src="valvePic[actIndex]"></image>
			</view>
			<view class="operate_list">
				<view class="item">
					<text class="btn btn-1">刷新数据</text>
					<text class="btn btn-2" @click="handleOpenSetting">设置</text>
					<text class="btn btn-3" @click="handleOpenCloseValveModal">关阀</text>
				</view>
			</view>
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
                                            <view class="cover-container" >
                                                <u-input
                                                    placeholder="请输入"
                                                    v-model="valve3"
                                                    :customStyle="{
                                                        borderColor: '#bbb',
                                                    }"
                                                    @click="handleShowValve3"
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
					你确定要关闭此阀门吗？
				</view>
			</view>
		</CustomModal>
	</view>
</template>
<script>
	import CustomModal from '@/components/CustomModal/index';
	import { ScanCode } from '@/utils/index'
	export default {
		data() {
			return {
                valveData: 
                    {
                        locationName: '名字不超过8个字',
                        batteryNum: '98',
                        date: '2024-05-15',
                        time: '12:45:56',
                        valveStatus: '运行中',
                        mode: '开度',
						no:864452060202551
                    },
				actIndex:1,
				valvePic:[
					'/static/images/a-valve.gif',
					'/static/images/b-valve.gif'
				],
                valveBatchShow: false,
                closeValveModalVisiable: false,
                valveSettingData: {
                    endParam: '',
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
                        name: i,
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
                ],
                closeValveModalVisiable: false,

			}
		},
        components: {
			CustomModal
		},
        onLoad(options) {
            
        },
		methods: {
            handleScanChange(val) {
				this.scanValue = val
				console.log('val', val);
			},

			handleSearch() {
				
			},

			async handleScan() {
				try {
					const scanResult = await ScanCode()
					uni.navigateTo({
						url: '/pagesB/scan/scanSuccess',
						success: function(res) {
							res.eventChannel.emit('scanEvent', {
								data: scanResult
							})
						}
					});
				}catch(error) {
                    this.$forceUpdate();
				}
			},

            checkValveFn(value){
                if(value!==this.actIndex){
                    this.actIndex = value;
                }
            },
            // 打开设置
            handleOpenSetting() {
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
                this.showValve3 = false;
            },

            handleValveSetting(value) {
                this.$set(this.valveSettingData, 'endParam', value);
                console.log('value', this.valveSettingData);
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
		}
	}
</script>

<style lang="scss" scoped>
    .valve-info-container {
        .sacn-input-box {
			display: flex;
			align-items: center;
			padding: 12px;
			background: $u-main-color;
			::v-deep .u-input {
				flex: 1;
				background: $u-dark-color;
				border: none;
				&__content__field-wrapper__field  {
					color: #fff !important;
				}
			}
			i {
                font-size: 20px;
				color: #fff;
				padding-left: 20px;
				padding-right: 16px;
			}
		}
        .valve-content {
            background: #f5f5f5;
            &-item {
                &+ .valve-content-item {
                    margin-top: 10px;
                }
                background: #fff;
                padding: 18px 24px 5px 24px;
                &-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    ::v-deep .u-checkbox {
                        text {
                            font-size: 18px;
                            color: #4f4f4f;
                            font-weight: 600;
                        }
                    }
                    &-left {
                        display: flex;
                        align-items: center;
                        .content-item-left-img {
                            display: block;
                            width: 28px;
                            height: 28px;
                            margin-right: 6px;
                        }
                    }
                    &-right {
                        display: flex;
                        align-items: center;
                        .red {
                            color: #ff0000;
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
		.flex-content {
			background: #fff;
			padding: 0 12px;
			display: flex;
			flex-wrap: wrap;
			.li{
				font-size: 14px;
				padding: 5px 0;
				color: #333;
				border-radius: 5px;
				background-color: #EFEFEF;
				padding-left: 12px;
				flex: 1 1 calc(50% - 24px); /* 每个项目占据50%的宽度减去间距 */
				margin: 5px 12px; /* 设置外边距来创建间距 */
				box-sizing: border-box; /* 确保padding和border包含在元素的总宽度内 */
			}
		}
		.img-list{
			font-size: 0;
			position: relative;
			background-color: #fff;
			.icon1{
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 100%;
				background-color: #bebebe;
				margin-left: 10px;
				position: relative;
				top: -1px;
			}
			.act-icon1{
				background-color: #81B337!important;
			}
			.left{
				position: absolute;
				top: 66px;
				left:12%;
				font-size: 18px;
			}
			.right{
				position: absolute;
				top: 66px;
				right:12%;
				font-size: 18px;
			}
		}
		.operate_list{
			background-color: #fff;
			padding-top: 8px;
			.item{
				padding:0 24px 0 24px;
				.btn{
					display: inline-block;
					margin-bottom: 12px;
					text-align: center;
					font-size: 14px;
					height: 42px;
					line-height: 42px;
					width: 100%;
					border-radius: 4px;
				}
				.btn-1{
					height: 40px;
					line-height: 40px;
					color: #81B337;
					border: 1px solid rgba(129,179,55,1);
					background-color: #EEE;
				}
				.btn-2{
					color: #fff;
					background-color: #81B337;
				}
				.btn-3{
					color: #fff;
					background-color: #9A9A9A;
				}
			}
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
        .modal-text {
			display: block;
			font-size: 14px;
			margin-top: 10px;
			text-align: center;
            color: #000;
		}
    }
</style>