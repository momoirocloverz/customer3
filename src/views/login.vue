<template>
    <div class="login" @keyup.enter="enterReaction">
        <div class="login-left">
            <img src="../assets/logo.png" alt="">
            万才企业版
        </div>
        <div class="setCenter">
            <div class="center-left"></div>
            <div class="center-right">
                <div class="title">万才企业版管理系统 <span class="co-blue f14 cursor" @click="isTabPhone = !isTabPhone">{{isTabPhone? '手机验证码登录' : '账号密码登录'}}</span></div>
                <el-form ref="loginForm" :label-position="labelPosition" :model="loginForm" :rules="rules">
                    <div v-if="isTabPhone">
                        <el-form-item prop="account" label="用户名">
                            <!--prefix-icon="el-icon-user"-->
                            <el-input v-model.trim="loginForm.account" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="登录密码">
                            <!--prefix-icon="el-icon-lock"-->
                            <el-input v-model.trim="loginForm.password" placeholder="请输入登录密码" type="password"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item prop="phone" label="手机号">
                            <!--prefix-icon="el-icon-user"-->
                            <el-input v-model.trim="loginForm.phone" type="text" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="yzm" label="短信验证码">
                            <!--prefix-icon="el-icon-lock"-->
                            <el-input v-model.trim="loginForm.yzm" placeholder="请输入短信验证码"></el-input>
                            <el-button type="button" class="sent-btn" @click="sendCode" :disabled="isSendYzm">{{buttonText}}
                            </el-button>
                        </el-form-item>
                    </div>
                    <el-checkbox v-model="checked">登录/注册代表您已同意</el-checkbox><span class="blueHere" @click="popAgreement">《万才网用户协议》</span>
                    <el-button type="primary" size="small" :disabled="isEmptyForm" class="login-btn" @click="go">登录</el-button>
                </el-form>
            </div>
        </div>
        <el-dialog
      title="万才网用户协议"
      class="setRoot4Scoped setMiddleDialog"
      :visible.sync="visible"
      width="800px"
      :close-on-click-modal="false"
      border
    >
            <div class="agreementCon">
                <div class="itself">
                            <pre>
            提示条款

欢迎您签署本《万才网用户注册协议》（下称“本协议”）并使用万才平台服务！
各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阋读各条款具体表述。
 
【审慎阅读】您在申请注册流程中点击同意本协议之前，应当认真闶读本协议。请您务必审慎阅读、充分理解各条款内容特别是限定条件、免除或者限制责任的条款、法律适用和争议解決条款。限定条件、免除或者限制责任的条款以粗体（特别是粗体下划线部分）标识，您应重点阅读。如您对协议有任何疑问，可向万才平台客服咨询。
 
【签约动作】当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与万才平台(含万才平台运营方，下同）达成一致，成为万才平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。

一、协议范围
1.1 本协议由您和万才平台（包括但不限于由万才科技（杭州）有限公司及其关联公司、第三方服务商提供的“万才网”：“http://www.10000rc.com”、“万才企业端app”和“万才个人端app”等开放平台，以下简称万才平台”）的运营方万才科技（杭州）有限公司订立。
1.2 除另行明确声明外，万才平台服务包含任何万才平台及其关联公司、第三方服务商提供的基于互联网以及移动互联网的相关服务，且均受本协议约束。如果您不同意本协议的约定，您应立即停止注册或停止使用万才平台服务。
1.3 本协议内容包括协议正文、法律声明、《万才平台服务规则》及所有万才平台已经发布或将来可能发布的所有协议、各类规则、公告或通知（以下合称“万才平台规则”或“规则”）。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。
1.4 万才平台有权随时变更、增加或减少本协议条款并在万才平台上予以公告，并以网站公示的方式进行公告，一旦公示即视为送达，无需另行单独通知您。变更后的协议和规则一经在万才平台公布后，立即或在公告明确的特定时间自动生效。若您在前述变更公告后继续使用万才平台平台服务的，即表示您已经读、理解并接受经修订的协议和规则。若您不同意相关变更，应当立即停止使用万才平台平台服务。

二、注册与用户
2.1定义：
1）、万才平台：指由万才科技（杭州）有限公司运行的“万才网”：“http://www.10000rc.com”、“万才企业端app”和“万才个人端app”等开放平台，是为上述平台注册用户提供信息发布、交流，以及其他技术服务的电子商务交易服务平台。
2）、万才平台协议和规则：指公示在万才平台之上的，与万才平台运营相关的全部协议和规则（包括但不限于流程操作指引等）。
3）、企业商家：指已在万才平台注册的有经营业务需求或具有承接经营业务能力的依据中国法律、法规等成立并合法存在的机关、企事业单位、个体工商户、社团组织和、其他组织和个人。
4）、个人用户：指执行企业商家任务排班工作的自然人。
2.2主体资格
您确认，在您完成注册程序或以其他万才平台允许的方式实际使用万才平台服务时，您应当符合下列条件之一：
1）、年满十八岁，并具有民事权利能力和民事行为能力的自然人；
2）、无民事行为能力人或限制民事行为能力人应在其监护人的监护下使用万才平台平台服务；
3）、根据中国法律、法规等规定成立并合法存在的机关企事业单位、个体工商户、社团组织和其他组织。
2.3用户的帐号、密码和安全性
1）您一旦注册成功成为用户，您将得到一个密码和帐号。如果您未保管好自己的帐号和密码而对您、万才平台或第三方造成的损害，您将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件承担全部责任。您可随时改变您的密码和图标，也可以结束旧的帐户重开一个新帐户。您如发现有任何非法使用用户帐号或安全漏洞的情况，应立即告知万才平台。
2）由于您的平台账户关联您的个人信息及平台商业信息，您的平台账户仅限您本人使用，未经平台同意，您直接或间接授权第三方使用您的平台账号或获取您账户项下信息的行为无效。您应妥善保管注册的用户名称、密码等信息，所有使用该信息的行为均视为您亲自作出。
2.4 您应妥善保管银行的账户、密码一级绑定的手机号码、手机验证码等与账户有关的一切信息。您应确保不向其他任务和泄露账户密码、手机验证码。对于因账户密码或手机验证码泄露所致的损伤，由您执行承担。如您发现有他人冒用或盗用您的平台账号、银行账户、密码或任何其他未经合法授权之情形时，应立即以有效方式通知平台。同时，您应理解平台对您的请求采取行动需要一定的合理期限，在此之前，平台对已执行的指令所导致的您的损失不承担任何责任。
2.5 您同意，我们在需要进行证据保全的情况下，有权直接使用您的注册信息、用户名、密码等信息登录进入您的注册账户。
2.6 您应当及时更新您的基本资料，如因您资料更新不及时导致我们无法提供服务或提供了与您预期不一致的服务，由此产生的任何损失由您自行承担。
2.7您理解并同意，如您有下列行为，我们有权暂停或终止向您提供全部或部分服务，由此导致的任何直接或间接损失由您自行承担。
1）您不具备履行本协议所需的民事行为能力；
2）未向我们提供真实、准确、完整、合法有效的身份信息，或上述信息存在争议；
3）未按要求进行实名注册；
4）恶意注册，对平台或其他平台用户进行恶意攻击
5）未能了解平台所提供服务的性质，并不具有相应的风险认知和承受能力；
6）我们认为您在交易过程中违反诚实信用原则，二次以上违约并遭受服务相对方投诉的

三、信息保护
3.1 平台对您的信息承担保密义务，不会为满足第三方的营销目的而向其出售或出租您的任何信息，但基于法律法规规定、司法机构、监管机关、银行、第三方支付等合理要求下，我们披露您的个人信息。
3.2 您在此确认并同意，您授权我们就您的个人信息（包括但不限于：企业名称/姓名、性别、统一社会信用代码/身份证号码、电话号码、银行卡信息等）披露给相关的合作方，用于您在本平台或合作平台的与本协议相关的业务。
3.3 您同意，为向您提供更好的服务，我们将通过电子邮件、平台公告、手机短信、软件信息推送、传真等方式向您发送相关活动通知。

四、支付服务
我们可能会通过第三方支付机构为您提供银行卡认证服务，在此服务下，您同意委托该第三方支付机构为您提供包括但并不限于银行卡认证、代发等服务，我们会将您的账户与前述银行账户进行绑定。如您未按照我们规定提交相关信息或提交的信息错误、虚假、过时或不完整，或者我们有合理的理由怀疑您提交的信息为错误、虚假、过时或不完整，您因此未能使用银行卡认证、代发等服务而产生的损失由您自行承担。

五、纳税义务
如果您是万才个人版用户（即提供服务的自然人），您应该知晓，根据相关税收法律法规的要求，对于您提供服务而获得的收入，万才平台或企业商家将为您提供纳税代扣代缴服务。

六、企业商家服务要求
6.1、万才平台服务内容
1）、您可以在万才平台上发布任务／服务、查询任务／服务，达成交易意向并进行交易、参加万才平台组织的活动以及使用其它信息服务及技术服务，具体以所开通的平台提供的服务内容为准。
2）、您在万才平台上交易过程中与其他用户发生交易纠纷时，一旦您或其它用户任一方或双方共同提交万才平台要求调查处理，则万才平台作为独立第三方，有权根据调查情况做出调査处理决定，您了解并同意接受万才平台的判断和调查处理决定。
3）、您了解并同意，万才平台有权应政府部门（包括司法及行政部门等）的合法要求，向其提供您向万才平台提供的用户信息和交易记录等相关信息。如您涉嫌侵犯他人知识产权等合法权益，则万才平台亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人披露您必要的身份信息等必要信息。
4）、您应当自行承担因交易产生或取得的相关费用，并依法纳税，平台不承担代扣代缴义务。
5）、拒绝提供担保和免责声明
您明确同意使用万才平台服务的风险由您个人承担。万才平台明确表示不提供任何类型的
担保，不论是明确的或隐含的，但是对商业性的隐含担保，特定目的和不违反规定的适当担保除外。万才平台不担保服务一定能满足用户的要求，也不担保服务不会受中断，对服务的及时性、安全性、真实性、出错发生都不作担保。万才平台拒绝提供任何担保，包括信息能否准确、及时、顺利地传送。用户理解并接受下载或通过万才平台产品服务取得的任何信息资料取決于用户自己，并由其承担系统受损、资料丢失以及其它任何风险。万才平台对在万才平台发布的任何经营业务、商品购物服务、交易进程、招聘信息，承包过程、成果审核等都不作担保。用户不会从万才平台收到口头或书面的意见或信息，万才平台也不会在这里作明确担保。
 
6.2 万才平台服务使用规范
6.2.1 在万才平台上使用万才平台服务过程中，你承诺遵守以下约定：
a）、实施的所有行为均遵守国家法律、法规等规定及万才平台所有协议、各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不偷逃应缴税费，不违反本协议及相关规则。
b）、在与其他用户交易过程中，遵守诚实信用原则，不采取不正当竞争行为，不扰乱万才平台发布的交易的正常秩序，不从事与万才平台发布的交易无关的行为。
c）、不发布国家禁止的或限制的经营业务信息（除非取得合法且足够的许可），不发布涉嫌侵犯他人知识产权或其它合法权益的经营业务信息，不发布违背社会公共利益或公共道德或万才平台认为不适合在万才平台上发布的经营业务信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。
d）、不采取不正当手段（包括但不限于虚假需求等）提高自身或他人评价，或采用不正当手段恶意评价其他用户，降低其他人评价。
e）、未经万才平台书面许可，不对万才平台上的任何数据作商业性利用，包括但不仅限于在未经万才平台事先书面同意的情况下，以复制、传播等任何方式使用万才平台站上展示的资料。
f）、不使用任何装置、软件或例行程序干预或试图干预万才平台的正常运作或正在万才平台上进行的任何交易、活动。你不得采取任何将导致不合理的庞大数据负载加诸万才平台网络设备的行为。
6.2.2 您了解并同意
a）、您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保万才平台免于因此产生任何损失或增加费用。
b）、基于维护万才平台秩序及安全的需要，万才平台有权在发生恶意交易等抗乱市场正常交易秩序的情形下，执行强制关闭相应交易订单等操作。
c）、经国家行政或司法机关的生效法律文书确认你存在违法或侵权行为，或者万才平台根据自身的判断，认为您的行为涉嫌违反法律法规的规定或涉嫌违反本协议和／或规则的条款的，则万才平台有权在万才平台上公示您的该等涉嫌违法或违约行为及万才平台已对您采取的措施。
d）、对于您在万才平台上发布的涉嫌违法、涉嫌侵犯他人合法权利或违反本协议和规则的信息，万才平台有权不经通知你即予以删除，且按照规则的规定进行处罚。
e）、对于您违反本协议项下承诺，或您在万才平台上实施的行为，包括你未在万才平台上实施但已经对万才平台及其用户产生影响的行为，万才平台有权单方认定您行为的性质及是否构成对本协议规则的违反，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须征得您的同意或提前通知予您。您应自行保存与您行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。
f）、如您涉嫌违反有关法律或者本协议之规定，使万才平台遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿万才平台因此造成的损失发生的费用，包括合理的交通费、诉讼费、律师费等费用。
您了解并同意
您单独承担发布内容的责任。您承诺：
（1）在万才平台上发布信息或者利用万才平台的服务时必须符合中国有关法律、法规等规定，不得在万才平台或者利用万才平台的服务制作、复制、发布、传播以下信息：
a）、反对宪法所确定的基本原则的；
b）、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的
c）、损害国家荣誉和利益的；
d）、煽动民族仇恨、民族歧视，破坏民族团结的
e）、破坏国家宗教政策，宣扬邪教和封建迷信的
f）、散布谣言，扰乱社会秩序，破坏社会稳定的；
g）、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
h）、侮辱或者诽谤他人，侵害他人合法权益的；
i）、含有法律、行政法规禁止的其他内容的。
（2）在万才平台上发布信息或者利用万才平台的服务时还必须符合其他有关国家和地区的法律规定以及国际法的有关规定。
（3）不利用万才平台的服务从事以下活动：
a）、未经允许，进入计算机信息网络或者使用计算机信息网络资源的；
b）、未经允许，对计算机信息网络功能进行删除、修改或者增加的；
c）、未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；
d）、故意制作、传播计算机病毒等破坏性程序的；
e）、其他危害计算机信息网络安全的行为。
（4）不以任何方式干扰万才平台的服务。
（5）遵守万才平台的所有其他规定和程序您需对自己在使用万才平台服务过程中的行为承担法律责任。您理解，如果万才平台发现其网站传输的信息明显属于上述情形之一，万才平台有义务立即停止传输，保存有关记录，向国家有关机关报告，并且删除该内容以及含有该内容的地址、目录或关闭服务器。您使用万才平台电子公告服务，包括电子布告牌、电子白板、电子论坛、网络聊天室和留言板等以交互形式为上网用户提供信息发布条件的行为，也须遵守本条的规定以及万才平台将专门发布的电子公告服务规则，上述情形中的法律后果和法律责任以及万才平台可以采取的措施同样适用于电子公告服务的用户。
若您的行为出现上述情形之一，万才平台将作出独立判断立即取消用户服务帐号，由此产生的责任均您承担。。
 
6.3 特别授权
您完全理解并不可撤销地授予万才平台及其关联公司下列权利：
1、您完全理解并不可撤销地授权万才平台或万才平台授权的第三方或您与万才平台一致同意的第三方，根据本协议及万才平台规则的规定，处理您在万才平台上发生的所有交易及可能产生的交易纠纷。您同意接受万才平台或万才平台授权的第三方或您与万才平台一致同意的第三方的判断和调查处理决定。该决定将对你具有法律约束力。
2、一旦您向万才平台和其关联公司做出任何形式的承诺，且相关公司已确认您违反了该承诺，则万才平台有权立即按您的承诺或协议约定的方式对您的账户采取限制措施，包括中止或终止向您提供服务，并公示相关公司确认的您的违约情況。您了解并同意，万才平台无须就相关确认与您核对事实，或另行征得您的同意，且万才平台无须就此限制措施或公示行为向你承担任何的责任。
3、对于您提供的资料及数据信息，您授予万才平台及其关联公司永久免费的许可使用权利（并有权在多个层面对该权利进行再授权）。此外，万才平台及其关联公司有权（全部或部分）使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于万才平台平台的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。
 
6.4  责任范围和责任限制
1、万才平台负责按＂现状＂和＂可得到＂的状态向您提供万才平台服务。但万才平台对万才平台服务不作任何明示或暗示的保证，包括但不限于万才平台服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途同时，万才平台也不对万才平台服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、稳定性和及时性做出任何承诺和保证。
2、您了解万才平台仅作为您获取需求和服务信息、物色交易对象、就服务的交易进行协商及开展交易的场所，平台上的服务和需求信息系由用户自行发布，且可能存在风险和瑕疵，万才平台无法完全控制交易所涉及的质量、安全或合法性，信息的真实性或准确性，以及交易各方履行其在贸易协议中各项义务的能力。您应自行谨慎判断确定相关信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。
3、除非法律法规明确要求，否则，万才平台没有义务对所有用户的信息数据、服务信息、交易行为以及与交易有关的其它事项进行事先审查。
4、万才平台或万才平台授权的第三方或您与万才平台一致同意的第三方有权基于您不可撤销的授权受理您与其他用户因交易产生的争议，并有权单方判断与该争议相关的事实及应适用的规则，进而做出处理决定，包括但不限于调整相关订单的交易状态，争议款项的全部或部分支付给交易一方或双方。该处理决定对您有约束力。如你未在限期内执行处理决定的，则万才平台有权利（但无义务）在您向万才平台及其关联公司交纳的保证金中代为支付。您应及时补足保证金并弥补万才平台及其关联公司的损失，否则万才平台及其关联公司有权有权向您追偿或立即停止您的服务。
您理解并同意，万才平台或万才平台授权的第三方或您与万才平台一致同意的第三方并非司法机构，仅能以普通人的身份对证据进行鉴别，万才平台或万才平台授权的第三方或您与万才平台一致同意的第三方对争议的调查处理完全是基于您不可撒销的授权，其无法保证争议处理结果符合您的期望，也不对争议调处结论承担任何责任。如您因此遭受损失，您同意自行向受益人索偿。
5、您了解并同意，万才平台不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于利润、商誉、数据等方面的损失或其它无形损失的损害赔偿（无论万才平台是否已被告知该等损害赔偿的可能性）：
a）、使用或未能使用万才平台平台服务。
b）、第三方未经批准的使用您的账户或更改您的数据。
c）、通过万才平台平台交易服务或获取任何平台增值服务、数据、信息或进行交易等行为或替代行为产生的费用及损失。
d）、您对万才平台平台服务的误解。
e）、任何非因万才平台的原因而引起的与万才平台平台服务有关的其它损失。
6、不论在何种情况下，万才平台均不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，电力故障、罢工、劳动争议、暴乱、起义、强乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。
 


七、个人用户服务要求
7.1 万才平台服务内容
1、  因万才平台经营业务服务需要，万才平台企业商家将根据实际需要选您提供服务。您与万才平台之间并不存在提供服务关系。
2、  您应按照万才平台与万才平台企业商家相关协议要求规定的标准完成任务。
您依据本协议约定收取的相关费用，不得违反任何法律法规和政策等规定。若依据相关规定，您提供的相关服务和收费，应通过所在机构或以其他法律规定的方式进行，则您自行负责办理全部事宜，若因您的自身原因未办理前述事宜，则您应承担由此引起的全部法律后果，并赔偿由此给万才平台及万才平台企业商家所造成的全部损失。

7.2 协议效力
1、您的签约信息（包括您的姓名、身份证号等信息），以您提供的信息为准（包括但不限于线上提供或线下提供）。您承诺并保证您所提供的签约信息真实、准确。
2、 本协议在发生下列情形时自然终止：
a、 经万才平台或万才平台企业商家事先同意的情况下，您主动退出服务的；
b、 万才平台或万才平台企业商家终止或变更业务模式而不需要您继续履行本协议的；
c、 万才平台或万才平台企业商家认为您不适合继续提供服务的；
d、 万才平台和万才平台企业商家解除合作的；
e、 其他原因导致本协议不再继续履行的。

7.3  万才平台的权利和义务
1、  您应根据万才平台和万才平台企业商家要求提供服务，服务期间您应遵守万才平台和万才平台企业商家有关服务内容、服务质量等方面的要求。万才平台和万才平台企业商家可根据自身的运营要求制定具体安排，您应予遵守。
2、 按万才平台或万才平台企业商家的相关要求对您为万才平台企业商家提供服务的成果进行验收。
3、  您确认，您签署本协议并不导致您与万才平台以及万才平台企业商家之间构成劳动关系/劳务/雇佣关系或其他类似的劳动人事法律关系，且万才平台和万才平台企业商家对您违反任何法律法规等规定的行为不承担任何法律责任。

7.4  个人用户的权利和义务
1、 您应按时尽责地完成万才平台以及万才平台企业商家要求的任务内容，并达到规定的质量标准，不得有侵犯他人知识产权、财产权、人身权、肖像权、隐私权、商业秘密或其他合法权益以及其他违反国家法律法规、国家政策、或有悖于公序良俗的内容。
2、 协议期内，您应在万才平台以及万才平台企业商家许可范围内使用本协议有关的商业信息；协议期内以及协议终止后，您均有义务对合作各方的有关协议及合作过程中知悉的万才平台、万才平台企业商家的相关信息予以保密，未经书面许可，您不得以任何方式向其它方披露、给予或转让该等保密信息。否则，因此导致万才平台及/或万才平台企业商家或其关联公司的损失，由您负责赔偿。
3、 除本协议事项外，您不能以万才平台及/或万才平台企业商家的名义开展任何与完成约定的任务无关的业务或活动。
4、 您保证活动过程中遵守国家法律法规等相应规定，不得从事违反法律、法规等行为（包括但不限于涉嫌洗钱、偷税、漏税、逃税）。
5、 您充分理解自由职业者的定义，并承诺不存在下列所述之任一情形：
1）、 与万才平台企业商家（含关联方）具有劳动/劳务合同关系或其他类似的劳动人事法律关系；
2）、为万才平台企业商家（含关联方）的法定代表人、股东、董事、监事；
3）、 军人、公职人员等国家法律法规和纪律规定禁止从事兼职或经商的人员；
4）、 其他不适用于本协议本协议服务范围之规定的人员。
5）、您保证向万才平台提供的信息均是真实的、有效的、合法的，如信息发生变更（例如，不再是自由职业者身份时）应及时通知万才平台，否则因此造成的一切不利后果由您承担。
6）、您应自行负担就您取得的生产经营收入需缴纳的各项税款。
7）、为确保您按时尽责地完成万才平台以及万才平台企业商家要求的任务内容，并达到规定的质量标准，您同意万才平台向您收取服务保证金，您同意万才平台按照万才平台的规则对您进行考核以及对保证金进行处置，如保证金不足的，您应及时予以补足。

7.5  服务费用的支付
1、 您的费用由万才平台企业商家直接支付，或由万才平台企业商家及您授权万才平台指定的具有第三方结算资质的结算机构代为与您进行结算。
2、 您同意，您不可撤销地授权万才平台和万才平台企业商家或万才平台指定的具有第三方结算资质的第三方结算机构有权为提供上述费用结算服务的需要获取您的相关信息（包括但不限于个人身份信息、实名登记手机号码、银行账户相关信息等），并将您的相关信息提交第三方机构进行身份验证。如因您提供信息有误导致付款失败的，您独自承担相应责任。您承诺其使用所提供的账户应符合中华人民共和国法律的规定，如果万才平台收到万才平台主管税务机关或/及其他相关国家机关任何调查请求的，您应提供协助并如实反映情况。若您提供任何错误、虚假、失效或不完整的资料，或者万才平台或万才平台企业商家有合理的理由怀疑资料为错误、虚假、过期或不完整，万才平台企业商家（包括授权的第三方支付机构）有权暂停或终止向您支付部分或全部服务费用，对此万才平台或万才平台企业商家不承担任何责任，您承诺并同意负担因此所产生的所有损失，包括但不限于直接损失、间接损失。若因国家法律法规、部门规章或监管机构的要求，万才平台或万才平台企业商家需要您补充提供任何相关资料时，如您不能及时配合提供，万才平台有权暂停或终止向您提供部分或全部服务。
3、    万才平台不承担您任何社保福利待遇，也不负责您的任何医疗保险费用。


八、协议终止
1、您同意，万才平台有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部万才平台服务，暂时冻结或永久冻结（注销）您的账户在万才平台的权限，且无须为此向您或任何第三方承担任何责任。
2、出现以下情况时，万才平台有权直接以注销账户的方式终止本协议，并有权永久冻结（注销）您的账户在万才平台的权限和收回账户：
a）、万才平台终止向您提供服务后，您涉嫌再一次直接或间接以他人名义注册为万才平台用户的；
b）、您提供的用户信息中的主要内容不真实或不准确或不及时或不完整；
c）、本协议（含规则）变更时，您明示并通知万才平台不愿接受新的服务协议的；
d）、其它万才平台认为应当终止服务的情况。
e）、您若反对任何服务条款的建议或对后来的条款修改有异议，或对万才平台服务不满，您只有以下的追索权：
①不再使用万才平台服务。
②结束用户使用万才平台服务的资格。
③通告万才平台停止该用户的服务
结束用户服务后，即协议终止。您使用万才平台服务的权利马上终止。从那时起，万才平台不再对您承担任何义务。
3、您的账户服务被终止或者账户在万才平台的权限被永久冻结（注销）后，万才平台没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。
4、您同意，您与万才平台的合同关系终止后，万才平台仍享有下列权利：
a）、继续保存您的用户信息及您使用万才平台平台服务期间的所有交易信息。
b）、您在使用万才平台服务期间存在违法行为或违反本协议和／或规则的行为的，万才平台仍可依据本协议向您主张权利。
5、万才平台中止或终止向您提供万才平台服务后，对于您在服务中止或终止之前的交易行为依下列原则处理，因此产生的任何争议、损失或增加的任何费用等一切责任均您承担，您还应确保万才平台免于因此产生任何损失或承担任何费用；
a）、您在服务中止或终止之前已经上传至万才平台的交易尚未交易的，万才平台有权在中止或终止服务的同时删除此项交易的相关信息；
b）、您在服务中止或终止之前已经与其他用户达成交易，但交易尚未实际履行的，万才平台有权删除与该交易的相关信息；
c）、您在服务中止或终止之前已经与其他用户达成交易且已部分履行的，万才平台可以不删除该项交易信息，但万才平台有权在中止或终止服务的同时将相关情形通知您的交易对方。


九、知识产权条款
1、万才平台之域名、商标，以及万才平台内所有信息内容，包括但不限于网站架构、文字、图片、软件、音频、视频、用户等级／评价体系／信用体系／榜单等数据信息，以及所有万才平台使用之所有技术、数据分析模型计算机软件、数据库（第三方创建并保留所有权和／或知识产权的除外），其所有权知识产权均归属万才平台唯一所有，未经万才平台书面许可，任何人均不得擅自进行全部和局部复制转载、引用和链接等使用和处分。
2、用户在万才平台发布的任何信息和内容（用户隐私信息除外），包括但不限于文字、图片、软件、音频、视频等，均被视为永久、免费且不可撤销地许可万才平台自行或许可其关联方、业务合作方、宣传方不受任何限制的使用和处分。
3、任何单位或者个人不得以任何方式引诱万才平台用户或者第三方复制转载万才平台之信息内容，或者同意该用户或者第三方复制转载万才平台内容。
4、任何违反万才平台知识产权声明的行为，万才平台保留进一步追究法律责任的权利。

十、隐私权政策
万才平台将在万才平台公布并不时修订隐私权政策，隐私权政策构成本协议的有效组成部分。

十一、法律适用、管辖与其他
1、本协议之效力、解释、変更、执行与争议解决均适用中华人民共和国大陆地区法律，如无相关法律规定的，则应参照通用国际商业惯例或行业惯例。
2、因本协议产生之争议需根据您使用的服务归属的平台确定具体的争议对象，因您使用万才平台服务所产生的争议应由万才平台的经营者与您直接沟通并处理。一旦产生不可调和的争议，您与万才平台的经营者均同意该争议统一归万才科技（杭州）有限公司所在地相应级别的法院管辖。
3、  因履行本协议发生的纠纷，应友好协商解决，协商不成的，提请万才平台运营商所在地有管辖权的人民法院管辖解决。
4、 万才平台有权根据业务需要修改本协议条款。
5、 除本协议另有约定外，在履行本协议过程中的一切通知，万才平台均可通过网页公告、电子邮件、系统通知、短信提醒或其他合理方式进行，该等通知于发送之日视为已送达收件人。
6、本协议所称万才平台的运营商为万才科技（杭州）有限公司，如涉及所在地等确定等，均以万才科技（杭州）有限公司为准。


签署声明
您已经充分知悉且已理解本协议全部內容，保证网络流程操作者已获有效授权并足以代表自己或者授权人订立本协议。
        </pre>
                </div>
            </div>
    </el-dialog>
    <el-dialog
          title="请选择一个角色认证"
          class="setRoot5Scoped setMiddleDialog"
          :visible.sync="roleVisible1"
          width="640px"
          :close-on-click-modal="false"
          border>
            <div class="roleItemCon itemOne" @click="selectRoleAction(1)">
                <img class="roleImg" :src="roleArr[0].src">
                <div class="roleTextCon">
                    <div class="roleTitle">{{roleArr[0].title}}</div>
                    <div class="roleDes">{{roleArr[0].des}}</div>
                </div>
                <span class="changeColorHere"><div class="fakeIcon1 fakeIcon"></div></span>
            </div>
            <div class="roleItemCon itemTwo" @click="selectRoleAction(2)">
                <img class="roleImg" :src="roleArr[1].src">
                <div class="roleTextCon">
                    <div class="roleTitle">{{roleArr[1].title}}</div>
                    <div class="roleDes">{{roleArr[1].des}}</div>
                </div>
                <span class="changeColorHere"><div class="fakeIcon2 fakeIcon"></div></span>
            </div>
        </el-dialog>
        <div v-if="roleVisible2" class="fakeMask">
            <MultipleRoles @closeAction="closeBridge" :rolesList="rolesList"></MultipleRoles>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data(){
            return {
                activeNow:0,
                rolesList:[],
                clickTrackId:'',
                roleArr:[
                    {
                        src:require('@/assets/role_company.svg'),
                        title:"企业商家",
                        des:'企业，需提供统一社会信用代码并上传营业执照，进行企业实名认证',
                    },
                    { 
                        src:require('@/assets/role_person.svg'),
                        title:"个人商家",
                        des:'个人，需进行个人实名认证',
                    }
                ],
                roleVisible1:false,
                roleVisible2:false,
                content:'asdas',
                visible:false,
                checked:false,
                loginForm:{
                    account:'',
                    phone:'',
                    password:'',
                    yzm:'',
                },
                isRequest:false,
                buttonText:'获取验证码',
                labelPosition:'top',
                wating:60,
                isTabPhone:true,
                isSendYzm:false,
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    yzm: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
//                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                itemBridge:{},
            }
        },
        computed:{
            isEmptyForm(){
                if(this.isTabPhone){
                    if(this.loginForm.account && this.loginForm.password && this.checked ){
                        return false
                    }else {
                        return true
                    }
                }else{
                    if(this.loginForm.phone && this.loginForm.yzm && this.checked){
                        return false
                    }else {
                        return true
                    }
                }
            }
        },
        mounted(){
            this.clearStateAction();
        },
        methods:{       
            closeBridge(){
                this.roleVisible2 = false;
            },
            selectItem(item){
                this.clickTrackId = item.customerId;
                this.itemBridge = item;
            },
            selectRoleAction(item){
                this.activeNow = item;   
                this.$router.push({
                    name: 'certification',
                    query:{
                        show:'show'+item,
                    },
                });
            },
            popAgreement(){
                this.visible = true;
            },
            sendCode(){
                if(!this.loginForm.phone){
                    return this.$message({
                        message: '请输入手机号!',
                        type: 'error'
                    });
                }
                this.isSendYzm = true;
                const params = {
                    mobile: this.loginForm.phone,
                };
                this.wating = 60;
                this.$message({
                    message: '验证码已发送',
                    type: 'success'
                });
                this.ApiLists.getSmsCode(params).then(res => {
                    if (res.respCode === 0) {
                        let that = this;
                        let timing = setInterval(function () {
                            if (that.wating < 0) {
                                that.isSendYzm = false;
                                that.buttonText = '获取验证码';
                                window.clearInterval(timing)
                            } else {
                                that.buttonText = that.wating + '秒后重试';
                                that.wating--;
                            }
                        },1000)
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            },
            clearStateAction(){
                localStorage.removeItem('webToken');
                this.$store.commit('reInitVuexData');
            },
            go(){
                if(this.isRequest){return}
                this.isRequest = true;
                this.$refs['loginForm'].validate(async (valid) => {
                    if (valid) {
                        let data = {};
                        if(this.isTabPhone){
                            data = {
                                mobile:`${this.loginForm.account}`,
                                pwd:this.loginForm.password,
                            };
                            this.commonMultiLogin(data);
                        }else{
                            data = {
                                mobile:`${this.loginForm.phone}`,
                                code:this.loginForm.yzm,
                            };
                            this.smsMultiLogin(data);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                setTimeout(()=>{
                    this.isRequest = false
                },500)
            },
            getUseInfo(){
                this.ApiLists.getBaseInfo().then(res=>{
                    if(res.respCode === 0){
                        this.$store.commit('setWebInfo',res.data)
                        if( res.data.isAuthenticate != null   ){
                            if( res.data.isAuthenticate ){
                                this.$router.push({
                                    path: '/main',
                                });
                            }else{
                                this.roleVisible1 = true;
                            }
                        }
                    }
                })
            },
            special2Step(name){
                let params1 = {
                    loginName:name,
                };
                this.ApiLists.loginNintendoSwitch(params1).then(res=>{
                    let { respCode } = res;
                    if( respCode == 0 ){
                        this.getUseInfo();
                    }   
                }).catch(err=>{
                    console.log('err',err);
                })
            },   
            specialStep(){
                let params1 = {
                    calLatest:true,
                };
                this.ApiLists.fetchMobileAccount(params1).then(res=>{
                    let { respCode,data } = res;
                    if( respCode == 0 ){
                        if( data&&data.length == 1 ){
                            this.roleVisible1 = false;
                            this.roleVisible2 = false;
                            this.special2Step(data[0].loginName);
                        }
                        if( data&&data.length > 1 ){
                            this.roleVisible2 = true;
                            this.rolesList = data;
                        }
                    }   
                }).catch(err=>{
                    console.log('err',err);
                })
            },    
            commonMultiLogin(params){
                this.ApiLists.multiLogin(params).then(res=>{
                    let { respCode } = res;
                    if( respCode === 0 ){
                        this.specialStep();
                    }else{
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            }, 
            smsMultiLogin(params){
                this.ApiLists.multiLogin(params).then(res=>{
                    let { respCode } = res;
                    if( respCode === 0 ){
                        this.specialStep();
                    }else{
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            }, 
            enterReaction(){
                this.go('loginForm');
            },
        },
    }
</script>
<style lang="scss" scoped>
    .login {
        background-origin: border-box;
        background-repeat:no-repeat;
        background-position: 50%;
        background-image: url(../assets/loginBg.jpg);
        background-size:cover;
        height: 100vh;
        min-height: 500px;
    }
    .fakeMask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        margin: 0;
        z-index: 1000;
        background-color: rgba(0,0,0,0.7)
    }
    .roleItemCon {
        display: flex;
        justify-content:space-between;
        align-content: center;
        align-items: center;
        height: 104px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .roleImg {
        width: 40px;
        height: 40px;
        margin-left: 30px;
        margin-right: 30px;
    }
    .roleTextCon {
        width:470px;
    }
    .roleTitle {
        color: #303133;
        font-size: 20px;
    }
    .roleDes {
        color: #909399;
        font-size: 14px;
    }
    .changeColorHere {
        margin-right: 20px;
    }
    .fakeIcon {
        width: 20px;
        height: 20px;
        background-image: url(../assets/detail_grey.svg);
        background-origin: border-box;
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center;
    }
    .itemOne {
        &:hover {
            background:rgba(64,158,255,0.1);
            border-radius:8px;
            .roleTitle {
                color: #409EFF;
            }
            .roleDes {
                color: #409EFF;
            }
            .changeColorHere {
                color: #409EFF;
            }
            .fakeIcon1 {
                background-image: url(../assets/detail_blue.svg)  !important;
            }
        }
    }
    .itemTwo {
        &:hover {
            background:rgba(230,162,60,0.1);
            border-radius:8px;
            .roleTitle {
                color: #E6A23C;
            }
            .roleDes {
                color: #E6A23C;
            }
            .changeColorHere {
                color: #E6A23C;
            }
            .fakeIcon2 {
                background-image: url(../assets/detail_orange.svg) !important;
            }
        }
    }
    .agreementCon {
        height: 310px;
        overflow-y: scroll;
         .itself  {
             pre {
                 word-break: break-all;
                 text-align: justify;
                 white-space: pre-line;
             }
        }
    }
    .blueHere {
        color: #409EFF;
        font-size: 14px;
        cursor: pointer;
    }
    .setCenter {
        width:930px;
        height:520px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 40px 0px rgba(31,34,51,0.1);
        border-radius:20px;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        box-sizing: border-box;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .center-left{
            width:390px;
            height: 520px;
            background:url("../assets/welcome.png");
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
        }
        .center-right{
            width: 540px;
            padding: 60px 80px 0;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                color: #303133;
                font-size: 24px;
                font-weight: 500;
                height: 30px;
                margin-bottom:50px;
            }
            .login-btn{
                width: 100%;
                height: 40px;
                margin-top: 40px;
            }
        }
    }
</style>
<style lang="scss">
    .login {
        position: relative;
          .setRoot4Scoped {
            .el-dialog {
              border-radius: 10px;
              height: 420px;
            }
          }
        .setRoot5Scoped {
            .el-dialog {
              border-radius: 10px;
              height: 324px;
            }
            .el-dialog__body {
                padding: 10px 20px 0;
            }
        }
        .login-left{
            position: absolute;
            left: 40px;
            top:20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 20px;
            color: #303133;
            img{
                display: flex;
                width: 40px;
                height: 40px;
                margin-right: 16px;
            }
        }
        .el-form--label-top .el-form-item__label{
            line-height: 34px;
            padding: 0;
        }
        .el-input__inner {
            border-width: 0;
            border-radius: 0;
            box-sizing: border-box;
            padding-left:0;
            text-indent: 10px;
        }
        .sent-btn{
            position: absolute;
            right: 0;
            color: #409EFF;
            font-size: 14px;
            border: none;
            background-color: transparent !important;
        }
        .el-input__prefix {
            left: 0px;
        }
        .el-input__icon {
            text-align: left;
            color: #606266;
        }
        .el-input--prefix .el-input__inner  {
            padding-left: 20px;
        }
        .el-input__inner {
            &:focus {
                border-bottom-color: #303133;
                border-bottom-width: 1px;
            }
        }
        .el-form-item.is-error .el-input__inner {
            border-bottom-width: 1px;
        }
    }
</style>