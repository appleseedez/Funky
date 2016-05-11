import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem } from './common/media-item.jsx'
import { Banner} from './common/banner.jsx'
import { HomeConfig } from './config/home-config'

const Board = React.createClass({
  render () {
    return (
      <li>
        {
          _.map(this.props.list||[],(value,key)=>{
            return (
              <a href={value+'@95q'} data-uk-lightbox="{'group':'comment-robot'}" data-lightbox-type='image' title='' key={key}>
                <span />
              </a>
            )
          })
        }
      </li>
    )
  }
})

const BotComment = React.createClass({
  render () {
    return (
      <div className='bannar'>
        <img src={this.props.bg+'@95q'} />
        <ul className="comment">
          {
            _.map(this.props.list,(value,key)=>{
              return <Board key={key} list={value}/>
            })
          }
        </ul>
      </div>
    )
  }
})

// 公司形象展示区
const CompanyImageHot = React.createClass({
  render () {
    return (
      <div className='hqdz-home-view mgt30'>
        <div className='layout-center-box'>
          <div className='mgb20'>
            <div className="nav-box">
              {
                _.map(this.state.data,(v,k)=>{
                  if (k===0) {
                    return (
                      <li key={k} className='big-box'>
                        <div className='l-item img-box' >
                          <MediaItem aspectRatio={'598:400'} width={598} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} outerLink={v.linkUrl} water={false} />
                        </div>
                      </li>
                    )
                  }else {
                    return (
                      <li key={k} className='small-box'>
                        <div className='img-box'>
                          <MediaItem aspectRatio={'299:199'} width={299} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} outerLink={v.linkUrl} water={false} />
                        </div>
                      </li>
                    )
                  }
                })
              }
              {/*列表为空，默认输出*/}
              {(this.state.data.length === 0 )&& <h1>加载中...</h1>}
            </div>
          </div>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let CompanyImageHot = HomeConfig['CompanyImageHot']
    fetch(CompanyImageHot.baseUrl + CompanyImageHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

// 婚纱摄影热区
const ShotHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">金色百年婚纱摄影</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <ul className="label-list">
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 限时活动</a></li>
            <li><a href="/pringles"> 每日客片更新</a></li>
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 进店有礼</a></li>
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 询问档期及拍摄相关</a></li>
          </ul>
        </div>
        <div className="nav-label-box">
          <ul className="label-list">
            <li><a href="/sample"> 样片欣赏</a></li>
            <li><a href="/pringles"> 最新客片</a></li>
            <li><a href="/suite"> 套系报价</a></li>
            <li><a href="/movie"> 微电影</a></li>
          </ul>
          <div className="moreBtn">
            <a href="/shot">查看更多></a>
          </div>
        </div>
        <div className="adv-recommend-box count-5">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k==0 || k==2) {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:3'} height={521} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                } else if (k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:3'} height={754} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'3:2'} height={231} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let ShotHot = HomeConfig['ShotHot']
    fetch(ShotHot.baseUrl + ShotHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

// 婚庆定制热区
const WeddingHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">金色百年婚庆定制</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <ul className="label-list">
            <li> <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 最新婚庆活动</a> </li>
            <li> <a href="/cases"> 最新实景案例</a> </li>
            <li> <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 订单大礼包</a> </li>
            <li> <a href="/f4"> 选婚礼人</a> </li>
          </ul>
        </div>
        <div className="nav-label-box">
          <ul className="label-list">
            <li><a href="/cases"> 最新热门案例</a></li>
            <li><a href="/f4"> 选婚礼人</a></li>
            <li><a href="/dress"> 礼服租赁</a></li>
            <li><a href="/supply"> 婚礼用品</a></li>
            <li><a href="/car"> 婚车租赁</a></li>
          </ul>
          <div className="moreBtn">
            <a href="/scheme">查看更多></a>
          </div>
        </div>
        <div className="adv-recommend-box count-3">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'8:9'} height={539} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:3'} height={539} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let WeddingHot = HomeConfig['WeddingHot']
    fetch(WeddingHot.baseUrl + WeddingHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

// 金色旅拍热区
const TripHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">金色旅拍</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <ul className="label-list">
            <li> <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 旅拍活动</a> </li>
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 进店有礼</a></li>
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 询问档期及拍摄相关</a></li>
          </ul>
        </div>
        <div className="nav-label-box">
          <ul className="label-list">
            <li><a href="//trip.jsbn.com"> 热门旅拍城市:三亚 丽江 九寨沟 普吉岛</a></li>
          </ul>
          <div className="moreBtn">
            <a href="//trip.jsbn.com">查看更多></a>
          </div>
        </div>
        <div className="adv-recommend-box count-3">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'8:9'} height={539} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:3'} height={539} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let TripHot = HomeConfig['TripHot']
    fetch(TripHot.baseUrl + TripHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const HotelDiamondHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">婚宴预订&婚戒砖石</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <ul className="label-list">
            <li> <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 最新酒店优惠活动</a> </li>
            <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 新人预订送好</a></li>
            <li><a href="http://www.chinad9.com" target='_blank'> 婚戒砖石款式详情</a></li>
          </ul>
        </div>
        <div className="nav-label-box">
          <ul className="label-list">
            <li><a href="/hotel"> 热门酒店</a></li>
            <li><a href="http://www.chinad9.com"> 婚戒砖石</a></li>
          </ul>
        </div>
        <div className="adv-recommend-box count-3">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k==0 || k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:3'} height={397} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <MediaItem aspectRatio={'2:1'} height={297} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} videoUrl={v.videoUrl} autoplay={true} water={false} />
                      <div className="info-box"><span>{v.name}</span></div>
                      <div className="shade-box"></div>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let HotelDiamondHot = HomeConfig['HotelDiamondHot']
    fetch(HotelDiamondHot.baseUrl + HotelDiamondHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const PublicityHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">魅力金色</span>
          </div>
          <ul className="label-list">
            <li> <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'> 在线咨询</a> </li>
            <li><a href="/activity/detail/aboutUs" target='_blank'> 关于我们</a></li>
            <li><a href="/activity/detail/aboutUs" target='_blank'> 联系我们</a></li>
          </ul>
        </div>
        <div className="nav-label-box">
        </div>
        <ul className="list-adv">
          {
            _.map(this.state.data, (v,k)=>{
              let names = v.name.split('#')
              return (
                <li key={k} className='item-box'>
                  <div className='img-box'>
                    <MediaItem aspectRatio={'38:25'} height={250} mediaUrl={v.coverUrlWeb} water={false} />
                    <div className="info-box"><span>{v.name}</span></div>
                    <div className="shade-box"></div>
                  </div>
                  <div className='title-box'>
                    <span>{names[0] || '金色百年'}</span>
                    <span className='en'>{names[1] || 'GOLDEN WEDDING'}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let PublicityHot = HomeConfig['PublicityHot']
    fetch(PublicityHot.baseUrl + PublicityHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const ActivityHot = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className="adv-recommend-box adv-style-1">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box'
                return (
                  <li key={k} className={kClass}>
                    <MediaItem aspectRatio={'297:362'} height={362} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} water={false} />
                    <div className="info-box"><span>{v.name}</span></div>
                    <div className="shade-box"></div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    let ActivityHot = HomeConfig['ActivityHot']
    fetch(ActivityHot.baseUrl + ActivityHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const Home = React.createClass({
  render () {
    return (
      <div className='home-view'>
        <div className='bannar-all-box' >
          <div className='slider-box bannar' style={{height:HomeConfig['MediaSlider']['height']}} id='slider_top'>
            <MediaSlider {...HomeConfig['MediaSlider']} />
          </div>
        </div>
        <div className="space-40-eav"></div>
        <CompanyImageHot />
        <ShotHot />
        <WeddingHot />
        <TripHot />
        <HotelDiamondHot />
        <PublicityHot />
        <div className='bannar-all-box'>
          <Banner {...HomeConfig['Banner'][0]} />
        </div>
        <div className='bannar-all-box'>
          <BotComment {...HomeConfig['BotComment']}/>
        </div>
        <ActivityHot />
      </div>
    )
  }
})

export { Home }
