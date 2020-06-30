export const dictionary = {
  taskType:{
      1:'自有任务',
      2:'指派任务'
  },
  settlementType:{
      1:'日结',
      2:'月结',
      4:'周结',
  },
  processStatus:{
      1:'待执行',2:'执行中',3:'已完成',4:'已关闭'
  },
  valuationType :{
      1:'计时',2:'固定计量',3:'阶梯计量',4:'组合计量', 5:'计时+固定计量',6:'计时+阶梯计量',7:'计时+组合计量',8:'日固定'
  },
  endWorkType:{
      1:'当日',
      2:'次日'
  },
  sexLimt:{
      1:'男',
      2:'女',
      3:'不限'
  },
  needPriceCheck:{//是否需要普工单价审核（0.不需要审核1.需要审核）
      0:'不启用',
      1:'启用'
  },
  isFacePunch:{//人脸打卡（0不需要1需要）
      0:'不启用',
      1:'启用'
  },
  punchWay:{
      1:'扫码打卡',
      2:'自主打卡'
  },
  needConfirm:{
      0:'不启用',
      1:'启用'
  },
  rewardLimit:{//排班内奖惩限制
      0:'不启用',
      1:'启用'
  },
  isModifyPunch:{//是否开启修改考勤
      0:'不启用',
      1:'启用'
  },
  autoScheduling:{//是否开启自动排班
      0:'不启用',
      1:'启用'
  },
  confirmStatus:{
      1:'待发送',
      2:'待确认',
      3:'已第三方结算确认'
  }
};
export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$dictionary' , { value: dictionary });
  }
};