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

        <view class="scan-no-result">
            <i class="iconfont">&#xe71a;</i>
            <view class="scan-result-message">非常抱歉！该设备还未绑定。</view>
            <view class="scan-result-tip">请前往【设备管理中扫码添加设备】</view>
        </view>
		<view class="scan-guide">
			<view class="scan-guide-item">
				<text class="scan-guide-item-text">操作步骤如下</text>
			</view>
			<view class="scan-guide-item">
				<image class="scan-guide-item-image first" src="/static/images/scan-step_01.jpg"></image>
				<text class="scan-guide-item-text">第一步</text>
				<text class="scan-guide-item-text">点击【设备管理】，进入到设备管理页面</text>
			</view>
			<view class="scan-guide-item">
				<image class="scan-guide-item-image second" src="/static/images/scan-step_02.jpg"></image>
				<text class="scan-guide-item-text">第二步</text>
				<text class="scan-guide-item-text">点击【扫码输入框】，然后扫描设备上的条形码</text>
			</view>
			<view class="scan-guide-item">
				<image class="scan-guide-item-image third" src="/static/images/scan-step_03.jpg"></image>
				<text class="scan-guide-item-text">第三步</text>
				<text class="scan-guide-item-text">在弹出的窗口内，填写设备信息并点击确定即可完成添加</text>
				<text class="scan-guide-item-text">备注：设备所属地块，为设备安装地址信息，</text>
				<text class="scan-guide-item-text">方便后续根据地块分组管理设备。</text>
				<text class="scan-guide-item-text">设备名称：为设备命名，方便后续查找</text>
			</view>
		</view>
	</view>
</template>
<script>
	import { ScanCode } from '@/utils/index'
	export default {
		data() {
			return {
				scanValue: '',
			}
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
			}
		}
		.scan-no-result {
			margin-top: 40px;
			margin-bottom: 50px;
			text-align: center;
			.iconfont {
				display: block;
				font-size: 40px;
				color: #E99D42;
				margin-bottom: 30px;
			}
			.scan-result-message {
				font-size: 18px;
				color: #101010;
				margin-bottom: 19px;
			}
			.scan-result-tip {
				font-size: 18px;
				color: #E99D42;
			}
		}
		.scan-guide {
			padding-bottom: 60px;
			&-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				&-image {
					display: block;
					margin: 20px 0;
					// uniapp 图片默认高度225，这里需要修改一下
					&.first {
						height: 560px;
					}
					&.second {
						height: 450px;
					}
					&.third {
						height: 580px;
					}
				}
				&-text {
					display: block;
					font-size: 14px;
					color: #000;
					&+ .scan-guide-item-text {
						padding-top: 6px;
					}
				}

			}
		}
	}
</style>