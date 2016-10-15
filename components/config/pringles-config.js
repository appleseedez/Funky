import { BaseConfig } from './base'
import { EmImgProcessType } from '../common/media-item.jsx'
import _ from 'lodash'

const PringlesConfig  = {
  //静态banner
  'Banner':[
    { 'imageUrl': '//img2.jsbn.com/static/kpxs.jpg' }
  ],
  'ShotListItem':_.merge({
    'type':'pringles',
    'link':'/pringles',
    'aspectRatio': '3:2',
    'height' : 400,
    'processType' : EmImgProcessType.emGD_S_S,
    'countPlugin':false, // 是否需要显示列表的数据总数
    'dataUrl':'pringles/pringles_view_list',
    'displayTextPrefix':'客片欣赏',
    'displayTextSuffix':'套',
    'params':{
      'pageSize':9,
      'pageIndex':1
    }

  },BaseConfig),
  'Episode':_.merge({
    'dataUrl':'pringlesSeason/all',
    'aspectRatio':'3:2',
    'height':140
  },BaseConfig),
  'EpisodeListItem':_.merge({
    'type':'pringles',
    'link':'/pringles',
    'params':{}

  },BaseConfig),
  'MediaSlider':_.merge({
    'dataUrl':'vda/pringles_top',
    'aspectRatio':'192:45',
    'height':450
  },BaseConfig),

  // 客片推荐
  PringlesRecommend:_.merge({
    dataUrl:'pringles/pringles_recommend?pageIndex=1&pageSize=2',
    aspectRatio:'3:2',
    height:380
  },BaseConfig),
}


export { PringlesConfig }
