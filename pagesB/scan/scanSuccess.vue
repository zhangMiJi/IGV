<template>
	<view class="scan-container">
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

		<view class="scan-result">
			<view class="scan-content">
				<text class="scan-content-title">名称不超过8个字</text>
				<view class="scan-content-item">
					<view class="scan-content-item-left">
						<view class="scan-content-item-left-item">
							<i class="iconfont" style="padding-right: 8px">&#xe70b;</i>
							<i class="iconfont" style="padding-right: 4px">&#xe70d;</i>
							<text style="padding-right: 10px">{{batteryNum}}%</text>
							<i class="iconfont" style="padding-right: 10px">&#xe70c;</i>
							<text>{{code}}</text>
						</view>
						<view class="scan-content-item-left-item">
							<i class="iconfont" style="padding-right: 8px">&#xe70e;</i>
							<view class="remark-content">{{ remark }}</view>
						</view>
						<view class="scan-content-item-left-item">
							<i class="iconfont" style="padding-right: 4px">&#xe70f;</i>
							<text>{{ location }}</text>
						</view>
					</view>
					<view class="scan-content-item-right">
						<i class="iconfont" >&#xe711;</i>
					</view>
				</view>
				<u-button type="primary" :plain="true" text="编辑设备信息" @click="handleEdit"></u-button>
			</view>
			<u-line color="#efefef"></u-line>
			<view class="scan-content">
                <view class="scan-content-item">
                    <view class="valve-button active">
                    <view>A阀</view>
                    <view class="circle-dot"></view>
                </view>
                <view class="valve-teptcent">
                    <u-line-progress :percentage="50" activeColor="#81B337" :showText="false"></u-line-progress>
                    <text style="color: #81B337;">{{percentNum}}%</text>
                </view>
                <view class="valve-button">
                    <view>B阀</view>
                    <view class="circle-dot"></view>
                </view>
                </view>
				<view class="scan-content-item">
					<view class="scan-content-item-bottom">
						<view class="scan-content-item-bottom-item">
							<view>
								<text>当前流量：</text>
								<text>{{ valveInfo.currentFlow }}m³/h</text>
							</view>
							<view style="margin-top: 5px;">
								<text>本次时长：</text>
								<text>{{ valveInfo.currentDuration  }}h</text>
							</view>
						
						</view>
						<view class="scan-content-item-bottom-item">
							<view style="margin-left: 20px;">
								<text>剩余时长：</text>
								<text>{{ valveInfo.remainDuration }}h</text>
							</view>
							<view style="margin-top: 5px;margin-left: 20px;">
								<text>本次累计：</text>
								<text>{{ valveInfo.allDuration  }}m³
								</text>
							</view>
						</view>
					</view>
					<view class="scan-content-item-right">
						<i class="iconfont" >&#xe711;</i>
					</view>
				</view>
				<u-button type="primary" :plain="true" text="控制阀门" @click="handleControlValve"></u-button>
			</view>
		</view>
	</view>
</template>
<script>
	import { ScanCode } from '@/utils/index'
	export default {
		data() {
			return {
				scanResult: null,
				scanValue: '',
				batteryNum: '98',
				code: 864452060202551,
				remark: '18365978466，隔壁老樊，18657908864',
				location: '西地块',
				valveInfo: {
					currentFlow: '3',
					remainDuration: '0.5',
					currentDuration: '3',
					allDuration: '50'
				},
                percentNum: '50'
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			if(eventChannel) {
				eventChannel.on('scanEvent', function(data) {
					this.scanResult = data
					console.log(this.scanResult);
					
				})
			}

		},
		methods: {
			// 编辑设备信息
			handleEdit() {

			},

			// 控制阀门
			handleControlValve() {},

			handleScanChange(val) {
				this.scanValue = val
				console.log('val', val);
			},

			handleSearch() {
				
			},

			async handleScan() {
				try {
					const scanResult = await ScanCode()
					console.log('scanResult', scanResult);
				}catch(error) {
					console.log('error', error);
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scan-container {
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
				color: #fff;
				padding-left: 26px;
				padding-right: 18px;
                font-size: 20px;
			}
		}
		.scan-result {
			.scan-content {
				padding: 20px 25px;
				&-title {
					display: block;
					color: #4F4F4F;
					margin-bottom: 10px;
                    font-weight: 600;
				}
				&-item {
					display: flex;
					align-items: center;
					margin-bottom: 24px;
					&-left {
						flex: 1;
						&-item {
							display: flex;
							align-items: center;
							font-size: 14px;
							color: #bebebe;
							margin-top: 4px;
							.remark-content {
								position: relative;
								display: blcok;
								flex: 1;
								overflow: hidden;
								white-space: nowrap; 
								text-overflow: ellipsis;
							}
						}
					}
					&-right {
						width: 20px;
						color: #bebebe;
					}
					&-bottom {
						display: flex;
						flex: 1;
						&-item {
							font-size: 14px;
							color: #4f4f4f;
						}
					}
					
				}
			}
		}
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
</style>