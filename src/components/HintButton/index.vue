<template lang="">
    <span style="margin:0 5px">
        <a :title="title">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
        </a>
    </span>
</template>
<script>
export default {
    name:'HintButton',
    props:['title'],
    data(){
        return{
            
        }
    }
}
</script>
<style lang="">
    
</style>