import { BaseConfig } from './base'
import _ from 'lodash'

const PringlesDetailsConfig  = {
  'PringlesDetails':_.merge({
    'dataUrl':'pringles/detail/:id'
  },BaseConfig),

  'ShotListItem':_.merge({
    'dataUrl':'pringles/pringles_view_list?pageSize=20&pageIndex=1',
  },BaseConfig),
}


export { PringlesDetailsConfig }
