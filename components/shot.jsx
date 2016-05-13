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
            <span className="secondary-title">PHOTOGRAPHY NEW</span>
          </div>
          <div className="chinese-title">
            <span className="primary-title">金色百年婚纱摄影</span>
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
                <a href="javascript:void(0)">
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
                        <MediaItem aspectRatio={'3:2'} height={400} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} water={false} />
                        <div className="shade-box"></div>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className={kClass}>
                      <a href={v.linkUrl} className='img-box'>
                        <MediaItem aspectRatio={'3:2'} height={200} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} water={false} />
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
            <span className="primary-title">POPULAR SET</span>
            <span className="secondary-title">OF RECOMMENDED</span>
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
            <span className="primary-title">POPULAR SET</span>
            <span className="secondary-title">OF RECOMMENDED</span>
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
                          <b>{v.actorMaleName || '小金'}</b>
                          <em>{String.fromCharCode(0x00b7)}</em>
                          <b>{v.actorFemaleName || '小白'}</b>
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
            <span className="primary-title">POPULAR SET</span>
            <span className="secondary-title">OF RECOMMENDED</span>
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
                      <MediaItem  aspectRatio={'2:3'} width={380} mediaUrl={v.coverUrlWeb} outerLink={v.linkUrl} water={false} />
                    </div>
                    <div className="info-box">
                      <i className="img-title"></i>
                      <span className="text-title">{v.name}</span>
                      <span className="text-content">{v.description}</span>
                      <a className="entry-btn" href={v.linkUrl}>
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
              <span className="text-english">THE PHOTOGRAHPER</span>
              <span className="text-chinese">摄影师团队</span>
            </div>
          </div>
          <div className="bannar-box">
            <img src={ShotConfig['Banner'][1].imageUrl} />
          </div>
          <div className="title-box">
            <div className="title">
              <span className="text-english">THE PHOTOGRAHPER</span>
              <span className="text-chinese">策划师团队</span>
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
