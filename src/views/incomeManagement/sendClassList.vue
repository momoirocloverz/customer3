<template>
    <div class="send-class-list">
        <div>
            <el-tabs class="tab-width" v-model="activeName" @tab-click="handleClick">
                <template v-for="(item,index) in restTabArr">
                    <el-tab-pane :label="item.title" :name="item.name"></el-tab-pane>
                </template>
            </el-tabs>
            <div class="tabContentCon">
                <Income v-if="activeName == '1'"/>
                <PersonSummary v-if="activeName == '2'"/>
            </div>
        </div>
    </div>
</template>
<script>
    import Income from './components/sendIncomeDetails'
    import PersonSummary from './components/sendPersonSummary'

    export default {
        name: 'sendClassList',
        components: {Income, PersonSummary,},
        data() {
            return {
                freezeStatus: '2',
                activeName: '1',
                restTabArr: [
                    {title: '收入明细', name: '1'},
                    {title: '按人汇总', name: '2'},
                ],
            }
        },
        mounted() {
        },
        methods: {
            handleClick(tab, event) {
//            console.log(tab, event);
            },
            testEvent(pay) {
                console.log('这里', pay);
            },
        },
    }
</script>
<style scoped lang="scss">
    .send-class-list {
        background-color: #fff;
        box-sizing: border-box;
        .tab-width{
            width: 180px;
        }
    }
</style>