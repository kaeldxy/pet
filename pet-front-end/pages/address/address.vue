<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addrList" :key="index">
			<view class="wrapper">
				<view class="address-box">
					<text class="address">{{item.address}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.phone}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="editAddr('edit', item._id)"></text>
		</view>
		<button class="add-btn" @click="addAddr('add')">新增地址</button>
	</view>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState, mapActions } = createNamespacedHelpers('addr')
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option){
			this.getAddrs()
		},
		computed:{
			...mapState(['addrList'])
		},
		methods: {
			...mapActions(['getAddrs']),
			//选择地址
			editAddr(type, addrId){
				uni.navigateTo({
					url:`/pages/address/addressManage?type=${type}&addrId=${addrId}`
				})
			},
			addAddr(type){
				uni.navigateTo({
					url:`/pages/address/addressManage?type=${type}`
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
