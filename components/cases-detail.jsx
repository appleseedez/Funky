import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
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
const PriceInfo = React.createClass({
  render () {
    let f4String = ''
    let standardWeddingString = this.props.personDescription || '';
    _.each(standardWeddingString.split(','), (v, k) => {
      f4String += (' ' + v);
    })

    if (this.props.totalCost) {
      return (
        <div className="price-box">
          <div className="info-title">
            <h1>案例价格</h1>
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

const HeadBox = React.createClass({
  render () {
    let { imageList=[], coverUrlWeb, name, description='', caseStyleName='', color='', caseType } = this.props
    if (imageList.length === 0) {
      return null
    }
    let imgLen = imageList.length
    let showImgS = false
    if (imgLen > 6) {
      showImgS = true
      imageList = imageList.slice(0, 6)
    }
    let first = 0
    let last = imageList.length - 1

    const sy = '|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
    let dsp = description.length > 50 ? description.substr(0, 50)+'......' : description
    const subHtml = `<h4>${name}</h4><p>${dsp}</p>`

    return (
      <div className="case-images">
        <div className="photo-box">
          <div className="big-img-box" onClick={() => {this.showLightBox(first, sy, subHtml)}}>
            <MediaItem aspectRatio='3:2' processType={EmImgProcessType.emGD_S_S} width={690} mediaUrl={coverUrlWeb} water={false} />
          </div>
          <ul className="small-img-box">
            {
              _.map(imageList, (v, k) => {
                if (last === k) {
                  return (
                    <li key={k} className="item last" onClick={() => {this.showLightBox(k, sy, subHtml)}}>
                      <MediaItem aspectRatio='3:2' processType={EmImgProcessType.emGD_S_S} width={105} mediaUrl={v} water={false} />
                      {
                        showImgS
                          ?
                          <span>图集{imgLen}P</span>
                          :
                          null
                      }
                    </li>
                  )
                } else if (first === k) {
                  return (
                    <li key={k} className="item item-current" onClick={() => {this.showLightBox(k, sy, subHtml)}}>
                      <MediaItem aspectRatio='3:2' processType={EmImgProcessType.emGD_S_S} width={105} mediaUrl={v} water={false} />
                    </li>
                  )
                } else {
                  return (
                    <li key={k} className="item" onClick={() => {this.showLightBox(k, sy, subHtml)}}>
                      <MediaItem aspectRatio='3:2' processType={EmImgProcessType.emGD_S_S} width={105} mediaUrl={v} water={false} />
                    </li>
                  )
                }
              })
            }
          </ul>
          <div id="lightGallery"></div>
        </div>
        <div className="info-box">
          <div className="col-center">
            <h1 className="title">{name}</h1>
            <span className="content">{description}</span>
          </div>

          <div className="bottom-label">
            <ul className="label-box style">
              <li className="title">风格:</li>
              {
                _.map(caseStyleName.split(','), (v,k) => {
                  if (v === '') {
                    return null
                  }
                  return <li key={k}>{v}</li>
                })
              }
            </ul>
            <ul className="label-box color">
              <li className="title">色系:</li>
              {
                _.map(color.split(','), (v,k) => {
                  if (v === '') {
                    return null
                  }
                  return <li key={k}>{v}</li>
                })
              }
            </ul>
            {
              caseType
                ?
                <ul className="label-box type">
                  <li className="title">类型:</li>
                  {
                    caseType === 1
                      ?
                      <li>套系</li>
                      :
                      <li>定制</li>
                  }
                </ul>
                :
                null
            }
          </div>
        </div>
      </div>
    )
  },
  showLightBox(index, sy, subHtml) {
    let { imageList=[] } = this.props
    $('#lightGallery').lightGallery({
      download: false,
      index: index,
      loop: true,
      auto: true,
      pause: 4000,
      dynamic: true,
      dynamicEl: _.map(imageList, (v,k) => {
        return {
          src: `${v}@95q${sy}`,
          responsive: `${v}@4e_0o_0l_375w_95q.src${sy} 375, ${v}@4e_0o_0l_480w_95q.src${sy} 480, ${v}@4e_0o_0l_800w_95q.src${sy} 800`,
          thumb: `${v}@1e_1c_0o_0l_120w_95q.src${sy}`,
          iframe: false,
          subHtml: subHtml,
        }
      })
    })
  }
})

/*
 field = [{name:'', key:''}]
 title, fields = [], listData = [], sumTotal
* */
const PriceList = React.createClass({
  getInitialState() {
    return {
      isOpen:this.props.isOpen||false
    }
  },
  optFold() {
    this.setState({isOpen:!this.state.isOpen})
  },
  render() {
    const { title, fields = [], listData = [], sumTotal } = this.props
    let fieldsLen = fields.length
    let style = {}
    if (!this.state.isOpen) {
      style.display = 'none'
    }
    return (
      <div className="table">
        <div className="title-box">
          <span className="icon"></span>
          <span className="title">{title}</span>
          <div className="right-btn-box" onClick={()=>{this.optFold()}}>
            {
              this.state.isOpen
                ?
                <button>收起 <i className="icon unfold"></i></button>
                :
                <button>展开 <i className="icon"></i></button>
            }

          </div>
        </div>
        <table style={style}>
          <thead>
          <tr>
            {
              _.map(fields, (v, k) => {
                return (
                  <th key={k}>{v.name}</th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            _.map(listData, (v, k) => {
              return (
                <tr key={k}>
                  {
                    _.map(fields, (vv, kk) => {
                      return (
                        <td key={kk}>{v[vv.key]}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
          </tbody>
          <tfoot>
          <tr className="sum-row">
            {
              _.map(fields, (v, k) => {
                if (k === 0) {
                  return (
                    <td key={k}>合计</td>
                  )
                } else if (k === fieldsLen -1) {
                  return (
                    <td key={k}>{sumTotal}元</td>
                  )
                } else {
                  return (
                    <td key={k}></td>
                  )
                }
              })
            }
          </tr>
          </tfoot>
        </table>
      </div>
    )
  }
})


const ArrangePriceList = React.createClass({
  getInitialState() {
    return {
      isOpen:this.props.isOpen||false
    }
  },
  optFold() {
    this.setState({isOpen:!this.state.isOpen})
  },

  getAreaPrice(arrangeList) {
    let arrangeArea = {}
    _.each(arrangeList, (v) => {
      if (arrangeArea[v.areaName]) {
        arrangeArea[v.areaName].listData.push(v)
        arrangeArea[v.areaName].sumTotal += v.total
      } else {
        arrangeArea[v.areaName] = {
          listData: [],
          sumTotal: 0,
        }
      }
    })

    return arrangeArea
  },
  render() {
    const { title, fields = [], listData = [], sumTotal } = this.props
    let fieldsLen = fields.length
    let arrangePriceList = this.getAreaPrice(listData)
    let style = {}
    if (!this.state.isOpen) {
      style.display = 'none'
    }
    return (
      <div className="table">
        <div className="title-box">
          <span className="icon"></span>
          <span className="title">{title}</span>
          <div className="right-btn-box" onClick={()=>{this.optFold()}}>
            {
              this.state.isOpen
                ?
                <button>收起 <i className="icon unfold"></i></button>
                :
                <button>展开 <i className="icon"></i></button>
            }

          </div>
        </div>
        <table style={style}>
          <thead>
          <tr>
            {
              _.map(fields, (v, k) => {
                return (
                  <th key={k}>{v.name}</th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            _.map(arrangePriceList, (lv, lk) => {
              let len = lv.listData.length
              let isFirst = true
              return _.map(lv.listData, (v, k) => {
                return (
                  <tr key={k}>
                    {
                      _.map(fields, (vv, kk) => {
                        if (isFirst) {
                          isFirst = false
                          return (
                            <td key={kk} rowSpan={len}>{v[vv.key]}</td>
                          )
                        } else if (kk === 0) {
                          return null
                        }

                        return (
                          <td key={kk}>{v[vv.key]}</td>
                        )
                      })
                    }
                  </tr>
                )
              })
            })
          }
          </tbody>
          <tfoot>
          <tr className="sum-row">
            {
              _.map(fields, (v, k) => {
                if (k === 0) {
                  return (
                    <td key={k}>合计</td>
                  )
                } else if (k === fieldsLen -1) {
                  return (
                    <td key={k}>{sumTotal}元</td>
                  )
                } else {
                  return (
                    <td key={k}></td>
                  )
                }
              })
            }
          </tr>
          </tfoot>
        </table>
      </div>
    )
  }
})


/*
 field = [{name:'', key:''}]
 title, fields = [], listData = [], sumTotal
 * */
const PriceBox = React.createClass({
  render () {
    const {
      totalPrice,
      executerPrice,
      executerList='[]',
      lightPrice,
      lightList='[]',
      flowerPrice,
      flowerList='[]',
      transportPrice,
      transportList='[]',
      arrangePrice,
      arrangeList='[]',
      } = this.props

    return (
      <div className="price-box">
        <div className="case-menu">
          <div className="title">
            <span>布置费用</span> <i> ¥{totalPrice}</i>
          </div>
        </div>

        {
          executerList.length > 0
            ?
            <PriceList isOpen={true}
                       sumTotal={executerPrice}
                       listData={JSON.parse(executerList)}
                       title="执行人员"
                       fields={[
                       {name:'项目名称', key:'name'},
                       {name:'数量', key:'number'},
                       {name:'单位', key:'unit'},
                       {name:'单价(元)', key:'univalent'},
                       {name:'合计', key:'total'},
                       ]}/>
            :
            null
        }
        {
          arrangeList.length > 0
            ?
            <ArrangePriceList isOpen={true}
                              sumTotal={arrangePrice}
                              listData={JSON.parse(arrangeList)}
                              title="现场布置"
                              fields={[
                               {name:'区域',key: 'areaName'},
                               {name:'项目名称', key:'name'},
                               {name:'数量', key:'number'},
                               {name:'单位', key:'unit'},
                               {name:'单价(元)', key:'univalent'},
                               {name:'合计', key:'total'},
                               ]}/>
            :
            null
        }
        {
          lightList.length > 0
            ?
            <PriceList isOpen={true}
                       sumTotal={lightPrice}
                       listData={JSON.parse(lightList)}
                       title="灯光舞美"
                       fields={[
                       {name:'项目名称', key:'name'},
                       {name:'规格',key: 'spec'},
                       {name:'数量', key:'number'},
                       {name:'单位', key:'unit'},
                       {name:'单价(元)', key:'univalent'},
                       {name:'合计', key:'total'},
                       ]}/>
            :
            null
        }
        {
          flowerList.length > 0
            ?
            <PriceList isOpen={true}
                       sumTotal={flowerPrice}
                       listData={JSON.parse(flowerList)}
                       title="花车花艺"
                       fields={[
                       {name:'项目名称', key:'name'},
                       {name:'规格',key: 'spec'},
                       {name:'数量', key:'number'},
                       {name:'单位', key:'unit'},
                       {name:'单价(元)', key:'univalent'},
                       {name:'合计', key:'total'},
                       ]}/>
            :
            null
        }
        {
          transportList.length > 0
            ?
            <PriceList isOpen={true}
                       sumTotal={transportPrice}
                       listData={JSON.parse(transportList)}
                       title="运输费用"
                       fields={[
                       {name:'项目名称', key:'name'},
                       {name:'数量', key:'number'},
                       {name:'单位', key:'unit'},
                       {name:'单价(元)', key:'univalent'},
                       {name:'合计', key:'total'},
                       ]}/>
            :
            null
        }
      </div>
    )
  }
})

/*
 <Price {...this.state.data} />
 */
const CasesDetails = React.createClass({
  render () {
    const { pcDetailImages='[]', totalPrice=0 } = this.state.data
    const { isLan=false } = this.props.dataParams
    let imageList = JSON.parse(pcDetailImages)||[]
    return (
      <div className='alxq-view'>
        <HeadBox {...this.state.data} imageList={imageList} />
        {
          totalPrice > 0
            ?
            <PriceBox {...this.state.data} />
            :
            isLan
              ?
              <PriceInfo {...this.state.data} />
              :
              null
        }
      </div>
    )
  },
  getPrice() {
    const {} = this.state.data
  },
  getInitialState() {
    return {
      data:{}
    }
  },
  componentDidMount() {
    let cfg = CasesDetailsConfig['CasesDetails']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j=>{
        if(j.success && j.data.length > 0) {
          this.setState({data:j.data[0]})
        }
      })
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
