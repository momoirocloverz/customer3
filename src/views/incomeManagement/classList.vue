<template>
    <div class="class-list">
        <div>
            <el-tabs class="tab-width" v-model="activeName" @tab-click="handleClick">
                <template v-for="(item,index) in restTabArr">
                    <el-tab-pane :label="item.title" :name="item.name"></el-tab-pane>
                </template>
            </el-tabs>
            <div class="flex-box flex-right right-generate">
                <el-button type="primary" @click="go()">生成待发放订单</el-button>
            </div>
            <div class="tabContentCon">
                <Income v-if="activeName == '1'"/>
                <PersonSummary v-if="activeName == '2'"/>
            </div>
        </div>
    </div>
</template>
<script>
    import Income from './components/incomeDetails'
    import PersonSummary from './components/personSummary'

    export default {
        name: 'classList',
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
            go() {
                this.$store.commit('setBreadcrumbList',[
                    { title:"员工收入明细" },
                    { title:"生成待发放订单" },
                ]);
                this.$router.push({
                    name:'pendingGeneration',
                    query:{

                    }
                })
            },
        },
    }
</script>
<style scoped lang="scss">
    .class-list {
        background-color: #fff;
        box-sizing: border-box;
        .tab-width{
            width: 180px;
        }
        .right-generate{
            position: relative;
            z-index: 2;
            margin-left: 50%;
            width: 50%;
            margin-top: -50px;
            padding-bottom: 15px;
        }
    }
</style>