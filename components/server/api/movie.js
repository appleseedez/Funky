/**
 * Created by chenjianjun on 16/2/25.
 */

import wdyVideo from '../cache/db/module/movie.js'
import _ from 'lodash'
import env from '../config'
let r = env.Thinky.r

// 微电影
const wdyVideoApi = {
  // 获取微电影
  'get+/video/:position': function*(next) {
    this.APIKey = 'Movie'
    if (this.params.position === 'all') {
      this.model = wdyVideo.filter({})
    } else {
      this.model = wdyVideo.filter({
        position: this.params.position
      })
    }

    let pageIndex = 0;
    let pageSize = 10;
    _.each(this.request.query, (v, k) => {
      if (k.indexOf('pageIndex') !== -1) {
        pageIndex = parseInt(this.request.query['pageIndex'] || '1') - 1
        if (pageIndex < 0) {
          pageIndex = 0
        }
      } else if (k.indexOf('pageSize') !== -1) {
        pageSize = parseInt(this.request.query['pageSize'] || '1')
        if (pageSize < 0) {
          pageSize = 1
        }
      }  else if(k.indexOf('videoType') !== -1) {
        this.model = this.model.filter({type: Number(this.request.query['videoType'])})
      } else if (k.indexOf('sort') !== -1) {
        if (this.request.query["sort"] == "date") {
          this.model = this.model.orderBy(r.desc('updateTime'));
        }
      }
    })

    try {
      let all = yield this.model
      this.count = all.length || 0
    } catch (e) {
      this.count = 0
    }

    this.model = this.model.orderBy(r.desc('weight'))
    this.model = this.model.skip(pageIndex * pageSize).limit(pageSize)

    // 只取有用的字段
    this.model = this.model.pluck("name","coverUrlWeb","description", "id");

    yield next
  },

  // 微电影详情
  'get+/video/detail/:id': function*(next) {
    this.APIKey = 'Movie'

    this.model = wdyVideo.filter({
      id: parseInt(this.params.id)
    })

    // 只取有用的字段
    this.model = this.model.pluck("name","coverUrlWeb","description", "videoUrl");

    yield next
  }
}
export default wdyVideoApi
