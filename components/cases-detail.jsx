import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'
import { CasesDetailsConfig } from './config/cases-details-config'

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
              _.map(this.props.caseStyleName&&this.props.caseStyleName.split(',')||[],(v,k)=>{
                return <p key={k}>{v + ' '}</p>
              })
            }
          </div>
          <div className='type-box'>
            <span>色系:</span>
            <p>{this.props.color || '默认色系'}</p>
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

/**
 价格
 **/
const Price = React.createClass({
  render () {
    var f4Map = {
      '': '',
      1: '主持人',
      2: '化妆师',
      3: '摄影师',
      4: '摄像师',
      5: '双机摄影',
      6: '双机摄像',

    }
    var f4String = ''
    var standardWeddingString = this.props.personDescription || '';
    _.each(standardWeddingString.split(','), function(v,k) {
      f4String += (' ' + v);
    })

    if (this.props.totalCost) {
      return (
        <div>
          <div className="info-title">
            <h1>价格</h1>
          </div>
          <div className="theme-content">
            <div className="all-price">
              <span className='in-pirce'>
                <span className="words pink-1-js">折后价:</span>
                <span className="pink-1-js">￥</span>
                <b className="pink-1-js">{parseFloat(this.props.totalCost).toFixed(2)}</b>
              </span>
              <span className='del-pirce'>
                <span>原价: ￥</span>
                <b>{parseFloat(this.props.originalPrice || this.props.totalCost).toFixed(2)}</b>
              </span>
            </div>
            <div className='price-box'>
              <p className="price-detail first">
                <span>场景布置费用:</span>
                <em>￥</em>
                <b>{parseFloat(this.props.senceCost).toFixed(2)}</b>
              </p>
              <p className="price-detail">
                <span>{($.trim(f4String) === '')?'婚礼人费用：':'婚礼人(' + f4String +') 费用：'}</span>
                <em>￥</em><b>{parseFloat(this.props.hdpcCost).toFixed(2)}</b>
              </p>
            </div>
          </div>
        </div>
      )
    }else {
      return null
    }

  }
})

/*
 <Price {...this.state.data} />
 */
const CasesDetails = React.createClass({
  render () {
    let sy = '|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
    let subHtml = `<h4>${this.state.data.name}</h4>`
    let imageListData = []
    imageListData = JSON.parse(this.state.data.pcDetailImages || '[]')
    return (
      <div className='alxq-view'>
        {
          //<span onClick={()=>{this.showImageBox()}}>=====>>>></span>
          //<div id="lightGallery"></div>
        }
        <div className='layout-center-box margin-top-box' id='slider_case_detail'>
          <div className='photo-show-box'>
            <div className='big-img-box'>
              <div className='kpxq-img-box'>
                <div className="left-hover-box btn-prev">
                  <div className="pos-box">
                    <div className="bg-ico"></div>
                    <i className="ico-15-js ico-15-lef-js"></i>
                  </div>
                </div>
                <div className="right-hover-box btn-next">
                  <div className="pos-box">
                    <div className="bg-ico"></div>
                    <i className="ico-15-js ico-15-rig-js"></i>
                  </div>
                </div>
                <img className="big-img" src="http://placehold.it/1200x800" />
              </div>
            </div>
            <div className='gray-box gray-box-2 container'>
              <div className="small-img-box">
                {
                  //<ul className="item-box-2 clearfix">
                  //  {
                  //    _.map(imageListData, (v,k) => {
                  //      return (
                  //        <li className="item transition-margin" key={k} data-big-img-url={v+'@95q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'}>
                  //          <MediaItem aspectRatio='3:2' height={100} mediaUrl={v} water={false} />
                  //        </li>
                  //      )
                  //    })
                  //  }
                  //</ul>
                }
                {
                  <ul id="lightGallery" className="item-box-2 clearfix">
                    {
                      _.map(imageListData, (v, k) => {
                        return (
                          <li key={k} className="item transition-margin"
                              data-responsive={`${v}@375w_95q${sy} 375, ${v}@480w_95q${sy} 480, ${v}@800w_95q${sy} 800`}
                              data-src={`${v}@1920w_90q${sy}`}
                              data-sub-html={subHtml}>
                            <a href="">
                              <img className="img-responsive" src={`${v}@120w_95q${sy}`}></img>
                            </a>
                          </li>
                        )
                      })
                    }
                  </ul>
                }
              </div>
            </div>
          </div>
          <div className="tilte-box">
            <h1>{this.state.data.name}</h1>
          </div>
          <div className='case-detail-box responsive-box clearfix'>
            <div className='left-box'>
              <div className='intr-box'>
                <p>{this.state.data.description}</p>
              </div>
            </div>
            <div className='right-box'>
              <div className='line-left' />
              <BasicInfo {...this.state.data} />
              <Concept {...this.state.data} />
              {
                // 巴菲过来的话显示价格
                this.props.dataParams.isLan
                  ?
                  <Price {...this.state.data} />
                  :
                  null
              }
            </div>
          </div>
        </div>
      </div>
    )
  },
  showImageBox() {
    const imageList = [
      '//image.izhaowo.com/1_c1896d88-10eb-4dee-9ed2-8b2e27c3c7b4.jpg',
      '//image.izhaowo.com/1_969fdbd9-4eff-4b22-8a52-ce5530004da9.jpg',
      '//image.izhaowo.com/1_f7514b0a-d5df-4291-8932-428a18288a36.jpg',
      '//img2.jsbn.com/venus/sample/20160825/14721052295451123_667x1000.jpg']
    let sy =''

    $('#lightGallery').lightGallery({
      download: false,
      index: 2,
      loop: true,
      auto: true,
      pause: 4000,
      dynamic: true,
      dynamicEl: _.map(imageList, (v,k)=>{
        return {
          src: `${v}@1920w_90q${sy}`,
          responsive: `${v}@375w_90q${sy} 375, ${v}@480w_90q${sy} 480, ${v}@800w_90q${sy} 800`,
          thumb: `${v}@120w_90q${sy}`,
          iframe: false,
        }
      }),
    })
  },
  getInitialState() {
    return {
      data:{}
    }
  },
  componentDidMount() {

    let cfg = CasesDetailsConfig['CasesDetails']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    if(fetchUrl){
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j=>{
          if(j.success && j.data.length > 0) {
            // 因为后天返回的pcDetailImages是一个字符串,所以要转换成json
            this.setState({data:j.data[0]},()=>{
              //$("#slider_case_detail").Slider({
              //  type: "Horizontal"
              //})

              $('#lightGallery').lightGallery()
            })
          }
        })
    }
  },
  getDefaultProps(){
    return {
      dataParams:{
        isLan:false,
      }
    }
  }
})

export { CasesDetails }
