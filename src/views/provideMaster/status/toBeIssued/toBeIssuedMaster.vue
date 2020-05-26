<template>
    <div class="toBeIssuedMasterCon">
        <div class="switchCon">
            <el-tabs class="tab-width" v-model="activeName" @tab-click="handleClick">
                <template v-for="(item,index) in restTabArr">
                    <el-tab-pane :label="item.title" :name="item.name"></el-tab-pane>
                </template>
            </el-tabs>
            <div class="tabContentCon">
                <Normal v-show="activeName == 'first'"/>
                <Income v-show="activeName == 'second'"/>
            </div>
        </div>
    </div>
</template>
<script>
    import Income from './incomeDetail';
    import Normal from './normalDetail';
    export default {
        name: 'toBeIssuedMaster',
        components: {
            Income, Normal
        },
        data() {
            return {
                activeName:'first',
                restTabArr:[
                    {title: '按人汇总', name: 'first'},
                    {title: '收入明细', name: 'second'},
                ],
            }
        },
        mounted(){
            this.activeName = sessionStorage.getItem('tabSwitch') ? sessionStorage.getItem('tabSwitch') : 'first';
        },
        methods: {
            handleClick(tab,event){
                sessionStorage.setItem('tabSwitch', this.activeName);
            },
        },
    }
</script>
<style scoped lang="scss">
    .toBeIssuedMasterCon {
        .tab-width{
            width: 170px;
        }
    }
</style>