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
import env from '../cache/config.js'
let r = env.Thinky.r

const filterConditionApi = {
  'get+/exterior/all':function*(next){ //外景
    this.APIKey = 'FilterConditionExterior';

    if (this.params.position === 'all') {
      this.model = filterConditionExterior.filter({})
    } else {
      this.model = filterConditionExterior.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    // TODO:exteriorId name

    yield next
  },

  'get+/shootStyle/all':function*(next){ //风格
    this.APIKey = 'FilterConditionShootStyle';

    if (this.params.position === 'all') {
      this.model = filterConditionShootStyle.filter({})
    } else {
      this.model = filterConditionShootStyle.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    // TODO:shootStyleId name

    yield next
  },

  'get+/hotelType/all':function*(next){ // 酒店类型
    if (this.params.position === 'all') {
      this.model = filterConditionHotelType.filter({})
    } else {
      this.model = filterConditionHotelType.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    this.APIKey = 'FilterConditionHotelType';
    yield next
  },

  'get+/caseStyle/all':function*(next){ //案例风格
    this.APIKey = 'FilterConditionCaseStyle';

    if (this.params.position === 'all') {
      this.model = filterConditionCaseStyle.filter({})
    } else {
      this.model = filterConditionCaseStyle.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: caseStyleId name

    yield next
  },

  'get+/hotelDistrict/all':function*(next){ //酒店区域
    if (this.params.position === 'all') {
      this.model = filterConditionHotelDistrict.filter({})
    } else {
      this.model = filterConditionHotelDistrict.filter({
        position: this.params.position
      })
    }

    _.each(this.request.query, (v, k) => {
      if (k.indexOf('pageSize') !== -1) {
        let limit = 0
        limit = Number(this.request.query['pageIndex'] || '1') - 1
        if (limit < 0) {
          limit = 0
        }
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    this.model = this.model.orderBy(r.desc('weight'))

    this.APIKey = 'FilterConditionHotelDistrict';
    yield next
  },

  'get+/carModels/all':function*(next){ // 婚礼租车型号
    this.APIKey = 'FilterConditionCarModels';

    if (this.params.position === 'all') {
      this.model = filterConditionCarModels.filter({})
    } else {
      this.model = filterConditionCarModels.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: modelsId name

    yield next
  },

  'get+/carLevel/all':function*(next){ // 婚礼租车档次
    this.APIKey = 'FilterConditionCarLevel';

    if (this.params.position === 'all') {
      this.model = filterConditionCarLevel.filter({})
    } else {
      this.model = filterConditionCarLevel.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: levelId name

    yield next
  },

  'get+/carBrand/all':function*(next){ // 婚礼租车品牌
    this.APIKey = 'FilterConditionCarBrand';

    if (this.params.position === 'all') {
      this.model = filterConditionCarBrand.filter({})
    } else {
      this.model = filterConditionCarBrand.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: brandId name

    yield next
  },

  'get+/suppliesBrand/all':function*(next){ // 婚礼用品品牌
    this.APIKey = 'FilterConditionSuppliesBrand';

    if (this.params.position === 'all') {
      this.model = filterConditionSuppliesBrand.filter({})
    } else {
      this.model = filterConditionSuppliesBrand.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: brandId name

    yield next
  },

  'get+/suppliesType/all':function*(next){ // 婚礼用品类型
    this.APIKey = 'FilterConditionSuppliesType';

    if (this.params.position === 'all') {
      this.model = filterConditionSuppliesType.filter({})
    } else {
      this.model = filterConditionSuppliesType.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    //todo: typeId name

    yield next
  },

  // 婚纱礼服--类型
  'get+/dressType/all':function*(next){
    this.APIKey = 'FilterConditionDressType';

    if (this.params.position === 'all') {
      this.model = filterConditionDressType.filter({})
    } else {
      this.model = filterConditionDressType.filter({
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
        this.model = this.model.skip(limit * Number(this.request.query["pageSize"] || '10'));
        this.model = this.model.limit(Number(this.request.query["pageSize"] || '10'));
      }
    })

    // todo:typeId name

    yield next
  },

  // 婚纱礼服--品牌
  'get+/dressBrand/all':function*(next){
    this.APIKey = 'FilterConditionDressBrand';

    this.model = filterConditionDressBrand;

    let pageIndex = 0;
    let pageSize = 10;
    _.each(this.request.query, (v, k) => {
      if (k.indexOf('pageIndex') !== -1) {
        pageIndex = parseInt(this.request.query['pageIndex'] || '1') - 1
        if (pageIndex < 0) {
          pageIndex = 0
        }
      } else if(k.indexOf('pageSize') !== -1) {
        pageSize = parseInt(this.request.query['pageSize'] || '1')
        if (pageSize < 0) {
          pageSize = 1
        }
      } else if(k.indexOf('position') !== -1) {
        this.model = this.model.filter({
          position: this.params.position})
      } else if(k.indexOf('typeId') !== -1) {
        this.model = filterConditionDressBrand.filter({
          type: parseInt(this.request.query["typeId"])
        })
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

    //todo brandId coverUrlWeb name logoUrl

    yield next
  }

}
export default filterConditionApi
