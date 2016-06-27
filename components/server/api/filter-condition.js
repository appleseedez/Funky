/** TODO
  列表搜索条件接口全部放这里
**/
import filterConditionShootStyle from '../cache/db/module/filterCondition/shootStyle.js'
import filterConditionExterior from '../cache/db/module/filterCondition/exterior.js'
import filterConditionHotelType from '../cache/db/module/filterCondition/hotelType.js'
import filterConditionHotelDistrict from '../cache/db/module/filterCondition/hotelDistrict.js'

import filterConditionCarModels from '../cache/db/module/filterCondition/carModels.js'
import filterConditionCarLevel from '../cache/db/module/filterCondition/carLevel.js'
import filterConditionCarBrand from '../cache/db/module/filterCondition/carBrand.js'
import filterConditionSuppliesBrand from '../cache/db/module/filterCondition/suppliesBrand.js'
import filterConditionSuppliesType from '../cache/db/module/filterCondition/suppliesType.js'
import filterConditionCaseStyle from '../cache/db/module/filterCondition/caseStyle.js'


import filterConditionDressType from '../cache/db/module/filterCondition/dressType.js'
import filterConditionDressBrand from '../cache/db/module/filterCondition/dressBrand.js'

import _ from 'lodash'
import env from '../config.js'
let r = env.Thinky.r

const filterConditionApi = {
  // 拍摄外景
  'get+/exterior/all':function*(next){
    this.APIKey = 'FilterConditionExterior';

    this.model = filterConditionExterior;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("exteriorId","name");

    yield next
  },

  // 拍摄风格
  'get+/shootStyle/all':function*(next){
    this.APIKey = 'FilterConditionShootStyle';

    this.model = filterConditionShootStyle;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("shootStyleId","name");

    yield next
  },

  // 酒店类型
  'get+/hotelType/all':function*(next){
    this.APIKey = 'FilterConditionHotelType';

    this.model = filterConditionHotelType;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("typeId","name");

    yield next
  },

  //案例风格
  'get+/caseStyle/all':function*(next){
    this.APIKey = 'FilterConditionCaseStyle';

    this.model = filterConditionCaseStyle;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("caseStyleId","name");

    yield next
  },

  //酒店区域
  'get+/hotelDistrict/all':function*(next){
    this.APIKey = 'FilterConditionHotelDistrict';

    this.model = filterConditionHotelDistrict;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("id","name");

    yield next
  },

  // 婚礼租车型号
  'get+/carModels/all':function*(next){
    this.APIKey = 'FilterConditionCarModels';

    this.model = filterConditionCarModels;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("modelsId","name");

    yield next
  },

  // 婚礼租车档次
  'get+/carLevel/all':function*(next){
    this.APIKey = 'FilterConditionCarLevel';

    this.model = filterConditionCarLevel;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("levelId","name");

    yield next
  },

  // 婚礼租车品牌
  'get+/carBrand/all':function*(next){
    this.APIKey = 'FilterConditionCarBrand';

    this.model = filterConditionCarBrand;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("brandId","name");

    yield next
  },

  // 婚礼用品品牌
  'get+/suppliesBrand/all':function*(next){
    this.APIKey = 'FilterConditionSuppliesBrand';

    this.model = filterConditionSuppliesBrand;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("brandId","name");

    yield next
  },

  // 婚礼用品类型
  'get+/suppliesType/all':function*(next){
    this.APIKey = 'FilterConditionSuppliesType';

    this.model = filterConditionSuppliesType;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("typeId","name");

    yield next
  },

  // 婚纱礼服--类型
  'get+/dressType/all':function*(next){
    this.APIKey = 'FilterConditionDressType';

    this.model = filterConditionDressType;
    this.model = this.model.orderBy(r.desc('weight'))

    // 只取有用的字段
    this.model = this.model.pluck("typeId","name");

    yield next
  },

  // 婚纱礼服--品牌
  'get+/dressBrand/all':function*(next){
    this.APIKey = 'FilterConditionDressBrand';


    //let pageIndex = 0;
    //let pageSize = 10;
    _.each(this.request.query, (v, k) => {
      //if (k.indexOf('pageIndex') !== -1) {
      //  pageIndex = parseInt(this.request.query['pageIndex'] || '1') - 1
      //  if (pageIndex < 0) {
      //    pageIndex = 0
      //  }
      //} else if(k.indexOf('pageSize') !== -1) {
      //  pageSize = parseInt(this.request.query['pageSize'] || '1')
      //  if (pageSize < 0) {
      //    pageSize = 1
      //  }
      //} else if(k.indexOf('position') !== -1) {
      //  this.model = this.model.filter({
      //    position: this.params.position})
      //} else
      if(k.indexOf('typeId') !== -1) {
        this.model = filterConditionDressBrand.filter({
          type: parseInt(this.request.query["typeId"])
        })
      }
    })
    //
    //try {
    //  let all = yield this.model
    //  this.count = all.length || 0
    //} catch (e) {
    //  this.count = 0
    //}

    this.model = this.model.orderBy(r.desc('weight'))
    //this.model = this.model.skip(pageIndex * pageSize).limit(pageSize);

    // 只取有用的字段
    this.model = this.model.pluck("brandId","name","logoUrl","coverUrlWeb","type");

    yield next
  }

}
export default filterConditionApi
