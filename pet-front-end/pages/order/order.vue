<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick({status: item.status, index})">
				{{item.text}}
			</view>
		</view>
		<scroll-view class="list-scroll-content" scroll-y @scrolltolower="getData">
			<empty v-if="total === 0"></empty>

			<!-- 订单列表 -->
			<view v-for="(item,index) in orderList" :key="index" class="order-item">
				<view class="i-top b-b">
					<text class="time">{{item.time}}</text>
					<text class="state" :style="{color: item.stateTipColor}">{{item.status}}</text>
					<text v-if="item.state==='未付款'" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)"></text>
				</view>
				<view class="goods-box-single">
					<image class="goods-img" :src="imgBase(item[useID(item)].images[0]) + imgUrl(item[useID(item)].images[0])" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">{{item[useID(item)].name}}</text>
						<text class="attr-box">{{item[useID(item)].addr}}</text>
						<text class="price">{{item[useID(item)].price}}</text>
					</view>
				</view>
				<view class="price-box">
					共
					<text class="num">{{item.num}}</text>
					件商品 实付款
					<text class="price">{{item[useID(item)].price * item.num}}</text>
				</view>
				<view class="action-box b-t" v-if="item.status === '待付款'">
					<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
					<button class="action-btn recom">立即支付</button>
				</view>
			</view>

			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import {
		imgBase,
		imgUrl
	} from '../../utils/imgPath.js'
	import {
		createNamespacedHelpers
	} from 'vuex'
	const {
		mapState,
		mapActions,
		mapMutations
	} = createNamespacedHelpers('order')
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [
					{ /// 已付款', '待付款', '待评价', '已评价', '运输中', '已送达
						text: '全部',
						status: '',
					},
					{
						status: '待付款',
						text: '待付款',
					},
					{
						status: '已付款',
						text: '已付款',
					},
					{
						status: '待收货',
						text: '待收货',
					},
					{
						status: '待评价',
						text: '待评价',
					},
					{
						status: '已评价',
						text: '已评价',
					}
				],
			};
		},
		onLoad(options) {
			let { index } = options
			index = ~~index
			const { status } = this.navList[index]
			this.initAndTog(status)
			this.tabCurrentIndex = index
			this.getAllOrder()
		},
		computed: {
			...mapState(['orderList', 'total']),
			loadingType() {
				return this.orderList.length === this.total ? 'none' : 'more'
			}
		},
		methods: {
			imgBase,
			imgUrl,
			...mapActions(['getAllOrder', 'delOrder']),
			...mapMutations(['initAndTog']),
			getData(type = 'push') {
				if (this.loadingType === 'none') {
					return
				} else {
					this.getAllOrder(type)
				}
			},
			useID(item) {
				if (item.petId) {
					return 'petId'
				} else if (item.myseverId) {
					return 'myseverId'
				} else {
					return 'goodId'
				}
			},
			// 顶部tab点击
			tabClick({status,index}){
				this.tabCurrentIndex = index;
				this.initAndTog(status)
				this.getAllOrder()
			},
			cancelOrder(item) {
				uni.showModal({
					title: '',
					content: '您确定取消此订单吗？',
					success: async (res) => {
						if (res.confirm) {
							const type = this.useID(item).replace(/Id/, '')
							const _id = item._id
							uni.showLoading({
								title:'删除中'
							})
							await this.delOrder({type, _id})
							uni.hideLoading()
						}
					}
				})
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
