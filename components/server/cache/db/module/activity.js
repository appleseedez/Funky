/**
 * Created by chenjianjun on 16/5/7.
 */
var env=require("../../config");
var type=env.Thinky.type;

// 活动模型
const Activity = env.Thinky.createModel('activity', {
  // Id
  id: type.number(),
  // 活动名称
  name: type.string(),
  // 描述
  description: type.string(),
  // 链接URL
  linkUrl: type.string(),
  // 活动幻灯片
  slideImages: type.string(),
  // 活动详情图片
  detailImages: type.string(),
  // 更新时间
  updateTime: type.string()
})

module.exports=Activity;
