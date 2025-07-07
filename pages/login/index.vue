<template>
	<view class="login-container">
		<image class="logo-bg" src="/static/images/login_bg.png" mode="widthFix"></image>
		<view class="login-form">
			<u--form
					labelPosition="left"
					:model="loginForm"
					ref="uForm"
				>
				<u-form-item
					prop="userInfo.username"
					ref="item1"
				>
					<u--input
						v-model="loginForm.userInfo.username"
						placeholder="输入账号"
					></u--input>
				</u-form-item>
				<u-form-item
					prop="userInfo.password"
					ref="item1"
				>
					<u--input
						v-model="loginForm.userInfo.password"
						type="password"
						placeholder="输入密码"
					></u--input>
				</u-form-item>
			</u--form>
			<view class="login-footer">
				<u-button type="primary" text="开启灌溉系统" @click="handleLogin"></u-button>
				<u-button type="primary" :plain="true" text="手机号码登录"></u-button>
			</view>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					userInfo: {
						username: '',
						password: ''
					}
				}
			}
		},
		methods: {
			handleLogin() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		.logo-bg {
			width: 100%;
		}
		.login-form {
			padding: 20px 30px;
			::v-deep .u-input {
				border: none;
				padding: 8px 14px !important;
				border-radius: 8px !important;
				background-color: rgba(129,179,55,0.1);
			}
		}
		.login-footer {
			margin-top: 30px;
			::v-deep .u-button {
				height: 40px;
				line-height: 40px;
				font-weight: 600;
				// border-color: #81B337;
				border-radius: 20px !important;
				// &.u-button--normal {
				// 	// color: #81B337;
				// }
				&.u-button--primary  {
					// color: #fff;
					// background-color: #81B337;
					margin-bottom: 20px;
				}
			
			}
	
		}
	
	}
</style>
