import { BaseConfig } from './base'
import _ from 'lodash'

const MovieConfig = {
  // 顶部广告
  'MediaSlider':_.merge({
    'dataUrl':'vda/movie_top',
    'aspectRatio':'192:45',
    'height':450
  },BaseConfig),

  //静态banner
  'Banner':[
    {
      'imageUrl':'//img2.jsbn.com/static/wdy.jpg'
    }
  ],

  // 最新微电影
  'NewMovie':_.merge({
    'dataUrl':'video/movie_list?sort=date&pageIndex=1&pageSize=6'
  },BaseConfig),

  // 纪实MV
  'MVMovie':_.merge({
    'dataUrl':'video/movie_list?videoType=3'
  },BaseConfig),

  // 爱情微电影
  'LoveMovie':_.merge({
    'dataUrl':'video/movie_list?videoType=2'
  },BaseConfig),

  // 爱情MV
  'LoveMovieMV':_.merge({
    'dataUrl':'video/movie_list?videoType=1'
  },BaseConfig)
}

export { MovieConfig }
