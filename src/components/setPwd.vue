<template>
    <div class="set-pwd">
        <el-dialog title="修改密码" class="setRootScoped setMiddleDialog" :visible.sync="passwordVisible" width="450px" :close-on-click-modal="false" center>
            <div>
                <el-form :model="passwordForm" status-icon :rules="passwordRules" ref="passwordForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="账号">
                        <div>{{ currentAccount }}</div>
                    </el-form-item>
                    <el-form-item label="原密码" prop="originalPass">
                        <el-input  type="password" v-model="passwordForm.originalPass" size="small" show-password placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpass">
                        <el-input type="password" v-model="passwordForm.newpass" size="small" show-password placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="repeatPass">
                        <el-input type="password" v-model="passwordForm.repeatPass" size="small" show-password placeholder="请输入"></el-input>
                    </el-form-item>
                    <div class="flexHere">
                        <el-button type="primary" size="small" class="sameWidthBtn" @click="submitPass('passwordForm')">确 定</el-button>
                        <el-button type="info" size="small" class="sameWidthBtn"  @click="cancelPass('passwordForm')">取 消</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'setPwd',
    props:{
        tableData:{
            type:Array,
        },
    },
    data(){
        var validateRepeat = (rule, value, callback) => {
            if (value !== this.passwordForm.newpass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            passwordVisible:false,
            passwordForm:{
                originalPass:'',
                newpass:'',
                repeatPass:'',
            },
            passwordRules:{
                originalPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                ],
                newpass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                repeatPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validateRepeat, trigger: 'blur' }
                ],
            },
        }
    },
    methods:{
    },
}
</script>
<style scoped lang="scss">
    .set-pwd {
    }
</style>