<template>
	<view class="equip-manage-container">
        <view class="equip-manage-input-box">
			<u-input
				placeholder="扫描或输入设备号添加设备"
				shape="circle"
				v-model="inputValue"
				@confirm="handleIChange"
			>
			<template slot="suffix">
				<i class="iconfont" style="color: #fff;" @click="handleScan">&#xe713;</i>
			</template>
			</u-input>
			<view>
				<i class="iconfont" @click="handleIChange">&#xe712;</i>
			</view>
		</view>
        <view class="u-collapse-box">
            <u-collapse
                :value="collapseValue"
                @change="handleCollapseChange"
                @close="handleCollapseClose"
                @open="handleCollapseOpen"
            >
                <u-collapse-item
             		v-for="(item, index) in valveList"
					:key="index"
                    :title=item.name
                    :name="index"
                >
                <view slot="title1" class="u-collapse-item-left">
                    <i 
                        :class="['iconfont u-collapse__arrow', collapseValue.indexOf(index) > -1? 'u-cell__right-icon-wrap--down' : 'u-cell__right-icon-wrap--up' ]"
                    >&#xe711;</i>
                    <text class="u-collapse__title">{{item.name}}</text>
                </view>
                    <!-- <text slot="title1" class="u-collapse__title">{{item.name}}</text> -->
                    <view  slot="value1" class="u-collapse__value">
                        <view v-if="item.revoke" style="display: flex;" @click.stop="handleRevoke">
                            <i class="iconfont">&#xe716;</i>
                            <text>解除授权</text>
                        </view>
                        <view class="valve-details-content-item right" @click.stop="handleNavigateToAll(k)">
                            <view class="line"></view>
                            <view class="info" @click.stop="handleNavigateToAll(k)">
                                <i class="iconfont">&#xe70a;</i>
                                <text class="num">{{ item.num }}</text>
                            </view>
                        </view>
                    </view>
                    <!-- <i class="iconfont u-collapse__arrow" slot="right-icon1">&#xe711;</i> -->
                    <view                           
                         v-for="(k, index) in item.detail" 
                         class="valve-details-content"
                         @click="handleNavigateTo(k)"
                    >
                        <view class="valve-details-content-item">
                            <view class="valve-details-content-item left">
                                <view class="img" :style="{backgroundColor: k.bgColor}">{{k.locationName[0] }}</view>
                                <view class="name">{{ k.locationName }}</view>
                            </view>
                            <view class="valve-details-content-item right">
                                <view class="line"></view>
                                <view class="info">
                                    <i class="iconfont">&#xe70a;</i>
                                    <text class="num">{{ k.num }}</text>
                                </view>
                                <i class="iconfont arrow-right" >&#xe711;</i>
                            </view>
                        </view>
                    </view>
                </u-collapse-item>
            </u-collapse>
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
        <!-- 新增设备弹窗 -->
		<CustomModal 
			:showModal="addModalVisiable"
			title="新增设备" 
            @cancel="handlecloseAddModal"
			@confirm="handleAddCinfirm"
		>
            <view class="add-form" slot="content">
                <u--form
                    labelPosition="left"
                    :model="addForm"
                    :rules="rules"
                    ref="uForm"
                >
                    <u-form-item
                        label="设备序列号"
                        prop="addForm.serialNumber"
                        borderBottom
                        ref="item1"
                    >
                        <u--input v-model="addForm.serialNumber" disabled></u--input>
                    </u-form-item>
                    <u-form-item
                        label="设备所属地块"
                        prop="addForm.location"
                        borderBottom
                        ref="item1"
                    >
                        <!-- <u--input v-model="model1.userInfo.name"></u--input> -->
                        <view class="batch-form-select">
                            <!-- <u-input
                                class="myInput"
                                ref="shareLocationRef"
                                placeholder="可输入可选择"
                                v-model="addForm.location"
                                @focus="handleShowLocation"
                                :customStyle="{
                                    borderColor: '#bbb',
                                }"
                            >
                            <template slot="suffix">
                                    <i class="iconfont choose-icon" style="color: #4f4f4f;" @click="handleShowLocation">&#xe711;</i>
                            </template>
                            </u-input>
                            <template>
                                <view class="">
                                    <u-picker @cancel="handleLocationCancel" @close="handleLocationCancel" @confirm="handleLocationConfirm" :closeOnClickOverlay="true" :show="showLocation" :columns="valveActions"></u-picker>
                                </view>
                            </template> -->
                            <u-input
                                class="myInput"
                                ref="belongBlockRef"
                                placeholder="请输入新地块名"
                                v-model="addForm.location"
                                :customStyle="{
                                    borderColor: '#bbb',
                                }"
                            >
                            </u-input>
                        </view>
                    </u-form-item>
                    <u-form-item>
                        <view style="margin-left: 25px;">
                            <u-picker @cancel="handleLocationCancel" @close="handleLocationCancel" @confirm="handleLocationConfirm" :closeOnClickOverlay="true" :show="showLocation" :columns="loactionsList"></u-picker>
                            <view class="select-btn" @click="handleShowLocation">选择已有地块名称</view>
                        </view>
                    </u-form-item>
                    <u-form-item
                        label="设备命名"
                        prop="addForm.command"
                        borderBottom
                        ref="item1"
                    >
                        <u--input v-model="addForm.command"></u--input>
                    </u-form-item>
                </u--form>
            </view>
		</CustomModal>

        <!-- 新增设备成功弹窗 -->
		<CustomModal 
			:showModal="addSuccessModalVisiable"
			title="新增设备" 
            :showCancelButton="false"
			@confirm="handleAddSuccessCinfirm"
		>
            <view class="add-success-box" slot="content">
                <image style="width: 120px;height: 120px;" src="/static/images/add-success.png"></image>
                <view class="add-success-text">恭喜您，该设备已添加成功！</view>
                <view class="add-success-text">可在相应的地块组中查看该设备</view>
            </view>
		</CustomModal>

         <!-- 解除授权弹窗 -->
		<CustomModal 
			:showModal="revokeModalVisiable"
			title="解除授权" 
            @cancel="handleRevokeModal"
			@confirm="handleRevokeCinfirm"
		>
            <view class="revoke-box" slot="content">
                <view class="revoke-text">你确定要解除该用户与主账号的隶属关联吗？</view>
                <view class="revoke-text">此后其不再具备原所有设备的管理权限。</view>
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
                collapseValue: [0],
                inputValue: '',
                valveList: [
                    {
                        name: '18678960523',
                        revoke: false,
                        num: 50,
                        detail: [
                            {
                                locationName: '西地块',
                                num: 3,
                                bgColor: ''
                            },
                            {
                                locationName: '东地块',
                                num: 3,
                                bgColor: ''
                            },
                            {
                                locationName: '六连北地块',
                                num: 3,
                                bgColor: ''
                            }
                        ]
                    }, 
                    {
                        name: '16878964567',
                        revoke: true,
                        num: 50,
                        detail: [
                            {
                                locationName: '西地块',
                                num: 3,
                                bgColor: ''
                            },
                            {
                                locationName: '东地块',
                                num: 3,
                                bgColor: ''
                            },
                            {
                                locationName: '六连北地块',
                                num: 3,
                                bgColor: ''
                            }
                        ]
                    }
                ],
                activeTabbar: 2,
                addModalVisiable: false,
                addForm: {
                    serialNumber: '123',
                    location: '',
                    command: ''
                },
                addSuccessModalVisiable: false,
                revokeModalVisiable: false,
                showLocation: false,
                valveActions: [
					['A阀','B阀']
                ],
                loactionsList: [
					['A地块','B地块']
                ],
			}
		},
        components: {
			CustomModal
		},
        onLoad() {
            // 给阀门信息中的 class=img 的元素随机添加背景色
            const colorList = ['#81B337','#FCCA00','#E99D42','#BD3124', '#815f25','#1677b3', '#1491a8', '#207f4c','#645822', '#ed3b2f'];
            this.valveList.forEach(item => {
                item.detail.forEach(k => {
                    let color = this.getRandomIndex(colorList);
                    k.bgColor = color;
                    colorList.splice(colorList.indexOf(color), 1);
                    if(colorList.length === 0) {
                        colorList.push(...colorList);
                    }
                })
            })
            
        },
		methods: {
            // 手动输入设备IMEI码
            handleIChange() {
                this.addModalVisiable = true;
            },

            // 扫码输入设备IMEI码
            async handleScan() {
				try {
					const scanResult = await ScanCode()
					console.log('scanResult', scanResult);
				}catch(error) {
					console.log('error', error);
					
				}
			},

            // 关闭新增设备弹窗
            handlecloseAddModal() {
                this.addModalVisiable = false;
            },

            // 新增设备弹窗的确认
            handleAddCinfirm() {
                this.addModalVisiable = false;
                this.addSuccessModalVisiable = true;
            },

            // 关闭新增设备成功弹窗
            handleAddSuccessCinfirm() {
                this.addSuccessModalVisiable = false;
            },

            // 获取随机数
            getRandomIndex(arr) {
                const randomIndex = Math.floor(Math.random() * arr.length);
                return arr[randomIndex];
            },

            handleNavigateToAll(valveInfo) {
                console.log(valveInfo);
                uni.navigateTo({
                    url: '/pagesC/equipManage/allDetail?valveInfo=' + JSON.stringify(valveInfo),
                });
            },

            handleNavigateTo(valveInfo) {
                console.log(valveInfo);
                uni.navigateTo({
                    url: '/pagesC/equipManage/detail?valveInfo=' + JSON.stringify(valveInfo),
                });
            },

            handleCollapseChange(activeNames) {
                const openValues = activeNames.filter(item => item.status === 'open').map(item => item.name);
                this.collapseValue = openValues;
                console.log('1', this.collapseValue);
            },

            handleCollapseClose() {},

            handleCollapseOpen() {},

            // 解除授权
            handleRevoke() {
                this.revokeModalVisiable = true;
            },

             // 关闭解除授权弹窗
             handleRevokeModal() {
                this.revokeModalVisiable = false;
            },

            // 解除授权弹窗的确认
            handleRevokeCinfirm() {
                this.revokeModalVisiable = false;
            },


            handleTabbarChange(name) {
                if(name === 0) {
                    uni.reLaunch({
						url: '/pages/index/index'
					});
                }else if(name === 1) {
                    uni.navigateTo({
						url: '/pagesA/valveControl/index'
					});  
                }
            },

             // 打开所属地块选择
             handleShowLocation() {
                this.showLocation = true;
            },

            // 确认所属地块选择
            handleLocationConfirm(action) {
                console.log(action);
                this.addForm.location = action.value[0];
                this.showLocation = false;
            },

            // 关闭所属地块选择
            handleLocationCancel() {
                this.showLocation = false;
            },
		}
	}
</script>

<style lang="scss" scoped>
    .equip-manage-container {
        .equip-manage-input-box {
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
        ::v-deep .u-cell{
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
        .valve-details-content {
            display: flex;
            align-items: center;
            padding: 10px 14px;
            border-radius: 6px;
            background: #fff;
            box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.05);
            &+ .valve-details-content {
                margin-top: 10px;
            }
            &-item {
                display: flex;
                align-items: center;
                width: 100%;
                & .left {
                    display: flex;
                    .img {
                        display: block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 40px;
                        font-size: 20px;
                        font-weight: 600;
                        color: #fff;
                    }
                    .name {
                        padding-left: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        color: #4f4f4f;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 130px;
                    }
                }
                &.right {
                    flex: 1;
                    display: flex;
                    font-size: 14px;
                    .line {
                        width: 1px;
                        height: 30px;
                        background: #efefef;
                        margin: 0 20px;
                    }
                    .info {
                        display: flex;
                        .iconfont {
                            padding-right: 10px;
                            color: #bebebe;
                        }
                        .num {
                            color: $u-main-color;
                        }
                    }
                    .arrow-right {
                        padding-left: 23px;
                        color: #bebebe;
                    }
                }
            }
        }
        // .u-collapse-content {}
        // ::v-deep .u-collapse-item {
        //     &__content {
        //         background: #efefef;
        //         &__text {
        //             margin: 10px !important;
        //             background: #fff;
        //         }
        //     }
        // }
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
    .u-collapse-box {
        ::v-deep .u-cell__body {
            padding: 15px !important;
        }
        .u-collapse__title {
            font-size: 14px;
            font-weight: 600;
            color: #4f4f4f;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 130px;
        }
        .u-collapse__value {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #bebebe;
            // padding-right: 23px;
            i {
                padding-right: 5px;
                color: #bebebe;
            }
        }
        .u-collapse__arrow {
            color: #cecece;
        }
        ::v-deep .u-collapse-item-left {
            display: flex;
            align-items: center;
            .iconfont {
                display: inline-block;
                width: 16px;
                margin-right: 10px;
            }
            .u-cell__right-icon-wrap--up {
                transform: rotate(-90deg);
            }
            .u-cell__right-icon-wrap--down {
                transform: rotate(90deg);
            }
        }
    }
    .add-form {
        ::v-deep .u-form-item {
            &__body {
                padding: 0 !important;
                margin-bottom: 10px;
                &__left {
                    width: 90px !important;
                    &__content__label {
                        font-size: 14px;
                        color: #000 !important;
                    }
                }
            }
            &__body__right {
                .u-input {
                    border-color: #bbb !important;
                }
            }
        }
    }
    .add-success-box {
        text-align: center;
        .add-success-text {
            font-size: 16px;
            color: #000;
            padding-bottom: 6px;
        }
    }
   .revoke-box {
        text-align: center;
       .revoke-text {
            font-size: 14px;
            color: #000;
            padding-bottom: 6px;
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
        margin-left: 65px;
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