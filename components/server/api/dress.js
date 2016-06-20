/**
 * Created by chenjianjun on 16/2/26.
 */
import dress from '../cache/db/module/dress.js'
import _ from 'lodash'
import env from '../cache/config'
let r = env.Thinky.r

// 婚纱礼服
const dressApi = {
  // 获取礼服详情
  'get+/dress/:position': function*(next) {
    this.APIKey = 'Dress'
    if (this.params.position === 'all') {
      this.model = dress.filter({})
    } else {
      this.model = dress.filter({
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
      } else if(k.indexOf('pageSize') !== -1) {
        pageSize = parseInt(this.request.query['pageSize'] || '100')
        if (pageSize < 0) {
          pageSize = 1
        }
      } else if(k.indexOf('brandId') !== -1) {
        this.model = this.model.filter({
          brandId: parseInt(this.request.query["brandId"])})
      } else if(k.indexOf('typeId') !== -1) {
        this.model = this.model.filter({
          typeId: parseInt(this.request.query["typeId"])})
      }
    })

    try {
      let all = yield this.model
      this.count = all.length || 0
    } catch (e) {
      this.count = 0
    }

    this.model = this.model.orderBy(r.desc('weight'))
    this.model = this.model.skip(pageIndex * pageSize).limit(pageSize);

    // 只取有用的字段
    this.model = this.model.pluck("imageUrl","number");

    yield next
  }
}

export default dressApi
