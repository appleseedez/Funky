import adv from '../cache/db/module/adv.js'
import _ from 'lodash'
import env from '../config'
let r = env.Thinky.r
const advApi = {
  // 广告
  'get+/vda/:position': function*(next) {
    this.APIKey = 'Adv'

    if (this.params.position === 'all') {
      this.model = adv.filter({})
    } else {
      this.model = adv.filter({
        position: this.params.position
      })
    }
    this.model = this.model.orderBy(r.desc('weight'))
    _.each(this.request.query, (v, k) => {
      if (k.indexOf('pageSize') !== -1) {
        let limit = 0
        limit = Number(this.request.query['pageIndex'] || '1') - 1
        if (limit < 0) {
          limit = 0
        }
        this.model = this.model.skip(limit * parseInt(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(parseInt(this.request.query["pageSize"] || '10'));
      }
    })

    // 只区有用的字段
    this.model = this.model.pluck("coverUrlWeb","coverUrlWx","videoUrl","linkUrl","name","description");

    yield next
  }

}
export default advApi
