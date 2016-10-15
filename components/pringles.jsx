import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { ShotListItem } from './common/shot-list-item.jsx'
import { Banner } from './common/banner.jsx'
import { PringlesConfig } from './config/pringles-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

/**
<Pringles>
  <MediaSlider />
  <Banner />
  <ShotListItem type='pringles' />
  <Episode />
</Pringles>
**/
const Episode = React.createClass({
  render () {
    return (
      <div className='layout-center-box'>
        <div className='title-center'>
          <h1>客片分季欣赏</h1>
        </div>
        <div className='tab-box-fj' id='J_SliderQuarterly'>
          <div className='overflow-box slider-box'>
            <ul className='item-box J_ClickLoadSeasonTab'>
              {
                _.map(this.state.data,(v,k)=>{
                  return (
                    <li key={k} className='item' data-season-id={v.seasonId}>
                      <div className='pos-box'>
                        <div className='click-box'></div>
                        <div className='pic'>
                          <MediaItem {...this.props} mediaUrl={v.coverUrlWeb} water={false} />
                        </div>
                        <p><span>{v.name}</span></p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className='arrow-lef btn-prev'></div>
          <div className='arrow-rig btn-next'></div>
        </div>
        <div className='title-fj'>
          <h2>{this.state.quarterly_name?'《'+this.state.quarterly_name+'》':''}</h2>
        </div>
        <ShotListItem {...PringlesConfig['EpisodeListItem']} dataUrl={this.state.dataUrl} params={this.state.params}  />
      </div>
    )
  },
  getInitialState: function() {
    return {
      data:[],
      quarterly_name:null,
      params:{},
      dataUrl:undefined
    }
  },
  loadSeasonsFromId(id){
    this.setState({'params':{'seasonId':id}})
  },
  loadSeasons(evt){
    this.loadSeasonsFromId($(evt.currentTarget).attr('data-season-id'))
  },
  componentDidMount() {
    $('.J_ClickLoadSeasonTab').on('mousedown','li',this.loadSeasons)
    if (this.props.dataUrl !== undefined) {
      fetch(this.props.baseUrl + this.props.dataUrl)
      .then(res => {return res.json()})
      .then(j=>{
        if (!j.data.length) {
          return
        }
        this.setState({
          'dataUrl':'pringles/pringles_season',
          data:j.data,
          params:{'seasonId':j.data[0].seasonId}
        },()=>{
          let slider = $('#J_SliderQuarterly');
          slider.Slider({type:'Horizontal',margin:40,focusShift:false});

        })
      })
    }
  }
})

const Pringles = React.createClass({

  getInitialState: function() {
    return {
      data:[]
    }
  },

  render () {
    return (
      <div className='kpxs-view'>
        <div className='bannar-all-box'>
          <div id="slider_top" className="slider-box bannar-all-box" style={{height:PringlesConfig['MediaSlider']['height']}}>
            <MediaSlider {...PringlesConfig['MediaSlider']}/>
          </div>
        </div>
        <div className="layout-center-box">
          {
            //<div className='mgt30'>
            //  <Banner {...PringlesConfig['Banner'][0]}/>
            //</div>
          }
          <div className="global-title-box-2">
            <div className="chinese-title">最新客片</div>
            <div className="english-title">New Pringles</div>
            <div className="moreBtn">
            </div>
          </div>
          <ul className="list-recommend-new">
            {
              _.map(this.state.data, (v,k)=>{
                return (
                  <li key={k} className="item-box">
                    <a className="img-box" href={'/pringles/'+v.id} target="_blank">
                      <div className="layer-box"></div>
                      <h2 className="layer-title">{v.name}</h2>
                      <div className="hover-title">
                        <i className="ico-love"></i>
                        <h3></h3>
                      </div>
                      <MediaItem
                        aspectRatio={PringlesConfig.PringlesRecommend.aspectRatio}
                        processType={EmImgProcessType.emGD_S_S}
                        height={PringlesConfig.PringlesRecommend.height}
                        mediaUrl={v.coverUrlWeb}
                        water={false} />
                    </a>
                  </li>
                )
              })
            }
          </ul>
          <div className="global-title-box-2">
            <div className="chinese-title">客片欣赏</div>
            <div className="english-title">Pringles</div>
            <div className="moreBtn">
            </div>
          </div>
          <ShotListItem {...PringlesConfig['ShotListItem']} />
        </div>
        <div id="J_MoreButton">
            <div className="more-btn"><span>点击查看更多</span></div>
        </div>
        {
          //<div className='space-100-eav mgb30'></div>
          //<div className='main-body-eav'>
          //<Episode {...PringlesConfig['Episode']}/>
          //</div>
        }
      </div>
    )
  },

  componentDidMount() {
    let fetchUrl = PringlesConfig.PringlesRecommend.buildQueryUrl({}, PringlesConfig.PringlesRecommend.dataUrl)
    console.log(fetchUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j => {
        if(j.success) {
          this.setState({data:j.data})
        }
      })
  }
})

export { Pringles }
