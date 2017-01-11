/**
 * Created by chenjianjun on 16/6/24.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'
import { MenuConfig } from '../components/config/menu-config'
import { ComponentsIndex, ComponentsSeo } from '../components/config/components-index'
/*菜单*/
import { Navigation } from '../components/navigation.jsx'

const siteRouter = new Router()

let renderOption = (p) => {
  return {
    'title':ComponentsSeo[p.templateName].seoTitle,
    'seoKeywords':ComponentsSeo[p.templateName].seoKeywords,
    'seoDescription':ComponentsSeo[p.templateName].seoDescription,
    'reactMarkup': renderToString(ComponentsIndex[p.templateName]),
    'reactNavMarkup': renderToString(<Navigation menuKey={p.parentKey} currentKey={p.menuKey} isBafei={p.params.isBafei} />),
    'currentMenuKey':p.menuKey,
    'parentMenuKey':p.parentKey,
    'main': p.templateName,// 客户端渲染使用的脚本名称和模板名称一致
    'params':JSON.stringify(p.params),
    'mode':(process.env.NODE_ENV === 'production')?'production':'development'
  }
}

/**
 使用ejs引擎进行静态模板渲染
 在服务端。 所有的模块都是静态依赖导入。 目前采用手动方式。 只更改 components-index.js
 当前还是手动写此文件。等把流程跑通，会改为脚本生成此文件。 进一步减少工作量

 1. 配置人员在 menu-config.js 中新增菜单。 需要填写url结构，中文，因为名称
 2. 配置人员在 components-index.js 中指名 ejs模板和组件的对应关系
 3. routes根据 MenuConfig 和 ComponentsIndex 构建路由表
 4. 在components里面增加新的jsx
 5. 默认情况下。ejs会使用default.html进行jsx页面渲染。除非必要， 才需要用户新增自己的ejs模板页面
 例如：新的活动页（静态）
 **/

/** 首页 **/
siteRouter.get('/', function* index(next) {
  let p = {
    templateName:'home',
    menuKey:'/',
    parentKey:'/',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
siteRouter.get('/home', function* index(next) {
  let p = {
    templateName:'home',
    menuKey:'/home',
    parentKey:'/home',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})

/*********************************** 婚纱摄影 *************************************/
// 婚纱摄影首页
siteRouter.get('/shot', function* index(next) {
  let p = {
    templateName:'shot',
    menuKey:'/shot',
    parentKey:'/shot',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 作品(样片)
siteRouter.get('/sample', function* index(next) {
  let p = {
    templateName:'sample',
    menuKey:'/sample',
    parentKey:'/shot',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 作品(样片)详情
siteRouter.get('/sample/:id', function* index(next) {
  let p = {
    templateName:'sample-details',
    menuKey:'/sample',
    parentKey:'/shot',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 客片
siteRouter.get('/pringles', function* index(next) {
  let p = {
    templateName:'pringles',
    menuKey:'/pringles',
    parentKey:'/shot',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 客片详情
siteRouter.get('/pringles/:id', function* index(next) {
  let p = {
    templateName:'pringles-details',
    menuKey:'/pringles',
    parentKey:'/shot',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 套系
siteRouter.get('/suite', function* index(next) {
  let p = {
    templateName:'suite',
    menuKey:'/suite',
    parentKey:'/shot',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 套系详情
siteRouter.get('/suite/:id', function* index(next) {
  let p = {
    templateName:'suite-details',
    menuKey:'/suite',
    parentKey:'/shot',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 微电影
siteRouter.get('/movie', function* index(next) {
  let p = {
    templateName:'movie',
    menuKey:'/movie',
    parentKey:'/shot',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 微电影详情
siteRouter.get('/movie-details', function* index(next) {
  let p = {
    templateName:'movie-details',
    menuKey:'/movie',
    parentKey:'/shot',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.request.query),
  }

  yield this.render('modules/default', renderOption(p))
})

/************************************** 婚庆定制 ***************************************/
// 婚庆定制首页
siteRouter.get('/scheme', function* index(next) {
  let p = {
    templateName:'scheme',
    menuKey:'/scheme',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 实景案例
siteRouter.get('/cases', function* index(next) {
  let p = {
    templateName:'cases',
    menuKey:'/cases',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
      isLan:this.isLan,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 实景案例详情
siteRouter.get('/cases/:id', function* index(next) {
  let p = {
    templateName:'cases-details',
    menuKey:'/cases',
    parentKey:'/scheme',
    params:_.merge({
      isBafei:this.isBafei,
      isLan:this.isLan,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 婚礼跟拍
siteRouter.get('/followPhoto', function* index(next) {
  let p = {
    templateName:'follow-photo',
    menuKey:'/followPhoto',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 婚礼跟拍详情
siteRouter.get('/followPhoto/:id', function* index(next) {
  let p = {
    templateName:'follow-photo-details',
    menuKey:'/followPhoto',
    parentKey:'/scheme',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 婚礼视频
siteRouter.get('/followVideo', function* index(next) {
  let p = {
    templateName:'follow-video',
    menuKey:'/followVideo',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 婚礼视频详情
siteRouter.get('/followVideo/:id', function* index(next) {
  let p = {
    templateName:'follow-video-details',
    menuKey:'/followVideo',
    parentKey:'/scheme',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 选婚礼人(四大金刚)
siteRouter.get('/f4', function* index(next) {
  let p = {
    templateName:'f4',
    menuKey:'/f4',
    parentKey:'/scheme',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.request.query),
  }

  yield this.render('modules/default', renderOption(p))
})

// 礼服
siteRouter.get('/dress', function* index(next) {
  let p = {
    templateName:'dress',
    menuKey:'/dress',
    parentKey:'/dress',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 礼服详情
siteRouter.get('/dress-details', function* index(next) {
  let p = {
    templateName:'dress-details',
    menuKey:'/dress',
    parentKey:'/dress',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.request.query),
  }

  yield this.render('modules/default', renderOption(p))
})

// 婚礼用品
siteRouter.get('/supply', function* index(next) {
  let p = {
    templateName:'supply',
    menuKey:'/supply',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})

// 婚车租赁
siteRouter.get('/car', function* index(next) {
  let p = {
    templateName:'car',
    menuKey:'/car',
    parentKey:'/scheme',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})

/****************************************** 婚宴预订 *********************************************/
// 婚宴酒店
siteRouter.get('/hotel', function* index(next) {
  let p = {
    templateName:'hotel',
    menuKey:'/hotel',
    parentKey:'/hotel',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
// 酒店详情页
siteRouter.get('/hotel/:id', function* index(next) {
  let p = {
    templateName:'hotel-details',
    menuKey:'/hotel',
    parentKey:'/hotel',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }

  yield this.render('modules/default', renderOption(p))
})
// 提交婚宴预订需求
siteRouter.get('/hotel-require', function* index(next) {
  let p = {
    templateName:'hotel-require',
    menuKey:'/hotel-require',
    parentKey:'/hotel',
    params:{
      isBafei:this.isBafei,
    },
  }

  yield this.render('modules/default', renderOption(p))
})
/** 活动详情页 **/
siteRouter.get('/activity/detail/:name', function* index(next) {
  let p = {
    templateName:'activity',
    menuKey:'/',
    parentKey:'/',
    params:_.merge({
      isBafei:this.isBafei,
    }, this.params),
  }
  if (this.request.query.menuKey) {
    p.menuKey = '/'+this.request.query.menuKey;
  }
  if (this.request.query.parentKey) {
    p.parentKey = '/'+this.request.query.parentKey;
  }

  yield this.render('modules/default', renderOption(p))
})

export { siteRouter }
