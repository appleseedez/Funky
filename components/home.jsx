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
            <span className="secondary-title">PHOTOGRAPHY</span>
            <span className="primary-title">LATEST</span>
            <span className="secondary-title">NEWS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">婚纱摄影</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="/sample">
                  <span>样片欣赏</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/pringles">
                  <span>最新客片</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/suite">
                  <span>套系报价</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="/movie">
                  <span>微电影</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="/shot">
                <i className="more-array"></i>
                <span>查看更多</span>
              </a>
            </div>
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
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'2:3'} width={347} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else if (k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'2:3'} width={502} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'3:2'} width={347} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
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
            <span className="primary-title">CUSTOM</span>
            <span className="secondary-title">WEDDING</span>
            <span className="primary-title">LATEST</span>
            <span className="secondary-title">NEWS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">婚庆定制</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="/cases">
                  <span>最新热门案例</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/f4">
                  <span>选婚礼人</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/dress">
                  <span>婚纱礼服</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/supply">
                  <span>婚礼用品</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="/car">
                  <span>婚车租赁</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="/scheme">
                <i className="more-array"></i>
                <span>查看更多</span>
              </a>
            </div>
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
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'8:9'} width={479} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'2:3'} width={358} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
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
            <span className="primary-title">GOLDEN</span>
            <span className="secondary-title">TRIP</span>
            <span className="primary-title">LATEST</span>
            <span className="secondary-title">NEWS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">金色旅拍</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020">
                  <span>旅拍活动</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="//trip.jsbn.com" target='_blank'>
                  <span>热门旅拍城市</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="//trip.jsbn.com" target='_blank'>
                <i className="more-array"></i>
                <span>查看更多</span>
              </a>
            </div>
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
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'8:9'} width={479} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'2:3'} width={358} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
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
            <span className="primary-title">HOTEL&DIAMOND</span>
            <span className="secondary-title">LATEST</span>
            <span className="primary-title">NEWS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">婚宴预订&婚戒钻石</span>
            <span className="secondary-title">最新动态</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="/hotel">
                  <span>婚宴预订</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="http://www.chinad9.com" target='_blank'>
                  <span>婚戒钻石</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>最新酒店优惠活动</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="adv-recommend-box count-4">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data, (v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k==0 || k==1) {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'3:2'} width={595} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'2:1'} width={595} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} autoplay={true} water={false} />
                        <div className="shade-box"></div>
                      </a>
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
            <span className="primary-title">GOLD</span>
            <span className="secondary-title">CHARM</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">魅力金色</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>在线咨询</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="//cq.jsbn.com/activity/detail/syp" target='_blank'>
                  <span>关于我们</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>联系我们</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
          </div>
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
                    <a href={v.linkUrl} className='img-box'>
                      <MediaItem aspectRatio={'38:25'} width={380} mediaUrl={v.coverUrlWeb} water={false} />
                      <div className="shade-box"></div>
                    </a>
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
                    <a href={v.linkUrl} className='img-box'>
                      <MediaItem aspectRatio={'297:362'} width={297} mediaUrl={v.coverUrlWeb} water={false} />
                      <div className="shade-box"></div>
                    </a>
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
        {
          //<div className='bannar-all-box'>
          //  <Banner {...HomeConfig['Banner'][0]} />
          //</div>
          //<div className='bannar-all-box'>
          //<BotComment {...HomeConfig['BotComment']}/>
          //</div>
        }
        <ActivityHot />
      </div>
    )
  }
})

export { Home }
