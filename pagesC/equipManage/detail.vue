<template>
	<view class="equip-detail-container">
		<view
            :class="[
                'header',
                bgClassNameMap[valveInfo.bgColor]
            ]"
        >
            <view class="header-top">
                <text class="header-top-title">{{valveInfo.locationName}}</text>
                <view class="edit-btn" @click="handleOpenEditModal">
                    <i class="iconfont">&#xe715;</i>
                    <text>编辑地块名称</text>
                </view>
            </view>
            <view class="header-bottom">
                <view class="header-bottom-item">
                    <text>管理员：</text>
                    <text>{{valveInfo.admin}}</text>
                </view>
                <view class="header-bottom-item">
                    <text>设备数量：</text>
                    <text>{{valveInfo.num}}</text>
                </view>
            </view>
        </view>
		<view class="body">
            <view class="body-item">
                <view class="body-list-top">
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
                        <text @click="handleIChange">搜索</text>
                    </view>
                </view>
                <u-row gutter="10">
                    <u-col span="3">
                        <view class='body-btn-box'>
                            <u-button text="地块编辑" @click="handleopenBatchModal"></u-button>
                        </view>
                    </u-col>
                    <u-col span="3">
                        <view class='body-btn-box'>
                            <u-button text="地块解绑" @click="handleopenUnbindModal"></u-button>
                        </view>
                    </u-col>
                    <u-col span="3">
                        <view class='body-btn-box'>
                            <u-button text="分享授权" @click="handleopenShareModal"></u-button>
                        </view>
                    </u-col>
                    <u-col span="3">
                        <view class='body-btn-box'>
                            <u-button text="解除授权" @click="handleopenRevokeModal"></u-button>
                        </view>
                    </u-col>
                </u-row>
                <view class="check-box">
                    <u-checkbox-group v-model="checkAll" @change="handleCheckAll">
                        <u-checkbox name="all" activeColor="#81B337" shape="circle" label="全选"></u-checkbox>
                    </u-checkbox-group>
                </view>
            </view>
            <view class="body-item other" v-for="(item, index) in list" @click="handleEditInfo">
                <view class="other-left">
                    <view class="other-left-left">
                        <u-checkbox-group v-model="item.ckeckStatus"  class="valve-content-item-title-left" @change="() => handleToogleCheckStatus(item)">
                            <u-checkbox name="checked" activeColor="#81B337" shape="circle" ></u-checkbox>
                        </u-checkbox-group>
                    </view>
                    <view class="big-box" @click.stop="(e) => handleToogleCheckStatusNew(e, item)">
                    </view>
                    <view class="other-left-right">
                        <view class="center-top"> 
                        <text class="center-top-title">{{item.name}}</text>
                        <!-- <view v-if="item.expire" class="center-top-tips">
                                <text class="center-top-tips-circle"></text>
                                <text class="center-top-tips-text">服务到期</text>
                            </view> -->
                        </view>
                        <view class="center-bottom">
                            <i class="iconfont orange" style="padding-right: 8px;">&#xe70b;</i>
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
                                style="padding-right: 10px;">{{item.batteryNum}}%</text>
                            <i class="iconfont" style="padding-right: 10px">&#xe70c;</i>
                            <text style="padding-right: 10px">{{item.code}}</text>
                            <i class="iconfont" style="padding-right: 6px; font-size: 14px;">&#xe70e;</i>
                            <text>{{item.adminNum}}</text>
    
                        </view>
                    </view>
                </view>
                <view class="right">
                    <i class="iconfont" style="color: #cecece;">&#xe711;</i>
                </view>
            </view>
        </view>
         <!-- 加载更多提示 -->
			<view v-if="loadingMore" class="loading-more">加载中...</view>
			<view v-else-if="noMoreData" class="no-more-data"><text class="icon-1">-</text><text style="padding: 0 5px;">没有更多了</text><text class="icon-1">-</text></view>
        <!-- <view class="none-text">—  没有更多了  —</view> -->
        <!-- 编辑地块名弹窗 -->
		<CustomModal 
			:showModal="editModalVisiable"
			title="地块名称编辑" 
            @cancel="handleEditModalCancel"
			@confirm="handleEditModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box u-action-mask">
                    <view class="batch-form-label" style="width: 60px;">地块名称</view>
                    <view class="batch-form-select">
                        <u-input
							class="myInput"
							ref="locationNameRef"
                            placeholder="地块名称"
                            v-model="locationName"
                            :customStyle="{
                                borderColor: '#bbb',
                            }"
                        >
                        </u-input>
                    </view>
                </view>
                <view>
                    <u-picker @cancel="handleLocationNameCancel" @close="handleLocationNameCancel" @confirm="handleLocationNameConfirm" :closeOnClickOverlay="true" :show="showLocation" :columns="valveActions"></u-picker>
                    <view class="select-btn" @click="handleShowLocationName">选择已有地块名称</view>
                </view>
			</view>
		</CustomModal>
        <!-- 批量编组弹窗 -->
		<CustomModal 
			:showModal="batchModalVisiable"
			title="地块编辑" 
            @cancel="handleBatchModalCancel"
			@confirm="handleBatchModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box">
                    <view class="batch-form-label" style="width: 85px;">设备所属地块</view>
                    <view class="batch-form-select">
                        <u-input
							class="myInput"
							ref="belongBlockRef"
                            placeholder="请输入所属地块"
                            v-model="belongBlock"
                            :customStyle="{
                                borderColor: '#bbb',
                            }"
                        >
                        </u-input>
                    </view>
                </view>
                <view style="margin-left: 25px;">
                    <u-picker @cancel="handleBelongBlockCancel" @close="handleBelongBlockCancel" @confirm="handleBelongBlockConfirm" :closeOnClickOverlay="true" :show="showBelongBlock" :columns="valveActions"></u-picker>
                    <view class="select-btn" @click="handleShowBelongBlock">选择已有地块名称</view>
                </view>
			</view>
		</CustomModal>
        <!-- 地块解绑弹窗 -->
		<CustomModal 
			:showModal="unbindModalVisiable"
			title="地块解绑" 
            @cancel="handleUnbindModalCancel"
			@confirm="handleUnbindModalConfirm"
		>
			<view slot="content">
				<text class="unbind-text">
                    您确定是要解除所选设备与该地块的绑定吗？
                    解除绑定后，这些设备将在<text  class="unbind-text-import">【设备管理-未分配设备】</text>
                    中显示，待你重新编组。

                </text>
			</view>
		</CustomModal>
        <!-- 分享授权弹窗 -->
		<CustomModal 
			:showModal="shareModalVisiable"
			title="分享授权" 
            @cancel="handleShareModalCancel"
			@confirm="handleShareModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box">
                    <view class="batch-form-label" style="width: 100px;">被分享人手机号</view>
                    <view class="batch-form-select">
                        <u--input
                            v-model="shareNum"
                            placeholder="输入手机号"
                            @change="handleShareNumConfirm"
                        ></u--input>
                    </view>
                </view>
			</view>
		</CustomModal>
        <!-- 解除授权弹窗 -->
		<CustomModal 
			:showModal="revokeModalVisiable"
			title="解除授权" 
            @cancel="handleRevokeModalCancel"
			@confirm="handleRevokeModalConfirm"
		>
			<view slot="content">
				<view class="batch-form-box">
                    <view class="batch-form-label" style="width: 80px;">设备管理员</view>
                    <view class="batch-form-select">
                        <u--input
                            v-model="shareNum"
                            placeholder="输入手机号"
                            @change="handleShareNumConfirm"
                        ></u--input>
                    </view>
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
                bgClassNameMap: {
                    '#81B337': 'bg1',
                    '#207f4c': 'bg2',
                    '#815f25': 'bg3',
                    '#1491a8': 'bg4',
                    '#1677b3': 'bg5',
                    '#645822': 'bg6',
                    '#BD3124': 'bg7',
                    '#E99D42': 'bg8',
                    '#ed3b2f': 'bg9',
                    '#FCCA00': 'bg10',
                },
                valveInfo: {},
                inputValue: '',
                checkAll: [],
                // list: [
                //     {
                //         ckeckStatus: [],
                //         name: '新疆阿拉尔九连六班A地块南01',
                //         batteryNum: '98',
                //         code: '864452060202551',
                //         adminNum: 3,
                //     },
                //     {
                //         ckeckStatus: [],
                //         name: '新疆阿拉尔九连六班A地块南01',
                //         batteryNum: '50',
                //         code: '864452060202551',
                //         adminNum: 3,
                //     },
                //     {
                //         ckeckStatus: [],
                //         name: '新疆阿拉尔九连六班A地块南01',
                //         batteryNum: '10',
                //         code: '864452060202551',
                //         adminNum: 3,
                //         expire: true,
                //     }
                // ],
                list: [], 
				page: 1, 
			    pageSize: 10, 
			    loadingMore: false, 
			    noMoreData: false,  
				mockObj: { //模拟的数据对象
					ckeckStatus: [],
                    name: '新疆阿拉尔九连六班A地块南01',
                    batteryNum: '98',
                    code: '864452060202551',
                    adminNum: 3,
				},
                editModalVisiable: false,
                batchModalVisiable: false,
                batchValue: '',
                unbindModalVisiable: false,
                shareModalVisiable: false,
                revokeModalVisiable: false,
                locationName: '',
                showLocation: false,
                valveActions: [
					['A阀','B阀']
                ],
                belongBlock: '',
                showBelongBlock: false,
                shareNum: '',
                showShareNum: false,
			}
		},
        components: {
			CustomModal
		},
        onLoad(options) {
            // 上一个页面的地块信息
            const valveInfo = JSON.parse(options.valveInfo);
            uni.setNavigationBarTitle({
                title: valveInfo.locationName
            });
            // this.valveInfo = valveInfo;
            // 真实取接口数据不需要下面这行代码，用上面的代码即可
            this.valveInfo = {
                ...valveInfo,
                admin: '13896587429',
                num: '5'
            }
            // console.log('bgColor', bgColorbgClassNameMap[valveInfo.bgColor]);
            
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

            // 跳转地块信息
            handleEditInfo() {
                uni.navigateTo({
                    url: '/pagesC/equipManage/locationDetail?valveInfo=' + JSON.stringify(this.valveInfo)
                });
            },

            // 全选
            handleCheckAll(value) {
                this.checkAll = value;
                if(value.length>0) {
                    this.list.forEach(item => {
                        item.ckeckStatus = ['checked'];
                    });
                }else {
                    this.list.forEach(item => {
                        item.ckeckStatus = [];
                    });
                }
            },

            // 搜索
            handleIChange() {
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

            // 切换选中状态
            handleToogleCheckStatus(item) {
                if(item.ckeckStatus.length === 0) {
                    item.ckeckStatus = ['checked'];
                }else {
                    item.ckeckStatus = [];
                }
            },

            handleToogleCheckStatusNew(e, item) {
                e.stopPropagation();
                this.$set(item, 'ckeckStatus', item.ckeckStatus.length === 0 ? ['checked'] : []);
                this.list.forEach(k => {
                    if(k.code === item.code) {
                        k.ckeckStatus = item.ckeckStatus
                    }
                })
                
            },

            // 打开批量编组弹窗
            handleopenBatchModal() {
                this.batchModalVisiable = true;
            },

            // 关闭批量编组弹窗
            handleBatchModalCancel() {
                this.batchModalVisiable = false;
            },

            // 确认关闭批量编组弹窗
            handleBatchModalConfirm() {
                this.batchModalVisiable = false;
            },

            // 打开地块解绑弹窗
            handleopenUnbindModal() {
                this.unbindModalVisiable = true;
            },

            // 关闭地块解绑弹窗
            handleUnbindModalCancel() {
                this.unbindModalVisiable = false;
            },

            // 确认关闭地块解绑弹窗
            handleUnbindModalConfirm() {
                this.unbindModalVisiable = false;
            },

            // 打开分享授权弹窗
            handleopenShareModal() {
                this.shareModalVisiable = true;
            },

            // 关闭分享授权弹窗
            handleShareModalCancel() {
                this.shareModalVisiable = false;
            },

            // 确认关闭分享授权弹窗
            handleShareModalConfirm() {
                this.shareModalVisiable = false;
            },

            // 打开解除授权弹窗
            handleopenRevokeModal() {
                this.revokeModalVisiable = true;
            },

            // 关闭解除授权弹窗
            handleRevokeModalCancel() {
                this.revokeModalVisiable = false;
            },

            // 确认关闭解除授权弹窗
            handleRevokeModalConfirm() {
                this.revokeModalVisiable = false;
            },

            // 下拉选择
            handleSelectChange(value) {
                console.log('value', value);
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

            // 打开所属地块选择
            handleShowBelongBlock() {
                this.showBelongBlock = true;
            },

            // 确认所属地块选择
            handleBelongBlockConfirm(action) {
                console.log(action);
                this.belongBlock = action.value[0];
                this.showBelongBlock = false;
            },

            // 关闭所属地块选择
            handleBelongBlockCancel() {
                this.showBelongBlock = false;
                // 使用 $nextTick 确保 DOM 已经更新
                this.$nextTick(() => {
                const inputComponent = this.$refs.belongBlockRef
                if (inputComponent && inputComponent.focus) {
                    // 调用 u-input 组件的 focus 方法
                    inputComponent.focus();
                } else {
                    console.error('未能找到 myInput 或者 myInput 不支持 focus 方法');
                }
                });
            },

            // 打开分享授权选择
            handleShowShareNum() {
                this.showShareNum = true;
            },

            // 确认分享授权选择
            handleShareNumConfirm(action) {
				console.log(action);
                this.shareNum = action.value[0];
                this.showShareNum = false;
            },

            // 关闭分享授权选择
			handleShareNumCancel(){
				this.showShareNum = false;
				// 使用 $nextTick 确保 DOM 已经更新
                this.$nextTick(() => {
                const inputComponent = this.$refs.shareNumRef;
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
	.loading-more, .no-more-data {
	  font-size: 14px;
	  text-align: center;
	  padding: 20px 0 40px 0;
	  color: rgba(154,154,154,1);
	  .icon-1{
		  font-size: 18px;
	  }
	}
    .equip-detail-container {
        position: relative;
        .header {
            height: 112px;
            padding: 24px;
            .header-top {
               display: flex;
               justify-content: space-between;
               align-items: center;
               color: #fff;
               .header-top-title {
                    font-size: 24px;
               }
               .edit-btn {
                    display: flex;
                    width: 100px;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 13px ;
                    border-radius: 12px;
                    background: transparent;
                    color: #fff;
                    border: 1px solid #fff;
                    border-radius: 12px;
                    text {
                        font-size: 12px;
                        padding-left: 4px;
                    }
               }
           }
           .header-bottom {
               margin-top: 20px;
               font-size: 12px;
               color: #fff;
               &-item {
                &+ .header-bottom-item {
                    margin-top: 5px;
                }
               }
           }
        }
        .body {
            position: relative;
            top: -20px;
            background: #fff;
            border-radius: 20px 20px 0px 0px;
            &-item {
                border-bottom: 1px solid #efefef;
                padding: 0 20px 14px 20px;
                &.other {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 10px;
                    .other-left {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        position: relative;
                        .big-box {
                            position: absolute;
                            width: 50%;
                            height: 100%;
                        }
                        .center-top {
                            display: flex;
                            align-items: center;
                            &-title {
                                font-size: 16px;
                                color: #000;
                                // 最长15个字符
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 220px;
                            }
                            &-tips {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 80px;
                                height: 18px;
                                line-height: 18px;
                                background: rgba(245,35,45, 0.1);
                                border-radius: 5px;
                                margin-left: 6px;
                                &-circle {
                                    display: block;
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    background: #F5232D;
                                    margin-right: 8px;
                                }
                                &-text {
                                    font-size: 12px;
                                    color: #F5232D;
                                }
                            }
                        }
                        .center-bottom {
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                            color: #bebebe;
                            margin-top: 9px;
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
                }
            }
            &-list-top {
                padding: 14px 0;
            }
            .equip-manage-input-box {
                display: flex;
                align-items: center;
                ::v-deep .u-input {
                    flex: 1;
                    color: #888 !important;
                    border-color: #cecece !important;
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
            .body-btn-box {
                ::v-deep .u-button {
                    height: 32px !important;
                    line-height: 32px;
                    border-radius: 12px;
                    background: transparent;
                    color: #4f4f4f !important;
                    border-radius: 20px !important;
                    font-size: 12px !important;
                    border-color: #cecece !important;
                    text {
                        font-size: 12px !important;
                    }
               }
            }
            .check-box {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #4f4f4f;
                margin-top: 18px;
                ::v-deep .u-checkbox {
                    text {
                        font-size: 14px !important;
                    }
                }
            }
        }
        .bg1 {
            background: url('@/static/images/bg1.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg2 {
            background: url('@/static/images/bg2.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg3 {
            background: url('@/static/images/bg3.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg4 {
            background: url('@/static/images/bg4.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg5 {
            background: url('@/static/images/bg5.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg6 {
            background: url('@/static/images/bg6.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg7 {
            background: url('@/static/images/bg7.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg8 {
            background: url('@/static/images/bg8.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg9 {
            background: url('@/static/images/bg9.png') no-repeat;
            background-size: 100% 100%;
        }
        .bg10 {
            background: url('@/static/images/bg10.png') no-repeat;
            background-size: 100% 100%;
        }
        .none-text {
            font-size: 14px;
            color: #9a9a9a;
            margin: 32px auto 54px;
            text-align: center;
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
            ::v-deep .u-border {
                border:1px solid #bbb !important;
            }
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
        margin-left: 70px;
    }
    .unbind-text {
        font-size: 14px;
        color: #000;
        &-import {
            color: #c54a3f;
        }
    }
    ::v-deep .u-action-sheet__item-wrap__item__name {
        color: #333 !important;
    }
	.u-action-mask {
			::v-deep .u-fade-enter-to{
				background-color: rgba(0, 0, 0,0)!important;
				display: none !important;
			}
	}
	.choose-icon{
		font-size: 20px;
		padding: 0px 4px;
		color: #cecece;
	}
    ::v-deep .u-picker__view__column__item {
        color: #333 !important;
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
