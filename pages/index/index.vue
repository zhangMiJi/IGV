<template>
	<view class="home-container">
		<view class="banner">
			<u-swiper :list="bannerList"></u-swiper>
		</view>
		<view class="navigation-box">
			<u-grid col="4" @click="handleNav">
				<u-grid-item
					v-for="(item, index) in navigationList"
					:key="index"
				>	
					<image class="navigation-item-image" :src=item.iamgeSrc></image>
					<text class="navigation-item-title">{{item.title}}</text>
					<text class="navigation-item-subTitle">{{item.subTitle}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="footer">
			<u-button :plain="true" text="退出登录" @click="() => handleOpenModal('loginOutModalVisiable')"></u-button>
		</view>

		<!-- 技术服务弹窗 -->
		<CustomModal 
			:showModal="technicalServiceModalVisiable"
			title="技术服务" 
			:showCancelButton="false"
			@confirm="() => handleCloseModal('technicalServiceModalVisiable')"
		>
			<view slot="content">
				<view class="top-text">
					页面开发中，敬请期待！
				</view>
				<text class="sup-text">
					技术服务热线：0519-83900991
				</text>
			</view>
		</CustomModal>

		<!-- 合作共赢弹窗 -->
		<CustomModal 
			:showModal="cooperationWinModalVisiable"
			title="合作共赢" 
			:showCancelButton="false"
			@confirm="() => handleCloseModal('cooperationWinModalVisiable')"
		>
			<view slot="content">
				<view class="top-text">
					页面开发中，敬请期待！
				</view>
				<text class="sup-text">
					共赢热线：139 5123 6600（李先生）
				</text>
			</view>
		</CustomModal>

		<!-- 合作共赢弹窗 -->
		<CustomModal 
			:showModal="agriculturalMallModalVisiable"
			title="农资商城" 
			:showCancelButton="false"
			@confirm="() => handleCloseModal('agriculturalMallModalVisiable')"
		>
			<view slot="content">
				<view class="top-text">
					页面开发中，敬请期待！
				</view>
				<text class="sup-text">
					服务热线：0519-83900991
				</text>
			</view>
		</CustomModal>	

		<!-- 退出登录弹窗 -->
		<CustomModal 
			:showModal="loginOutModalVisiable"
			title="提示" 
			@cancel="() => handleCloseModal('loginOutModalVisiable')"
			@confirm="handleLogoutConfirm"
		>
			<view slot="content">确定要退出登录吗？</view>
		</CustomModal>
	</view>
</template>

<script>
	import CustomModal from '@/components/CustomModal/index';
	import { ScanCode } from '@/utils/index'
	export default {
		data() {
			return {
				bannerList: [
					'/static/images/banner_01.jpg',
					'/static/images/banner_02.jpg'
				],
				navigationList: [
					{
						iamgeSrc: '/static/images/valve-control.png',
						title: '阀门控制',
						subTitle: '',
					},
					{
						iamgeSrc: '/static/images/scan.png',
						title: '扫一扫',
						subTitle: '',
					},
					{
						iamgeSrc: '/static/images/equip-manage.png',
						title: '设备管理',
						subTitle: '',
					},
					{
						iamgeSrc: '/static/images/equip-manage.png', // 7-v2
						title: '轮灌',
						subTitle: '',
					},
					{
						iamgeSrc: '/static/images/technical-service.png',
						title: '技术服务',
						subTitle: '开发中'
					},
					{
						iamgeSrc: '/static/images/cooperation-win.png',
						title: '合作共赢',
						subTitle: '开发中'
					},
					{
						iamgeSrc: '/static/images/agricultural-mall.png',
						title: '农资商城',
						subTitle: '开发中'
					},
					{
						iamgeSrc: '/static/images/user-info.png',
						title: '完善用户信息',
						subTitle: '',
					},

				],
				technicalServiceModalVisiable: false,
				cooperationWinModalVisiable: false,
				agriculturalMallModalVisiable: false,
				loginOutModalVisiable: false,
			}
		},
		components: {
			CustomModal
		},
		methods: {
			handleNav(name) {
				const strategyMap = {
					0: function () {
						this.handleGoNav(name);
					},
					1: function () {
						this.handleScan();
					},
					2: function () {
						this.handleGoNav(name);
					},
					3: function () { // 7-v2   下面序号变一下
						this.handleGoNav(name);
					},
					4: function () {
						this.handleOpenModal('technicalServiceModalVisiable');
					},
					5: function () {
						this.handleOpenModal('cooperationWinModalVisiable');
					},
					6: function () {
						this.handleOpenModal('agriculturalMallModalVisiable');
					},
					7: function () {
						this.handleGoNav(name);
					},
				};
				const strategy = strategyMap[name];
				if (strategy) {
					strategy.call(this);
				}
			},

			// 标签跳转
			handleGoNav(nameIndex) {
				const urlListMap = {
					0: '/pagesA/valveControl/index', // 门阀控制
					2: '/pagesC/equipManage/index', // 设备管理
					3: '/pagesC/irrigation/index', // 7-v2  下面序号变一下
					7: '/pages/user/index' // 完善用户信息
				}
				console.log(nameIndex,urlListMap[nameIndex]);
				
				if(urlListMap[nameIndex]) {
					uni.navigateTo({
						url: urlListMap[nameIndex]
					});
				}
			},

			// 扫一扫
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
					uni.navigateTo({
						url: '/pagesB/scan/scanError',
					});
				}
			},

			// 打开弹窗
			handleOpenModal(modalState) {
				this[modalState] = true
			},

			// 关闭弹窗
			handleCloseModal(modalState) {
				this[modalState] = false
			},

			// 确认退出登录
			handleLogoutConfirm() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
.home-container {
  .banner {
    width: 100%;
    height: 224px;
    ::v-deep .u-swiper {
      width: 100%;
      height: 100% !important;
      border-radius: 0 !important;
      &__wrapper {
        height: 100% !important;
        &__item__wrapper__image {
          height: 100% !important;
          border-radius: 0 !important;
        }
      }
    }
  }
  .navigation-box {
    padding: 28px 22px;
    .navigation-item {
      margin-bottom: 10px;
      &-image {
        display: block;
        width: 66px;
        height: 66px;
      }
      &-title {
        font-size: 14px;
        color: #6c6c6c;
        margin-top: 6px;
        width: 60px;
        text-align: center;
        white-space: pre-wrap;
      }
      &-subTitle {
        font-size: 14px;
        color: #bebebe;
        margin-top: 8px;
      }
    }
    ::v-deep .u-grid-item {
      height: 120px;
      justify-content: flex-start !important;
    }
  }
  .footer {
    ::v-deep .u-button {
      position: fixed;
      bottom: 60px;
      left: 50%;
      margin-left: -60px;
      width: 120px;
      height: 30px;
      border-radius: 20px;
      color: #000;
    }
  }
  .top-text {
    font-size: 18px;
    color: $u-main-color;
    text-align: center;
  }
  .sup-text {
    display: block;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
