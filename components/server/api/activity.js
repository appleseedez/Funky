/**
 * Created by chenjianjun on 16/5/9.
 */
import activity from '../cache/db/module/activity'
import _ from 'lodash'
import env from '../cache/config'
let r = env.Thinky.r

const activityApi = {
  // 广告
  'get+/activity/:position': function*(next) {

    if (this.params.position === 'all') {
      this.model = activity.filter({})
    } else {
      this.model = activity.filter({
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

    this.APIKey = 'Activity'
    yield next
  }

}
export default activityApi
