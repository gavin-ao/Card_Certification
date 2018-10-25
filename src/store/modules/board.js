const state = {
  goLink: '',
  address: '',
  actShareTitle:'', //分享标题
  actTitle:'', //活动标题
  windowWidth: 0,
  windowHeight: 0,
  location: "",
  nickName: '',
  avatarUrl: '',
  qrcodeUrl:'',
  otherHelpId:'',
  myHelpId:'',
  actId:'',
  sessionID:'',
  checked: false,
  checkedRule: false,
  checkedRules: false,
  exchangeProcess:false,
  existDoHelp: '',
  myExistDoHelp:'',
  drawAvatarUrl:'',
  partakeNums: 0,
  drawPoster:'',
  btnText:{},
  mainInfos:{
    actRule: '',  //活动规则
    exchangeRule: '', //兑换流程
    arrImage: [],
    rulesOfActivity: '',
    exithelpId: '',
    contactsCondition: '',
    commandText: '',
    contentTitle: '', //领取奖励标题
    contentHead: '', //领取奖励头部
    contentMid: '', //领取奖励中部
    contentFoot: '', //领取奖励脚部
    contentBtn: '' //领取奖励按钮
  },
  actShareCopywriting:'',
  appid:'wx7ce4b9ce272d1817',
  secret:'d946a8de0df55661af48b97fa6de4d9b',
  headPic:[],
  // urlHttp:'https://dataanalysis.easy7share.com'
  urlHttp:'https://dataanalysis-cs.easy7share.com'
}

export default {
  state,
}
