import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'
import { FollowPhotoDetailsConfig } from './config/follow-photo-details-config'

const BasicInfo = React.createClass({
  render () {
    return (
      <div>
        <div className='info-title'><h1>主题属性</h1></div>
        <div className='theme-content mgb40 clearfix'>
          <div className='type-box'>
            <span>主题:</span>
            <p>{this.props.theme}</p>
          </div>
          <div className='type-box'>
            <span>风格:</span>
            {
              _.map(this.props.styleName&&this.props.styleName.split(',')||[],(v,k)=>{
                return <p key={k}>{v + ' '}</p>
              })
            }
          </div>
          <div className='type-box'>
            <span>色系:</span>
            <p>{this.props.color}</p>
            <i className='violet-bg-1-js' />
            <i className='golden-bg-1-js' />
          </div>
        </div>
      </div>
    )
  }
})

const Concept = React.createClass({
  render () {
    if (this.props.designConcept) {
      return (
        <div>
          <div className="info-title" >
            <h1>设计理念</h1>
          </div>
          <div className="theme-content mgb40 clearfix">
            <p>{this.props.designConcept || ''}</p>
          </div>
        </div>
      )
    }else {
      return null
    }

  }
})

const FollowPhotoDetails = React.createClass({
  render () {
    let imageListData = []
    imageListData = JSON.parse(this.state.data.pcDetailImages || '[]')
    return (
      <div className='alxq-view'>
        <div className='layout-center-box margin-top-box' id='slider_case_detail'>
          <div className='photo-show-box'>
            <div className='big-img-box'>
              <div className='kpxq-img-box'>
                <div className="left-hover-box btn-prev"><div className="pos-box"><div className="bg-ico"></div><i className="ico-15-js ico-15-lef-js"></i></div></div>
                <div className="right-hover-box btn-next"><div className="pos-box"><div className="bg-ico"></div><i className="ico-15-js ico-15-rig-js"></i></div></div>
                <img className="big-img" src="" />
              </div>
            </div>
            <div className='gray-box gray-box-2 container'>
              <div className="small-img-box">
                <ul className="item-box-2 clearfix">
                  {
                    imageListData.length && $.map(imageListData,function(v,k){
                      return (
                        <li className="item transition-margin" key={k} data-big-img-url={v+'@95q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'}>
                          <MediaItem aspectRatio='3:2' height={100} mediaUrl={v} water={false} />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          {
            //<div className="tilte-box">
            //  <h1>{this.state.data.name}</h1>
            //</div>
            //<div className='case-detail-box responsive-box clearfix'>
            //<div className='left-box'>
            //<div className='intr-box'>
            //<p>{this.state.data.description}</p>
            //</div>
            //</div>
            //<div className='right-box'>
            //<div className='line-left' />
            //<BasicInfo {...this.state.data} />
            //<Concept {...this.state.data} />
            //</div>
            //</div>
          }
        </div>
      </div>
    )
  },
  getInitialState: function() {
    return {
      data:{}
    }
  },
  componentDidMount() {
    let cfg = FollowPhotoDetailsConfig['FollowPhotoDetails']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    if(fetchUrl){
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j=>{
          if(j.success && j.data.length > 0) {
            // 因为后天返回的pcDetailImages是一个字符串,所以要转换成json
            this.setState({data:j.data[0]},()=>{
              $("#slider_case_detail").Slider({
                type: "Horizontal"
              })
            })
          }
        })
    }
  }
})

export { FollowPhotoDetails }
