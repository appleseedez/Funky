import { BaseConfig } from './base'
import _ from 'lodash'

const FollowPhotoConfig = {
  'Banner':[
    { 'imageUrl':'//img2.jsbn.com/static/hlgp.jpg' }
  ],
  'MediaSlider':_.merge({
    'dataUrl':'vda/weddingpat_top',
    'aspectRatio':'192:45',
    'height':450
  },BaseConfig),
  'SchemeListItem':_.merge({
    'countPlugin':true,
    'link':'followPhoto',
    'dataUrl':'followPhoto/weddingpat_list',
    'displayTextPrefix':'共有',
    'displayTextSuffix':'套婚礼跟拍',
    'params':{
      'pageSize':12,
      'pageIndex':1
    }
  },BaseConfig)
}


export { FollowPhotoConfig }
