<template>
    <view class="navbar">
        <!-- 整体fixed -->
        <!-- 状态栏：20px + 导航栏 45px = 65px  45px暂时的，后面动态获取 -->
        <view class="navbar-fixed">
            <!-- 状态栏 不同设备高度不一样，动态获取 -->
            <view :style="{height: statusBarHeight + 'px'}"></view>
            <!-- 自定义导航栏 -->
            <view class="navbar-content" :style="{height:navBarHeight + 'px',width: windowWidth + 'px'}">
                <!-- 搜索框 -->
                <view class="navbar-search">
                    <view class="navbar-search_icon"></view>
                    <view class="navbar-search_text">uni-app、vue、html</view>
                </view>
            </view>
        </view>
        <!-- 占位符 -->
        <view :style="{height: navBarHeight + statusBarHeight + 'px'}"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                statusBarHeight: 20,
                navBarHeight: 45,
                windowWidth: 375
            };
        },
        created() {
            // 获取手机系统信息
            const info = uni.getSystemInfoSync()
            this.statusBarHeight = info.statusBarHeight;
            this.windowWidth = info.windowWidth;

            // 获取小程序 左侧胶囊位置信息
            // #ifndef APP-PLUS || H5 || MP-ALIPAY
            const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
            // bottom: 56 height: 32 left: 278 right: 365 top: 24 width: 87
            // （胶囊底部高度 - 状态栏高度） + （胶囊顶部高度 - 状态栏高度） = 导航栏高度
            this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
            this.windowWidth = menuButtonInfo.left
            // #endif
        }
    }
</script>

<style lang="scss" scoped>
    .navbar-fixed {
        width: 100%;
        background-color: $mk-base-color;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;

        .navbar-content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 45px; // 暂时的,后面动态获取
            padding: 0 15px;
            box-sizing: border-box;

            .navbar-search {
                display: flex;
                align-items: center;
                width: 100%;
                height: 30px;
                background-color: #fff;
                border-radius: 30px;
                padding: 0 15px;

                .navbar-search_icon {
                    width: 10px;
                    height: 10px;
                    border: 1px solid red;
                    margin-right: 10px;
                }

                .navbar-search_text {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
</style>