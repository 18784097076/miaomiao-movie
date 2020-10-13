<template>
    <div id="main">
        <HeaderTop title="我的"/>

        <div id="content">
             <Login/>
        </div>

        <TabBar/>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import TabBar from "@/components/TabBar";
import Login from '@/components/Login'
export default {
    name: 'Mine',
    components: {
        HeaderTop,
        TabBar,
        Login
    }
}
</script>

<style scoped>

</style>