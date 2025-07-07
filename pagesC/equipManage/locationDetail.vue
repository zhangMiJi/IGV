<template>
	<view class="location-detail-container">
        <view class="content">
            <view class="content-item">
                <view class="content-item-left"> 
                    <view class="flex-box">
                        <image class="content-item-left-img" src="/static/images/common.jpg"></image>
                        <text class="content-item-left-title">{{valveInfo.name}}</text>
                    </view>
                    <view class="flex-box icon-box">
                        <i class="iconfont" style="padding-right: 8px;">&#xe70b;</i>
                        <i class="iconfont" 
                            :class="[
                            Number(valveInfo.batteryNum) >= 50 ? 'green' : 
                            Number(valveInfo.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                            style="padding-right: 4px;">&#xe70d;</i>
                        <text 
                            :class="[
                                Number(valveInfo.batteryNum) >= 50 ? 'green' : 
                                Number(valveInfo.batteryNum) <= 10 ? 'red' : 'orange'
                            ]"
                            style="padding-right: 10px;">{{valveInfo.batteryNum}}%</text>
                        <i class="iconfont" style="padding-right: 4px">&#xe719;</i>
                        <text>{{valveInfo.editDate}}</text>
                    </view>
                </view>
                <view class="content-item-right">
                    <i class="iconfont" style="color: #cecece;" @click="handleOpenEditModal">&#xe714;</i>
                </view>
            </view>
            <view class="content-item sec">
                <view class="content-item-left">
                    设备序列号
                </view> 
                <view class="content-item-right">
                    <text>{{valveInfo.num}}</text>
                    <i class="iconfont" style="color: #cecece;" @click="handleOpenReplaceModal">&#xe714;</i>
                </view>
            </view>
            <view class="content-item sec">
                <view class="content-item-left">
                    设备所属地块
                </view> 
                <view class="content-item-right">
                    <text>{{valveInfo.locationName}}</text>
                    <i class="iconfont" style="color: #cecece;" @click="handleOpenLocationModal">&#xe714;</i>
                </view>
            </view>
            <view class="content-item sec">
                <view class="content-item-left">
                    设备管理员
                </view> 
                <view class="content-item-right">
                    <view class="admin-box">
                        <view class="admin-box-item" v-for="(item) in valveInfo.adminList">{{item}}</view>
                    </view>
                </view>
            </view>
            <!-- <view class="content-item sec">
                <view class="content-item-left">
                    服务有效期限
                </view> 
                <view class="content-item-right">
                    <text>{{valveInfo.startDate}}</text>
                    <text style="padding: 0 4px"> - </text>
                    <text>{{valveInfo.endDate}}</text>
                </view>
            </view> -->
        </view>
		<!-- <view class="bottom">
            <view class="bottom-info">
                非常抱歉通知您，您使用的此设备云平台服务还有 30 天到期。为确保设备正常运行，避免服务到期导致设备功能受限，请您及时缴费。
            </view>
            <u-button type="primary" text="立即缴费"></u-button>
        </view> -->
        <!-- 替换此设备弹窗 -->
		<CustomModal 
			:showModal="replaceModalVisiable"
			title="替换此设备" 
            @cancel="handleReplaceModalCancel"
			@confirm="handleReplaceModalConfirm"
		>
			<view slot="content">
				<view class="equip-manage-input-box">
                    <u-input
                        placeholder="请输入设备序列号"
                        shape="circle"
                        v-model="inputValue"
                    >
                        <template slot="suffix">
                            <i class="iconfont" style="color: #909399;" @click="handleScan">&#xe713;</i>
                        </template>
                    </u-input>
                </view>
			</view>
		</CustomModal>
        <!-- 编辑所属地块弹窗 -->
		<CustomModal 
			:showModal="editModalVisiable"
			title="设备命名编辑" 
            @cancel="handleEditModalCancel"
			@confirm="handleEditModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box">
                    <view class="batch-form-label" style="width: 60px;">设备命名</view>
                    <u-input
                        placeholder="请输入设备名称"
                        v-model="inputValue"
                    >
                    </u-input>
                </view>
			</view>
		</CustomModal>
        <!-- 编辑地块弹窗 -->
		<CustomModal 
			:showModal="locationModalVisiable"
			title="设备所属地块" 
            @cancel="handleLocationModalCancel"
			@confirm="handleLocationModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box">
                    <view class="batch-form-label" style="width: 85px;">设备所属地块</view>
                    <!-- <uni-data-select
                        class="batch-form-select"
                        v-model="batchValue"
                        placeholder="请选择"
                        :localdata="locationList"
                        @change="handleSelectChange"
                    ></uni-data-select> -->
                    <view class="batch-form-select">
                        <u-input
							class="myInput"
							ref="locationNameRef"
                            placeholder="请输入所属地块名称"
                            v-model="locationName"
                            :customStyle="{
                                borderColor: '#bbb',
                            }"
                        >
                        </u-input>
                    </view>
                </view>
                <view>
                    <u-picker @cancel="handleLocationNameCancel" @close="handleLocationNameCancel" @confirm="handleLocationNameConfirm" :closeOnClickOverlay="true" :show="showLocation" :columns="locationList"></u-picker>
                    <view class="select-btn" @click="handleShowLocationName">选择已有地块名称</view>
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
                valveInfo: {
                    name: '名称不超过8个字',
                    editDate: '2026.10.01 - 2027.09.30',
                    num: '864452060202551',
                    batteryNum: '98',
                    locationName: '地块名称',
                    adminList: [
                        '管理员1',
                        '管理员2',
                    ],
                    startDate: '2026.10.01',
                    endDate: '2027.09.30',
                },
                replaceModalVisiable: false,
                editModalVisiable: false,
                locationName:'',
                showLocation: false,
                locationList: [
                    ['东地块','西地块']
                ],
                locationModalVisiable: false,
			}
		},
        components: {
			CustomModal
		},
        onLoad(options) {
            const valveInfo = JSON.parse(options.valveInfo);
            // this.valveInfo = valveInfo;
        },
		methods: {
            // 打开替换此设备弹窗
            handleOpenReplaceModal() {
                this.replaceModalVisiable = true;
            },

            // 关闭替换此设备弹窗
            handleReplaceModalCancel() {
                this.replaceModalVisiable = false;
            },

            // 确认替换此设备弹窗
            handleReplaceModalConfirm() {
                this.replaceModalVisiable = false;
            },

            // 打开编辑地块名弹窗
            handleOpenEditModal() {
                this.editModalVisiable = true;
            },

            // 关闭编辑地块名弹窗
            handleEditModalCancel() {
                this.editModalVisiable = false;
            },

            // 确认关闭编辑地块名弹窗
            handleEditModalConfirm() {
                this.editModalVisiable = false;
            },

            // 打开设备所属地块弹窗
            handleOpenLocationModal() {
                this.locationModalVisiable = true;
            },

            // 关闭设备所属地块弹窗
            handleLocationModalCancel() {
                this.locationModalVisiable = false;
            },

            // 确认设备所属地块弹窗
            handleLocationModalConfirm() {
                this.locationModalVisiable = false;
            },

            // 扫一扫
            async handleScan() {
				try {
					const scanResult = await ScanCode()
					console.log('scanResult', scanResult);
				}catch(error) {
					console.log('error', error);
					
				}
			},

             // 打开修改地块名选择
             handleShowLocationName() {
                this.showLocation = true;
            },

            // 确认修改地块名选择
            handleLocationNameConfirm(action) {
				console.log(action);
                this.locationName = action.value[0];
                this.showLocation = false;
            },

            // 关闭修改地块名选择
			handleLocationNameCancel(){
				this.showLocation = false;
				// 使用 $nextTick 确保 DOM 已经更新
                this.$nextTick(() => {
                const inputComponent = this.$refs.locationNameRef;
                if (inputComponent && inputComponent.focus) {
                    // 调用 u-input 组件的 focus 方法
                    inputComponent.focus();
                } else {
                    console.error('未能找到 myInput 或者 myInput 不支持 focus 方法');
                }
                });
			},
		}
	}
</script>

<style lang="scss" scoped>
    .location-detail-container {
        .content {
            padding-top: 8px;
            &-item {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #efefef;
                padding: 12px 24px;
                &-left {
                    flex: 1;
                    .flex-box {
                        display: flex;
                        align-items: center;
                        &+ .flex-box {
                            margin-top: 10px !important;
                        }
                        &.icon-box {
                            font-size: 14px;
                            color: #bebebe;
                            margin-top: 4px;
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
                    &-img {
                        display: block;
                        width: 28px;
                        height: 28px;
                    }
                    &-title {
                        font-size: 18px;
                        color: #333;
                        padding-left: 6px;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 140px;
                    }
                }
                &-right {
                    .iconfont {
                        padding-left: 7px;
                        color: #bbb !important;
                    }
                }
                &.sec {
                    justify-content: space-between;
                    .content-item-left {
                        font-size: 14px;
                        color: #4f4f4f;
                    }
                    .content-item-right {
                        display: flex;
                        font-size: 14px;
                        color: #9a9a9a;
                        .admin-box-item {
                            &.admin-box-item {
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            padding: 12px 24px;
            background: rgba(129,179,55, 0.3);
            &-info {
                font-size: 12px;
                color: #4f4f4f;
                padding-bottom: 22px;
            }
        }
    }
    .equip-manage-input-box {
        display: flex;
        align-items: center;
        ::v-deep .u-input {
            flex: 1;
            border-color: #cecece;
            &__content__field-wrapper__field  {
                font-size: 14px !important;
            }
        }
        text {
            padding-left: 16px;
            font-size: 14px;
            color: #4f4f4f;
        }
    }
    .batch-form-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .batch-form-label {
            width: 85px;
            font-size: 14px;
            color: #000;
            // padding-right: 5px;
        } 
        .batch-form-select {
            flex: 1;
            padding-left: 10px;
        }
    }
    .select-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $u-main-color;
        border: 1px solid $u-main-color;
        border-radius: 12px;
        width: 100px;
        height: 28px;
        font-size: 12px;
        padding: 0 12px;
        margin-top: 12px;
        margin-left: 95px;
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
