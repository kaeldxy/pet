<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="currenAddr.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="currenAddr.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{currenAddr.address}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	const {
		mapState,
		mapActions
	} = createNamespacedHelpers('addr')
	export default {
		data() {
			return {
				type: 'add',
				currenAddr: {
					name: '',
					phone: '',
					address: '在地图选择',
				}
			}
		},
		computed: {
			...mapState(['addrList']),
		},
		onLoad(option) {
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.currenAddr = {...this.addrList.find(item => item._id === option.addrId)}
			}
			this.type = option.type
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.currenAddr.address = data.name;
					}
				})
			},
			...mapActions(['addAddr', 'updateAddr']),
			//提交
			async confirm() {
				uni.showLoading({
					title:'正在请求中'
				})
				let res
				if(this.type === 'edit'){
					res = await this.updateAddr(this.currenAddr)
				}else{
					res = await this.addAddr(this.currenAddr)
				}
				uni.hideLoading()
				let { statu, msg } = res
				uni.showToast({
					title:msg
				})
				if(statu){
					uni.navigateTo({
						url:'/pages/address/address'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
