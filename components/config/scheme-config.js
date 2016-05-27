import _ from 'lodash'
import { BaseConfig } from './base'

const SchemeConfig = {
  // 顶部广告
  'MediaSlider':_.merge({
    'dataUrl':'vda/scheme_index_top',
    'aspectRatio':'192:68',
    'height':680
  },BaseConfig),

  // 静态banner
  'Banner':[
    {
      'imageUrl':'//img2.jsbn.com/static/hqdz.jpg'
    }
  ],

  // 婚庆定制最新动态
  'SchemeImageHot': _.merge({
    'dataUrl': 'vda/scheme_index_hot?pageIndex=1&pageSize=5', // 数据请求地址
  },BaseConfig),

  // 最佳案例热区
  BestCasesHot: _.merge({
    'dataUrl': 'cases/scheme_index_recommend_list?pageIndex=1&pageSize=9', // 数据请求地址
  },BaseConfig),

  // 婚礼用品&婚车租赁热区
  SupplyCarHot: _.merge({
    'dataUrl': 'vda/scheme_car_and_supplies?pageIndex=1&pageSize=4', // 数据请求地址
  },BaseConfig),

  'PhotoGallery':[
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_01.jpg' },
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_02.jpg' },
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_03.jpg' },
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_04.jpg' },
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_05.jpg' },
    { 'imageUrl':'//img2.jsbn.com/static/team/team-hqdz_06.jpg' }
  ],

  'NavGallery':[
    { 'link':'/f4?tab=dresser','klass':'hzs'},
    { 'link':'/f4?tab=host','klass':'zcr'},
    { 'link':'/f4?tab=photographer','klass':'sys'},
    { 'link':'/f4?tab=camera','klass':'sxs'}
  ]
}
export { SchemeConfig }
