<template>
    <div class="completeMasterCon">
        <div class="switchCon">
            <el-tabs class="tab-width" v-model="activeName" @tab-click="handleClick">
                <template v-for="(item,index) in restTabArr">
                    <el-tab-pane :label="item.title" :name="item.name"></el-tab-pane>
                </template>
            </el-tabs>
            <div class="tabContentCon">
                <div v-if="parentType != 1">
                    <issueComplete v-show="activeName == 'first'"/>
                    <issueComError v-show="activeName == 'second'"/>
                </div>
                <div v-if="parentType == 1">
                    <issueCompleteCopy v-show="activeName == 'first'"/>
                    <issueComErrorCopy v-show="activeName == 'second'"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import issueComError from './issueComError';
    import issueComplete from './issueComplete';
    import issueComErrorCopy from './issueComErrorCopy';
    import issueCompleteCopy from './issueCompleteCopy';
    export default {
        name: 'completeMaster',
        components: {
            issueComError, 
            issueComplete,
            issueComErrorCopy,
            issueCompleteCopy
        },
        data() {
            return {
                activeName:'first',
                restTabArr:[
                    {title: '发放成功', name: 'first'},
                    {title: '发放失败', name: 'second'},
                ],
                parentType:1,
            }
        },
        mounted(){
            this.activeName = sessionStorage.getItem('tabSwitch2') ? sessionStorage.getItem('tabSwitch2') : 'first';
            this.parentType = this.$parent.payType;
        },
        methods: {
            handleClick(tab,event){
                sessionStorage.setItem('tabSwitch2', this.activeName);
            },
        },
    }
</script>
<style scoped lang="scss">
    .completeMasterCon {
        .tab-width{
            width: 170px;
        }
    }
</style>