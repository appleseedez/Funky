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

/**
 templateName: ejs模板名称
 menuKey MenuConfig中配置的link字段
 parentKey MenuConfig中的顶层模块的key
 */
let renderOption = (templateName, menuKey, parentKey,params) => {
  let p = params || {}
  return {
    'title':ComponentsSeo[templateName].seoTitle,
    'seoKeywords':ComponentsSeo[templateName].seoKeywords,
    'seoDescription':ComponentsSeo[templateName].seoDescription,
    'reactMarkup': renderToString(ComponentsIndex[templateName]),
    'reactNavMarkup': renderToString(<Navigation menuKey={parentKey} currentKey={menuKey} />),
    'currentMenuKey':menuKey,
    'parentMenuKey':parentKey,
    'main': templateName,// 客户端渲染使用的脚本名称和模板名称一致
    'params':JSON.stringify(p),
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
  yield this.render('modules/default', renderOption('home', '/', '/'))
})
siteRouter.get('/home', function* index(next) {
  yield this.render('modules/default', renderOption('home', '/home', '/home'))
})

/*********************************** 婚纱摄影 *************************************/
// 婚纱摄影首页
siteRouter.get('/shot', function* index(next) {
  yield this.render('modules/default', renderOption('shot', '/shot', '/shot'))
})
// 作品(样片)
siteRouter.get('/sample', function* index(next) {
  yield this.render('modules/default', renderOption('sample', '/sample', '/shot'))
})
// 作品(样片)详情
siteRouter.get('/sample/:id', function* index(next) {
  yield this.render('modules/default', renderOption('sample-details', '/sample', '/shot',this.params))
})
// 客片
siteRouter.get('/pringles', function* index(next) {
  yield this.render('modules/default', renderOption('pringles', '/pringles', '/shot'))
})
// 客片详情
siteRouter.get('/pringles/:id', function* index(next) {
  yield this.render('modules/default', renderOption('pringles-details', '/pringles', '/shot',this.params))
})
// 套系
siteRouter.get('/suite', function* index(next) {
  yield this.render('modules/default', renderOption('suite', '/suite', '/shot'))
})
// 套系详情
siteRouter.get('/suite/:id', function* index(next) {
  yield this.render('modules/default', renderOption('suite-details', '/suite', '/shot',this.params))
})
// 微电影
siteRouter.get('/movie', function* index(next) {
  yield this.render('modules/default', renderOption('movie', '/movie', '/shot'))
})
// 微电影详情
siteRouter.get('/movie-details', function* index(next) {
  yield this.render('modules/default', renderOption('movie-details', '/movie', '/shot', this.request.query))
})

/************************************** 婚庆定制 ***************************************/
// 婚庆定制首页
siteRouter.get('/scheme', function* index(next) {
  yield this.render('modules/default', renderOption('scheme', '/scheme', '/scheme'))
})
// 实景案例
siteRouter.get('/cases', function* index(next) {
  yield this.render('modules/default', renderOption('cases', '/cases', '/scheme'))
})
// 实景案例详情
siteRouter.get('/cases/:id', function* index(next) {
  yield this.render('modules/default', renderOption('cases-details', '/cases', '/scheme',this.params))
})
// 婚礼跟拍
siteRouter.get('/followPhoto', function* index(next) {
  yield this.render('modules/default', renderOption('follow-photo', '/followPhoto', '/scheme'))
})
// 婚礼跟拍详情
siteRouter.get('/followPhoto/:id', function* index(next) {
  yield this.render('modules/default', renderOption('follow-photo-details', '/followPhoto', '/scheme',this.params))
})
// 婚礼视频
siteRouter.get('/followVideo', function* index(next) {
  yield this.render('modules/default', renderOption('follow-video', '/followVideo', '/scheme'))
})
// 婚礼视频详情
siteRouter.get('/followVideo/:id', function* index(next) {
  yield this.render('modules/default', renderOption('follow-video-details', '/followVideo', '/scheme',this.params))
})
// 选婚礼人(四大金刚)
siteRouter.get('/f4', function* index(next) {
  yield this.render('modules/default', renderOption('f4', '/f4', '/scheme', this.request.query))
})

// 礼服
siteRouter.get('/dress', function* index(next) {
  yield this.render('modules/default', renderOption('dress', '/dress', '/scheme'))
})
// 礼服详情
siteRouter.get('/dress-details', function* index(next) {
  yield this.render('modules/default', renderOption('dress-details', '/dress', '/scheme', this.request.query))
})

// 婚礼用品
siteRouter.get('/supply', function* index(next) {
  yield this.render('modules/default', renderOption('supply', '/supply', '/scheme'))
})

// 婚车租赁
siteRouter.get('/car', function* index(next) {
  yield this.render('modules/default', renderOption('car', '/car', '/scheme'))
})

/****************************************** 婚宴预订 *********************************************/
// 婚宴酒店
siteRouter.get('/hotel', function* index(next) {
  yield this.render('modules/default', renderOption('hotel', '/hotel', '/hotel'))
})
// 酒店详情页
siteRouter.get('/hotel/:id', function* index(next) {
  yield this.render('modules/default', renderOption('hotel-details', '/hotel', '/hotel',this.params))
})
// 提交婚宴预订需求
siteRouter.get('/hotel-require', function* index(next) {
  yield this.render('modules/default', renderOption('hotel-require', '/hotel-require', '/hotel'))
})
/** 活动详情页 **/
siteRouter.get('/activity/detail/:name', function* index(next) {
  let menuKey = '/'
  if (this.request.query.menuKey) {
    menuKey = '/'+this.request.query.menuKey;
  }
  let parentKey = '/'
  if (this.request.query.parentKey) {
    parentKey = '/'+this.request.query.parentKey;
  }
  yield this.render('modules/default', renderOption('activity', menuKey, parentKey, this.params))
})

export { siteRouter }
