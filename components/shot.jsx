import React, { PropTypes } from 'react'
import _ from 'lodash'

import { ShotConfig } from './config/shot-config'
import { Banner } from './common/banner.jsx'
import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem } from './common/media-item.jsx'

const ShotImageHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
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
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>限时活动</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/sample">
                  <span>作品欣赏</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/pringles">
                  <span>客片欣赏</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/suite">
                  <span>套系报价</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/movie">
                  <span>微电影</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>询问档期及拍摄相关</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="adv-recommend-box adv-style-hssy-1">
          <ul className="adv-recommend-list">
            {
              _.map(this.state.data,(v,k)=>{
                let kClass='adv-box index-'+(k+1)
                if (k == 0) {
                  kClass+=' index-first'
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'3:2'} width={600} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'3:2'} width={300} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} water={false} />
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
    let ShotImageHot = ShotConfig['ShotImageHot']
    fetch(ShotImageHot.baseUrl + ShotImageHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const BestSampleHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">SHARE</span>
            <span className="secondary-title">WITH</span>
            <span className="primary-title">YOU</span>
            <span className="secondary-title">LATEST</span>
            <span className="primary-title">PHOTOS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">与你分享</span>
            <span className="secondary-title">最新美照</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>限时活动</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/sample">
                  <span>作品欣赏</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>询问档期及拍摄相关</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="/sample">
                <i className="more-array"></i>
                <span>更多作品</span>
              </a>
            </div>
          </div>
        </div>

        <div className="sample-recommend-box">
          <ul className="list-recommend">
            {
              _.map(this.state.data,(v,k)=>{
                return (
                  <li className="item-box" key={k}>
                    <a className='img-box' href={'/sample/'+v.id} target='_blank'>
                      <MediaItem  aspectRatio={'2:3'} width={400} mediaUrl={v.coverUrlWeb} water={false} />
                      <div className="layer-box" />
                      <div className="layer-title">
                        <i className="golden-wedding" ></i>
                        <h2>{v.name}</h2>
                      </div>
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
    let BestSampleHot = ShotConfig['BestSampleHot']
    fetch(BestSampleHot.baseUrl + BestSampleHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const BestPringlesHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">BEST</span>
            <span className="secondary-title">OFF-CHIP</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">最佳客片</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>限时活动</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item">
                <a href="/pringles">
                  <span>每日客片</span>
                  <div className="tab-black"></div>
                </a>
              </li>
              <li className="item index-last">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>询问档期及拍摄相关</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
            <div className="moreBtn">
              <a href="/pringles">
                <i className="more-array"></i>
                <span>更多客片</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pringles-recommend-box">
          <ul className="list-recommend">
            {
              _.map(this.state.data,(v,k)=>{
                return (
                  <li className="item-box" key={k}>
                    <a className='img-box' href={'/pringles/'+v.id} target='_blank'>
                      <MediaItem  aspectRatio={'2:3'} width={300} mediaUrl={v.coverUrlWeb} water={false} />
                      <div className="layer-box" />
                      <h2 className="layer-title">{v.name}</h2>
                      <div className="hover-title">
                        <i className='ico-love'></i>
                        <h3>
                          <b>{v.actorMaleName}</b>
                          <em> ❤ </em>
                          <b>{v.actorFemaleName}</b>
                        </h3>
                      </div>
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
    let BestPringlesHot = ShotConfig['BestPringlesHot']
    fetch(BestPringlesHot.baseUrl + BestPringlesHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const NewActivityHot = React.createClass({
  render () {
    return (
      <div className="layout-center-box">
        <div className="global-title-box">
          <div className="english-title">
            <span className="primary-title">LATEST</span>
            <span className="secondary-title">EVENTS</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title"></span>
            <span className="secondary-title">最新活动</span>
          </div>
          <div className="nav-label-box">
            <ul className="label-list">
              <li className="item">
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>限时活动</span>
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
                <a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>
                  <span>询问档期及拍摄相关</span>
                  <div className="tab-black"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="suit-recommend-box">
          <ul className="suit-recommend-list">
            {
              _.map(this.state.data,(v,k)=>{
                return (
                  <li className="suit-box" key={k}>
                    <div className="photo-box">
                      <a href={v.linkUrl} className='img-box' target='_blank'>
                        <MediaItem  aspectRatio={'2:3'} width={380} mediaUrl={v.coverUrlWeb} water={false} />
                      </a>
                    </div>
                    <div className="info-box">
                      <i className="img-title"></i>
                      <span className="text-title">{v.name}</span>
                      <span className="text-content">{v.description}</span>
                      <a className="entry-btn" href={v.linkUrl} target='_blank'>
                        <span className="text-english">SEE MORE DETAILS</span>
                        <span className="text-chinese">查看更多</span>
                      </a>
                    </div>
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
    let NewActivityHot = ShotConfig['NewActivityHot']
    fetch(NewActivityHot.baseUrl + NewActivityHot.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
});

const Shot = React.createClass({
  render () {
    return (
      <div className="hssy-home-view">
        <div className="bannar-all-box">
          <div id="slider_top" className="slider-box bannar" style={{height:ShotConfig['MediaSlider']['height']}}>
            <MediaSlider {...ShotConfig['MediaSlider']} />
          </div>
        </div>

        <ShotImageHot />
        <BestSampleHot />
        <div className='bannar-all-box'>
          <a href='/pringles' >
            <Banner {...ShotConfig['Banner'][0]} />
          </a>
        </div>
        <BestPringlesHot />
        <NewActivityHot />

        <div className="layout-center-box">
          <div className="title-box">
            <div className="title">
              <span className="text-english">PHOTOGRAPHER TEAM</span>
              <span className="text-chinese">摄影师团队</span>
            </div>
          </div>
          <div className="bannar-box">
            <img src={ShotConfig['Banner'][1].imageUrl} />
          </div>
          <div className="title-box">
            <div className="title">
              <span className="text-english">STYLIST TEAM</span>
              <span className="text-chinese">造型师团队</span>
            </div>
          </div>
          <div className="bannar-box">
            <img src={ShotConfig['Banner'][2].imageUrl} />
          </div>
        </div>
      </div>
    )
  }
})

export { Shot }
