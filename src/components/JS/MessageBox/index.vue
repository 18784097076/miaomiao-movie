<template>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div @touchstart="handleCancel">{{cancel}}</div>
            <div @touchstart="handleOK">{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox'
}
</script>

<style lang="scss" scoped>
.messageBox{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 120px;
    border:1px solid #ccc;
    background: #fff;
    box-shadow: 3px 3px 3px #ccc;
}
.messageBox h2 {text-align: center;font-size: 18px;line-height: 40px;}
.messageBox p {text-align: center;line-height: 40px;}
.messageBox > div {display: flex;position: absolute; bottom: 0; width: 100%;border-top: 1px solid #ccc;}
.messageBox > div div {flex: 1;text-align: center; line-height: 30px;}
.messageBox > div div:first-child{border-right: 1px solid #ccc;}
</style>