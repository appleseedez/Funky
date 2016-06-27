/**
 * Created by chenjianjun on 16/5/9.
 */
import activity from '../cache/db/module/activity'
import _ from 'lodash'
import env from '../config'
let r = env.Thinky.r

const activityApi = {
  // 广告
  'get+/activity/detail/:name': function*(next) {

    this.model = activity.filter({
      name: this.params.name
    })

    this.APIKey = 'Activity'
    yield next
  }
}

export default activityApi
