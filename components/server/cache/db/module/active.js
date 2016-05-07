/**
 * Created by chenjianjun on 16/5/7.
 */
var env=require("../../config");
var type=env.Thinky.type;

// 活动模型
const Active = env.Thinky.createModel('active', {
  // Id
  id: type.number(),
  // 活动名称
  name: type.string(),
  // 活动幻灯片
  adv: type.array(),
  // 活动详情
  info: type.array(),
})

module.exports=Active;
