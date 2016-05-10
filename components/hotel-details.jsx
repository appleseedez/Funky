import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'
import { HotelDetailsConfig } from './config/hotel-details-config'

//const HotelThumb = React.createClass({
//  render () {
//    return (
//      <div className='img-info'>
//        <div className='slider-box-4-js'>
//          {
//            _.map(this.props.data,(v,k)=>{
//              let url=v+'@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
//              if (0===k) {
//                return (
//                  <a href={url} key={k} className='slider-hover-box' data-uk-lightbox='{group:"hotelThumb"}' data-lightbox-type='image' >
//                    <div className='big-img-box mgb30'>
//                      <MediaItem {...HotelDetailsConfig['HotelThumbMediaItem']} mediaUrl={v} water={false} />
//                    </div>
//                    <div className='slider-tip-box'>
//                      <span>点击看大图</span>
//                    </div>
//                  </a>
//                )
//              }else {
//                return (
//                  <a href={url} key={k} data-uk-lightbox='{group:"hotelThumb"}' data-lightbox-type='image'></a>
//                )
//              }
//            })
//          }
//        </div>
//      </div>
//    )
//  },
//  getDefaultProps(){
//    return {
//      data:[]
//    }
//  }
//})

const ThumbShow = React.createClass({

  render () {
    return (
      <div>
        {
          _.map(this.props.data,(v,k)=>{
            let url = v+'@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
            if (k === this.props.index) {
              return (
                <div className="wrap_bimg" key={k}>
                  <a href={url} className='slider-hover-box' data-uk-lightbox='{group:"hotelThumb"}' data-lightbox-type='image' >
                    <img src={url} />
                  </a>
                </div>
              )
            } else {
              return (
                <a href={url} key={k} data-uk-lightbox='{group:"hotelThumb"}' data-lightbox-type='image'></a>
              )
            }
          })
        }
      </div>
    )
  },

  getDefaultProps(){
    return {
      data:[],
      index: 0
    }
  }
});

const HotelThumb = React.createClass({
  render () {
    return (
      <div id="hotel_img_show" className="gallery">
        <ThumbShow data={this.props.data} index={this.state.index} />
        <div className="wrap_img_list">
          <div className="picul">
            <ul className="spic" style={{width:140*4}}>
              {
                _.map(this.props.data,(v,k)=>{
                  // 只显示4个
                  if ((k >= this.state.sIndex) && (k < this.state.sIndex+4)) {
                    return (
                      <li key={k} className="galleryItem stopGallery"
                          data-origin={v+'@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'}
                          onClick={this.click.bind(this, k)}
                      >
                        <img src={v+'@120w_75h_90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'} />
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <div className={this.state.previousClass} onClick={this.previous}></div>
          <div className={this.state.nextClass} onClick={this.next}></div>
        </div>
      </div>
    )
  },

  getDefaultProps(){
    return {
      data:[]
    }
  },

  getInitialState() {
    return {
      index:0,
      sIndex:0,
      previousClass:'left disabled',
      nextClass:'right'
    }
  },

  componentWillReceiveProps(nextProps) {
    let maxI = nextProps.data.length;
    if (maxI > 4) {
      this.setState(
        {sIndex:0, previousClass:'left disabled', nextClass:'right'}
      );
    } else {
      this.setState(
        {sIndex:0, previousClass:'left disabled', nextClass:'right disabled'}
      );
    }
  },

  componentDidMount() {
  },

  previous(e) {
    let index = this.state.sIndex;
    let maxI = this.props.data.length;
    if (index-4 <= 0) {
      index = 0;
      if (maxI <= 4) {
        this.setState(
          {sIndex:index, previousClass:'left disabled', nextClass:'right disabled'}
        );
      } else {
        this.setState(
          {sIndex:index, previousClass:'left disabled', nextClass:'right'}
        );
      }
    } else {
      index -= 4;
      if (maxI > index+4) {
        this.setState(
          {sIndex:index, previousClass:'left', nextClass:'right'}
        );
      } else {
        this.setState(
          {sIndex:index, previousClass:'left', nextClass:'right disabled'}
        );
      }
    }
  },

  next(e) {
    let index = this.state.sIndex;
    let maxI = this.props.data.length;
    if (index+4 < maxI) {
      index += 4;
      this.setState(
        {sIndex:index, previousClass:'left', nextClass:'right'}
      );
    } else {
      this.setState(
        {sIndex:index, nextClass:'right disabled'}
      );
    }
  },

  click(index, e) {
    this.setState({index:index});
  }
})

const HotelBaseInfo = React.createClass({
  render () {
    return (
      <div className="base-info">
        <h1 className="mgb10">{this.props.name}</h1>
        <div className="p mgb30 clearfix">
          <p>酒店类型:<span><b>{this.props.typeName}</b></span></p>
          <p>消费价格:<span><b>{'¥'+this.props.lowestConsumption}</b>-<b>{this.props.highestConsumption}</b>/桌</span></p>
          <p>宴会厅数量:<span><b>{(this.props.banquetHall && this.props.banquetHall.length) || 0}</b>个专用宴会厅</span></p>
          <p>最大容客数:<span><b>{this.props.maxTableNum}</b>桌</span></p>
          <p>联系方式:<span><b>400-015-9999</b></span></p>
          <p id="J_AddressButton" >酒店地址:<span>
            <a href={'/map/'+this.props.longitude+'/'+this.props.latitude} target='_blank'>
              <b>{this.props.address}</b>
              <i className="ico-8-js" />
            </a>
            </span>
          </p>
        </div>
        <div id='J_InfoContainer' className="score-info mgb40 clearfix">
          {
            <div className="star-box">
              <div className="star">
                <span>服务质量</span>
                <div>
                  <i className="ico-star-3-js ico-star-3-gray-js" />
                  <i className="ico-star-3-js ico-star-3-pink-js" style={{width:45}} />
                </div>
              </div>
              <div className="star">
                <span>菜品质量</span>
                <div>
                  <i className="ico-star-3-js ico-star-3-gray-js" />
                  <i className="ico-star-3-js ico-star-3-pink-js" />
                </div>
              </div>
              <div className="star">
                <span>装修档次</span>
                <div>
                  <i className="ico-star-3-js ico-star-3-gray-js" />
                  <i className="ico-star-3-js ico-star-3-pink-js" />
                </div>
              </div>
            </div>
          }
          <div className="etc">
            <div className="item">
              <a href="/activity/detail/libao" target="_blank">
                <em>礼包</em>
                <span>通过金色百年预定婚宴，领取12999大礼包</span>
              </a>
            </div>
            <div className="item">
              <a href="/activity/detail/zuhe" target="_blank">
                <em>优惠</em>
                <span>消费项目越多，优惠力度越大</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  },
  getDefaultProps(){
    return {
      data:{
        'name':'金色百年',
        'typeName':'特色酒店',
        'banquetHall':[]
      }
    }
  }
})

const HotelIntroduction = React.createClass({
  render () {
    return (
      <div className="hotel-info-box mgb30">
          <div className="img-box">
              <MediaItem {...HotelDetailsConfig['CoverMediaItem']} mediaUrl={this.props.coverUrlWeb} water={false} />
          </div>
          <div className="p">
              <p>{ this.props.introduction }</p>
          </div>
      </div>
    )
  },
  getDefaultProps(){
    return {
      coverUrlWeb:'',
      introduction:''
    }
  }
})

const HotelHall = React.createClass({
  render () {
    return (
      <ul className="list-recommend">
        {
          _.map(this.props.banquetHall,function(v,k){
            return (
              <li key={k} className={(k%2 === 1)?'item-box mgb20 mg0' :'item-box mgb20 mgr20'}>
                <div className="title-box">
                  <h2>{v.name}</h2>
                </div>
                <div className="img-box">
                  <MediaItem {...HotelDetailsConfig['CoverMediaItem']} mediaUrl={v.coverUrlWeb} water={false} />
                </div>
                <div className="info-box">
                  <ul className="clearfix">
                    <li className="li_w1"><span >桌数：</span><span><span>{(v.maxTableNum || '--')}</span><span>桌</span></span></li>
                    <li className="li_w1"><span>柱子：</span><span>{parseInt(v.pillerNum)>0?'有':'无' || '--'}</span></li>
                    <li className="li_w2"><span>面积：</span><span><span>{(v.area||'--')}</span><span>平方米</span></span></li>
                    <li className="li_w1"><span>形状：</span><span>{v.shape || '--'}</span></li>
                    <li className="li_w1"><span>层高：</span><span><span>{v.height || '--'}</span><span>米</span></span></li>
                    <li className="li_w2"><span>低消：</span><span><span>¥</span><span>{ parseFloat(v.lowestConsumption).toFixed(2)}</span><span>／桌</span></span></li>
                  </ul>
                    <a className="btn-js btn-grayline-pink-1-js transition-bg"
                        href={'/hall/'+v.id}>查看详情</a>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  },
  getDefaultProps(){
    return {
      banquetHall:[]
    }
  }
})


const HotelMenu = React.createClass({
  render () {
    return (
      <div className="package-menu">
        <ul className="hotel-menu-list" id="hotel_menu_list">
          {
            _.map(this.props.data,function(v,i){
              return (
                <li className={i === 0 && "list-item-1-js list-item-1-current-js" || "list-item-1-js"} key={i}>
                  <div className="item-box">
                    <h3 className="transition">
                    <span>{v.name}</span>
                    </h3>
                    <i className="arrow-rig" />
                  <span className="pirce">
                    <strong>￥</strong>
                    <b>{v.price}</b>
                    <strong>／桌</strong>
                  </span>
                    <i className="arrow-lef" />
                    <a className="more transition">详情</a>
                  </div>
                  <div className="cont-menu transition">
                    <dl>
                      {
                        v.dishesList.length>0 ? _.map(v.dishesList,function(vx,ix){return (<dd key={ix}>{vx.name}</dd>)}) : <span><b>*暂无菜单,请到店详询.</b></span>
                      }
                    </dl>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  },
  componentDidMount() {
    let $hotel_menu_list = $('#hotel_menu_list')

    $hotel_menu_list.on('click', 'li', function() {
      if ($(this).hasClass('list-item-1-current-js')) {
        $(this).removeClass('list-item-1-current-js');
        return;
      }
      $(this).addClass('list-item-1-current-js').siblings().removeClass('list-item-1-current-js')
    })
  }
})


const HotelRecommend = React.createClass({
  render () {
    return (
      <ul className="list-adv">
        {
          _.map(this.state.recommends,function(v,k){
            return (
              <li className="item-box" key={k}>
                <a href={'/hotel/'+v.id} className='img-box' target='_blank'>
                  <MediaItem mediaUrl={v.coverUrlWeb} width={168} aspectRatio='3:2' />
                </a>
                <div className="title-box">
                <span>{v.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  },
  getDefaultProps(){
    return {
      conditions:{}
    }
  },
  getInitialState() {
    return {
      recommends:[{
        'coverUrlWeb':'',
        'name':'金色百年'
      }]
    }
  },
  componentWillReceiveProps(nextProps) {
    let p = ''
    if (_.size(this.props.params)>0) {
      p = '?' + $.param(_.merge(this.props.params,nextProps.conditions))
    }
    fetch(this.props.baseUrl + this.props.dataUrl + p )
    .then(res=>res.json())
    .then(j =>{
      this.setState({
        recommends:j.data
      })
    })
  },
  componentDidMount() {
    let p = ''
    if (_.size(this.props.params)>0) {
      p = '?' + $.param(this.props.params)
    }

    fetch(this.props.baseUrl + this.props.dataUrl + p )
    .then(res=>res.json())
    .then(j =>{
      this.setState({
        recommends:j.data
      })
    })
  }
})


const HotelDetails = React.createClass({
  render () {
    let thumbs = JSON.parse(this.state.details.pcDetailImages||'[]')
    let menus = JSON.parse(this.state.details.setMealDetail || '[]')
    let recommendCondition = {
      'minPrice':
      this.state.details.lowestConsumption || 0
    }
    return (
      <div className='hyyd-detail-view'>
        <div className='layout-center-box'>
          <div className='hotel-detail-box'>
            <HotelThumb data={thumbs} />
            <HotelBaseInfo {...this.state.details} />
          </div>
          <div className='leftInner'>
            <div className="hotel-detail-info clearfix">
              <h2 className="mgb10">酒店介绍</h2>
              <HotelIntroduction {...this.state.details} />
              <h2 className="mgb20">宴会厅介绍</h2>
              <HotelHall {...this.state.details} />
              <h2 id='test'>婚宴套系菜单</h2>
              <HotelMenu data={menus}/>
            </div>
          </div>
          <div className='recommend-adv-box'>
            <div className='hotel-recommend-adv-box clearfix'>
              <div className="title-rcmd">
                  <h1>推荐酒店</h1>
                  <div className="line-middle" />
              </div>
              <div className="sel-card-jsbn">
                  <span className="item">同价位</span>
              </div>
              <HotelRecommend {...HotelDetailsConfig['HotelRecommend']} conditions={recommendCondition} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  getInitialState() {
    return {
      details:{ },
      recommends:[]
    }
  },
  componentDidMount() {
    let cfg = HotelDetailsConfig['HotelDetails']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    if(fetchUrl){
      fetch(fetchUrl)
        .then(resp => {return resp.json()})
        .then(jsonData=>{
          this.setState({details:jsonData.data[0]})
        })
    }
  }
})

export  { HotelDetails }
