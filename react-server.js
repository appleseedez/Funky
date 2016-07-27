import Koa from 'koa'
import convert from 'koa-convert'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import thunkify from 'thunkify-wrap'
import _ from 'lodash'
import bodyParser from 'koa-bodyparser'

import { apiRouter } from './route/api-router'
import { siteRouter } from './route/site-router'
import { busRouter } from './route/bus-router'
import db from './components/server/cache/db/dbUtil'
import memCacheMgr from './components/server/cache/mem/manager'
const DBUtil = db.Instance()
const MEMUtil = memCacheMgr.Instance()

const ReactServer = new Koa()
/**
初始化模板引擎 使用ejs作为页面引擎
可以在中间件中用this.render('templateName',jsonData)
来生成页面
api请查看 [http://www.embeddedjs.com/]
**/
ejsEngine(ReactServer, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})

process.env.NODE_ENV === 'development' && ReactServer.use(Logger()) // 只有在NODE_ENV为development才加载日志
ReactServer.use(Favicon(__dirname + '/assets/images/favicon.png')) // favico
ReactServer.use(StaticFile('./assets',{'maxage':3*60*1000})) // 其他静态资源：js/images/css
ReactServer.use(convert(bodyParser()));

// 业务路由
ReactServer.use(convert(busRouter.routes()))

/** 准备进入路由层。 先确保一切为默认 **/
ReactServer.use(convert(function*(next){
  this.APIKey = null
  this.isBafei = false;
  yield next
}))
// api路由
ReactServer.use(convert(apiRouter.routes()))

/**
 如果经过了api路由层，则APIKey 就一定会被设置上. APIKey如果为null 表示最初状态
 我们的数据抓取层也是用这个APIKey 去进行相应的缓存命中和数据抓取的
 这样就保证了命中了api层路由的就会进行数据抓取。
 dataFetchMiddleWare的工作就是依据已经设置的APIKey 进行数据抓取工作。
 **/
/** 先创建一个thunkify的版本 **/
// 为了能够使用yield 需要此处对函数进行偏函数化。
// 就是将一个带callback的任意函数转换为
// 只带callback的函数
let proxyFetcher = thunkify.genify(MEMUtil.getData)
// 过来api的数据中间件
ReactServer.use(convert(function*(next) {
  let resData = {
    success: true,
    message: "",
    data: {},
    code: 200,
    count: 0
  }

  if (this.APIKey) {
    let resCacheData = MEMUtil.getMemCache(this.request.url)
    if (resCacheData != null) {
      this.body = resCacheData
    } else {
      // 没有在内存缓存的情况下,走后续的缓存策略
      // DBUtil.isCacheDataUsable 方法 返回真表示数据缓存可用。否则表示数据正在同步。不可以从缓存拉
      if (DBUtil.isCacheDataUsable(this.APIKey)) {
        try {
          //从缓存数据库中去查询。
          if (this.model) {
            resData.data = yield this.model.run()
            resData.code = 200
            resData.success = true
            resData.count = this.count || resData.data.length
          }
        } catch (err) {
          console.log(err)
          //缓存数据不可用。 去做代理数据请求
          resData  = yield* proxyFetcher(this.request.url,this.request.url)
        }
      } else {
        //缓存数据不可用。 去做代理数据请求
        resData  = yield* proxyFetcher(this.request.url,this.request.url)
      }

      // 把结果缓存到内存
      if(resData.success) {
        MEMUtil.setMemCache(this.request.url, resData)
      }

      this.body = resData
    }
  } else {
    console.log(':::::::::::::::::::::::::'+this.request.host)
    // 判断是否芭菲官网跳转过来的
    if (this.request.host.indexOf('bafei.jsbn.com') !== -1) {
      this.isBafei = true;
    }
  }

  yield next
}))

// 网站路由
ReactServer.use(convert(siteRouter.routes()))

// 服务器异常处理
if (process.env.NODE_ENV === 'test') {
  module.exports = ReactServer.callback();
} else {
  ReactServer.listen(7001);
  console.log(process.env.NODE_ENV);
}

ReactServer.on('error', function (err) {
  console.log(err.stack)
})
