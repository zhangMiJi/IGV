<template>
	<view class="user-container">
        <view class="title">完善</view>
        <view class="title">您的信息</view>
        <view class="user-form">
            <text class="form-label">用户昵称：</text>
            <u--input
                v-model="userInfo.username"
                placeholder="输入用户昵称"
            ></u--input>
        </view>
        <view class="user-form">
            <text class="form-label">用户地址：</text>
            <u--input
                v-model="userInfo.address"
                placeholder="输入用户地址"
            ></u--input>
        </view>
        <view class="footer-button">
            <u-button type="primary" :plain="true" text="取消" @click="handleCancel"></u-button>
            <u-button type="primary" text="保存" @click="handleConfirm"></u-button>
        </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
                userInfo: {
                    name: '',
                    address: ''
                }
			}
		},
		methods: {
            handleCancel() {
                uni.navigateBack({
                    delta: 1
                });
            },

            handleConfirm() {}

		}
	}
</script>

<style lang="scss" scoped>
    .user-container {
        padding: 30px;
        .title {
            font-size: 24px;
            color: $u-main-color;
            &+ .title {
                padding-top: 5px;
            }
        }
        .user-form {
            margin-top: 30px;
            &+ .user-form {
            margin-top: 10px;
            }
            .form-label {
                font-size: 14px;
                color: #4f4f4f;
            }
            ::v-deep .u-input {
                margin-top: 8px;
                border: none;
                padding-top: 10px !important;
                padding-bottom: 10px !important;
                padding-left: 10px !important;
                padding-right: 10px !important;
				// padding: 15px 10px !important;
				border-radius: 8px !important;
				background-color: rgba(129,179,55,0.1);
                .u-input__content__field-wrapper__field  {
                    font-size: 14px !important;
                    color: #666 !important;
                }
            }
        }
        .footer-button {
            display: flex;
            margin-top: 60px;
            ::v-deep .u-button {
                width: 140px;
                height: 42px;
            }
        }
    }
</style>