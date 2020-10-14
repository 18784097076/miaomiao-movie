<template>
    <!-- 外层固定高度容器 -->
    <div class="wrapper" ref="wrapper">
        <!-- 内容高度超过外层容器高度就会出现滚动 -->
        <slot/>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroller',
    props: {
        handleToScroll: {
            type: Function,
            default: () => {}
        },
        handleToScrollEnd: {
            type: Function,
            default: () => {}
        }
    },
    mounted() {
        let scroll = new BScroll(this.$refs.wrapper, {
            mouseWheel: true, 
            click: true, 
            tap: true,
            probeType: 1
        })
        // 监听实例滚动
        scroll.on('scroll', pos => {
            // 调用父组件中定义的method
            this.handleToScroll(pos)
        })
        // 监听实例滚动完成
        scroll.on('scrollEnd', pos => {
            // 调用父组件中定义的method
            this.handleToScrollEnd(pos)
        })
        this.scroll = scroll
    },
    methods: {
        // 父组件中可以直接通过this.$refs拿到该组件对象，然后调用该方法，让scroll实例滚动至设置的位置
        scrollTo(y) {
            this.scroll.scrollTo(0, y)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {height: 100%;}
</style>