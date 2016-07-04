import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { SchemeConfig } from './config/scheme-config'
import { Banner } from './common/banner.jsx'
import { MediaItem } from './common/media-item.jsx'

const PhotoGallery = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">SERVER</span>
            <span className="secondary-title">TEAM</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">专业服务团队</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              {
                //<li className="item">
                //  <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                //    <span>近期活动</span>
                //    <div className="tab-black"></div>
                //  </a>
                //</li>
                //<li className="item index-last">
                //<a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                //<span>在线咨询</span>
                //<div className="tab-black"></div>
                //</a>
                //</li>
              }
            </ul>
          </div>
        </div>

        <div className='photo-box'>
          {
            _.map(this.props.gallery,(v,k)=>{
              return <img src={v.imageUrl+'@95q'} key={k} />
            })
          }
        </div>
      </div>
    )
  },
  propTypes: {
    gallery: React.PropTypes.array
  },
  getDefaultProps(){
    return {
      gallery:[]
    }
  }
})

const NavGallery = React.createClass({
  render(){
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">PROFESSIONAL</span>
            <span className="secondary-title">WEDDING</span>
            <span className="primary-title">PEOPLE</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">专业婚礼人</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              {
                //<li className="item">
                //  <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                //    <span>近期活动</span>
                //    <div className="tab-black"></div>
                //  </a>
                //</li>
                //<li className="item index-last">
                //<a href="/f4">
                //<span>选婚礼人</span>
                //<div className="tab-black"></div>
                //</a>
                //</li>
              }
            </ul>
            <div className="moreBtn">
              <a href="/f4">
                <i className="more-array"></i>
                <span>详情</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="nav-f4-box">
          {
            _.map(this.props.gallery,(v,k)=>{
              return (
                <a href={v.link} key={k}>
                  <li className="item-box">
                    <div className={v.klass}><span></span></div>
                    <span className={v.klass+'-word'}></span>
                  </li>
                </a>

              )
            })
          }
        </ul>
      </div>
    )
  },
  propTypes: {
    gallery: React.PropTypes.array
  },
  getDefaultProps(){
    return {
      gallery:[]
    }
  }
})

const SchemeImageHot = React.createClass({
  render () {
    return (
      <div className='hqdz-home-view mgt30'>
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
          </div>
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
    let SchemeImageHot = SchemeConfig['SchemeImageHot']
    fetch(SchemeImageHot.baseUrl + SchemeImageHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const BestCasesHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">BEST</span>
            <span className="secondary-title">CASE</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">最佳案例</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="/cases">
                  <span>实景案例</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>询问私人定制流程</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="/cases">
                <i className="more-array"></i>
                <span>更多案例</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="cases-list">
          {
            /*
             <div className="date">
             <b>{v.price || ''}</b>
             <span>({v.holdingTime })</span>
             </div>
            * */
            _.map(this.state.data,(v,k)=>{
              return (
                <li className="item-box" key={k}>
                  <div className='img-box'>
                    <MediaItem aspectRatio={'3:2'} width={380} mediaUrl={v.coverUrlWeb} water={false}/>
                    <a className="layer-box" href={'/cases/'+v.id} target='_blank'>
                      <div className="layer"/>
                      <div className="info">
                        <h3>{v.name}</h3>
                      </div>
                    </a>
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
    let BestCasesHot = SchemeConfig['BestCasesHot']
    fetch(BestCasesHot.baseUrl + BestCasesHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const SupplyCarHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">WEDDING</span>
            <span className="secondary-title">SUPPLY</span>
            <span className="primary-title">&</span>
            <span className="secondary-title">WEDDING</span>
            <span className="primary-title">CAR</span>
            <span className="secondary-title">RENTAL</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">婚礼用品&婚车租赁</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="/supply">
                  <span>婚礼用品</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/car">
                  <span>婚礼租车</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>在线咨询</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

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
    let SupplyCarHot = SchemeConfig['SupplyCarHot']
    fetch(SupplyCarHot.baseUrl + SupplyCarHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const Scheme = React.createClass({
  render () {
    return (
      <div className='hqdz-home-view'>
        <div className='bannar-all-box mgb30'>
          <div id='slider_top' className='slider-box bannar' style={{height:SchemeConfig['MediaSlider']['height']}}>
              <MediaSlider {...SchemeConfig['MediaSlider']} />
          </div>
        </div>

        <SchemeImageHot />
        <BestCasesHot />
        <NavGallery gallery={SchemeConfig['NavGallery']} />
        <SupplyCarHot />
        <PhotoGallery gallery={SchemeConfig['PhotoGallery']} />
      </div>
    )
  }
})

export { Scheme }
