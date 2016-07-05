import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/item-media.jsx'
import { HotelDetailsConfig } from './config/hotel-details-config'
import { Calendar } from './common/calendar.jsx'
import { MapLocation } from './common/map-location.jsx'
import { NetApi } from './common/net-api'

const HintType = {
  emHT_INIT:-1,// 初始状态
  emHT_SEE_SITE:0,// 查看酒店场地
  emHT_SEE_HOTEL_SCHEDULE:1, // 查看酒店档期
  emHT_SEE_HALL_SCHEDULE:2, // 查看宴会厅档期
}

const SexRadio = React.createClass({

  getInitialState() {
    return {
      indexId:0,
      data:[
        {id:0, text:'男'},
        {id:1, text:'女'}
      ]
    };
  },

  render () {
    return (
      <div className="radio-box">
        {
          _.map(this.state.data, (v,k)=>{
            let handle = this.checked.bind(this, v.id);
            return (
              <input key={k} name="sex" type="radio" onChange={handle} checked={this.state.indexId === v.id}><span>{v.text}</span></input>
            )
          })
        }
      </div>
    )
  },

  checked(id, e) {
    // 不要去调用e.preventDefault();会阻止事件的传递,导致不能选中
    this.setState({indexId:id});
  },

  getValue() {
    return this.state.indexId;
  }
})

// 提交内容组件
const CommitContent = React.createClass({

  getInitialState() {
    return {
      // 错误信息
      errMsg:'',
      // 是否显示倒计时,用于重新获取验证码
      showTimeFlg:false,
      // 获取验证码间隔时间
      timeNum:60,
      // 控制提交按钮的点击
      commitFlg:true,
    };
  },

  propTypes: {
    parameter:PropTypes.object,
  },

  getDefaultProps(){
    return {
      parameter:{},
    }
  },

  init() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.setState({
      errMsg:'',
      showTimeFlg:false,
      timeNum:60,
      commitFlg:true,
    })
  },

  render() {
    return (
      <div>
        <div className="phone-box">
          <label className="not-null-label">*</label>
          <input className="input-phone"
                 type="text"
                 maxlength="11"
                 placeholder="请输入您的手机号"
                 ref={(ref)=>this.phone=ref} ></input>
        </div>
        <div className="pin-box">
          <label className="not-null-label">*</label>
          <input className="input-pin"
                 type="text"
                 placeholder="请输入短信验证码"
                 maxlength="6"
                 ref={(ref)=>this.sms=ref} ></input>
          {
            this.state.showTimeFlg
              ? <div className="send-pin-btn invalid-btn" >{this.state.timeNum+'秒后重新获取'}</div>
              : <div className="send-pin-btn" onClick={this.getSMS}>获取验证码</div>
          }
        </div>
        <div className="name-box">
          <input className="input-name"
                 type="text"
                 maxlength="11"
                 placeholder="请输入你的姓名"
                 ref={(ref)=>this.contactName=ref} ></input>
          <SexRadio ref={(ref)=>this.gender=ref} />
        </div>
        <div className="desc-box">
          <textarea
            className="input-desc"
            placeholder="备注信息"
            ref={(ref)=>this.remark=ref} ></textarea>
        </div>
        <div className="error">{this.state.errMsg}</div>
        {
          this.state.commitFlg
            ? <div className="confirm-btn" onClick={this.commit}><span>提交需求</span></div>
            : <div className="confirm-btn invalid-btn">
                <span>提交需求</span>
                <div className="icon-box">
                  <img src="http://img2.jsbn.com/static/loading.gif" />
                </div>
              </div>
        }
      </div>
    )
  },

  getSMS(e) {
    e.preventDefault();

    let phone = this.phone.value;
    if (phone.length !== 11) {
      this.setState({
        errMsg:'请输入正确的手机号'
      })
      return;
    }

    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
      this.setState({
        errMsg:'请输入正确的手机号'
      })
      return;
    }

    this.setState({
      errMsg:''
    })

    NetApi.post('/bus/sms', {contact:phone}, (err, j)=>{
      if (err) {
        this.setState({
          errMsg:'获取验证码失败,请稍后重试.'
        })
      }
    })

    this.setState({showTimeFlg:true});
    this.intervalId = setInterval(()=>{
      let i = this.state.timeNum;
      if (--i < 0) {
        this.setState({timeNum:60, showTimeFlg:false})
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      } else {
        this.setState({timeNum:i})
      }
    }, 1000);
  },

  commit(e) {
    e.preventDefault();
    // 电话号码
    let phoneValue = this.phone.value;
    // 短信验证码
    let smsValue = this.sms.value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneValue))) {
      this.setState({
        errMsg:'请输入正确的手机号码'
      })
    } else if (!(/\d{6}$/.test(smsValue))) {
      this.setState({
        errMsg:'请输入正确的验证码'
      })
    } else {
      let body={
        code:smsValue,
        contact:phoneValue,
        remark:this.remark.value||'',
        contactName:this.contactName.value||'',
        gender:this.gender.getValue()||0,
        bookingTime:this.props.parameter.schedule||'',
        place:this.props.parameter.place||'',
        tableNum:this.props.parameter.tableNum||'',
        hotelName:this.props.parameter.hotelName||'',
      }
      // 设置在请求回来之前不能提交
      this.setState({
        commitFlg:false,
        errMsg:'',
      })
      NetApi.post('/bus/hotelSurvey', body, (err, j)=>{
        if (err) {
          this.setState({
            commitFlg:true,
            errMsg:err
          })
        } else {
          if (!j.success) {
            this.setState({
              commitFlg:true,
              errMsg:j.message
            })
          } else {
            // 提交成功,通知父组件
            if (this.props.notifySucceed) {
              this.props.notifySucceed();
            }
          }
        }
      })
    }
  },

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
})

const HintBox = React.createClass({

  getInitialState() {
    return {
      // 提示类型
      hintType:HintType.emHT_INIT,
      // 显示状态
      showFlg:false,
      // 提交成功标志
      cmitSuceFlg:false,
      // 参数
      parameter: {},
    };
  },

  getSucHint(msg) {
    return (
      <div className="submit-layer-box">
        <div className="title-text">
          <span>&emsp;&emsp;{msg}</span>
          <strong>，稍后我们会安排专属客服为您服务。感谢您对金色百年的信任与支持！</strong>
          <div className="subtitle-text">
            <strong>&emsp;&emsp;特别提醒小主，通过我们平台成功预订该酒店即可享受金色百年送出的超值大礼包哟，不要错过了哟！</strong>
          </div>
        </div>
      </div>
    )
  },

  //请留下联系信息，我们将免费为您安排酒店经理专门接待您
  render () {
    let title='';
    let content=null;
    let kClass='';

    // 判断是否显示
    if (this.state.showFlg) {
      kClass=' show';
    }

    switch (this.state.hintType) {
      case HintType.emHT_INIT: {
        return null;
      }
      case HintType.emHT_SEE_SITE: {
        title='场地预约'
        if (this.state.cmitSuceFlg) {
          content=this.getSucHint('场地预约提交成功');
        } else {
          content=(
            <div className="submit-layer-box">
              <div className="name">
                <span className="hotel-name">{this.state.parameter.hotelName}</span>
              </div>
              <div className="text">
                <strong>为了更高效的为你预约该场地，请完善下面的内容，便于我们的工作人员即时与您联系。</strong>
              </div>
              <CommitContent parameter={this.state.parameter} ref={(ref)=>this.commitContent=ref} notifySucceed={this.commitSucceed} />
            </div>
          )
        }
        break;
      }
      case HintType.emHT_SEE_HOTEL_SCHEDULE: {
        title='酒店档期查询'
        if (this.state.cmitSuceFlg) {
          content=this.getSucHint('酒店档期查询提交成功');
        } else {
          content=(
            <div className="submit-layer-box">
              <div className="name">
                <span className="hotel-name">{this.state.parameter.hotelName}</span>
              </div>
              <div className="text">
                <strong>为了帮你准确查询：</strong>
                <span>{this.state.parameter.schedule}</span>
                <strong>该酒店的档期情况，请完善下面的内容，便于我们的工作人员即时与您联系并介绍该酒店的实时档期信息。</strong>
              </div>
              <CommitContent parameter={this.state.parameter} ref={(ref)=>this.commitContent=ref} notifySucceed={this.commitSucceed} />
            </div>
          )
        }
        break;
      }
      case HintType.emHT_SEE_HALL_SCHEDULE: {
        title='宴会厅档期查询'
        if (this.state.cmitSuceFlg) {
          content=this.getSucHint('宴会厅档期查询提交成功');
        } else {
          content=(
            <div className="submit-layer-box">
              <div className="name">
                <span className="hotel-name">{this.state.parameter.hotelName}</span>
                <span className="hall-name">{this.state.parameter.banquetHallName}</span>
              </div>
              <div className="text">
                <strong>为了帮你准确查询：</strong>
                <span>{this.state.parameter.schedule}</span>
                <strong>该宴会厅的婚宴档期情况，请完善下面的内容，便于我们的工作人员即时与您联系并介绍该宴会厅的实时档期信息。</strong>
              </div>
              <CommitContent parameter={this.state.parameter} ref={(ref)=>this.commitContent=ref} notifySucceed={this.commitSucceed} />
            </div>
          )
        }
        break;
      }
      default:{
        return null;
      }
    }

    return (
      <div className={"flex-full-box"+kClass}>
        <div className="shadow-box"></div>
        <div className="center-cell">
          <div className="center-box query-schedule-box">
            <div className="title">
              <div className="close" onClick={this.close}></div>
              {title}
            </div>
            {
              content
            }
          </div>
        </div>
      </div>
    )
  },

  setData(parameter, hintType) {
    this.setState({
      showFlg:true,
      cmitSuceFlg:false,
      parameter:parameter,
      hintType:hintType,
    })
  },

  close(e) {
    e.preventDefault();
    this.setState({
      showFlg:false,
      cmitSuceFlg:false,
      parameter:{},
    })
    if (this.commitContent && typeof this.commitContent.init == 'function') {
      this.commitContent.init();
    }
  },

  commitSucceed() {
    this.commitContent.init();
    this.setState({
      cmitSuceFlg:true,
    })
  }
})

const ThumbShow = React.createClass({

  propTypes: {
    data:PropTypes.array,
    index:PropTypes.number
  },

  getDefaultProps(){
    return {
      data:[],
      index:0
    }
  },

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
  }
})

const HotelThumb = React.createClass({

  getInitialState() {
    return {
      index:0,
      sIndex:0,
      previousClass:'left disabled',
      nextClass:'right'
    };
  },

  propTypes: {
    data:PropTypes.array,
  },

  getDefaultProps(){
    return {
      data:[],
    }
  },

  render () {
    return (
      <div className="gallery">
        <ThumbShow data={this.props.data} index={this.state.index}/>
        <div className="wrap_img_list">
          <div className="picul">
            <ul className="spic" style={{width:140*4}}>
              {
                _.map(this.props.data, (v, k)=> {
                  // 只显示4个
                  if ((k >= this.state.sIndex) && (k < this.state.sIndex + 4)) {
                    return (
                      <li key={k} className="galleryItem stopGallery"
                          data-origin={v+'@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'}
                          onClick={this.click.bind(this, k)}>
                        <img src={v+'@120w_75h_90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'}/>
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
    e.preventDefault();
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
    e.preventDefault();
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
    // 酒店描述
    let des = this.props.introduction||'';
    if (des.length > 50) {
      des = des.substring(0, 50);
      des += '...';
    }

    // 酒店地址
    let address = this.props.address||'';
    if (address.length > 6) {
      address = address.substring(0, address.length-5);
    }
    address+='***'

    // 酒店标签
    let featureLabel = [];
    if (this.props.featureLabel) {
      featureLabel = this.props.featureLabel.split('、')||[];
    }

    // 促销优惠
    if (this.props.lableDetail) {
      _.each(JSON.parse(this.props.lableDetail), (v,k)=>{
        featureLabel.push(v.name);
      })
    }

    // 宴会厅个数
    let banquetHallNum = 0;
    if (this.props.banquetHall) {
      banquetHallNum = this.props.banquetHall.length;
    }

    return (
      <div className="base-info">

        <div className="hotel-title">
          <span className="title">{this.props.name||''}</span>
          <span className="desc-text">{des}<strong className="see-hotel-desc" onClick={this.hrefIntroduction} >&gt;&gt;详情</strong></span>
        </div>
        <div className="hotel-price-box">
          <span className="hint">价格：¥</span>
          <b className="text"><i>{this.props.lowestConsumption+'-'+this.props.highestConsumption}</i> /桌</b>
        </div>

        <div className="activity-box">
          <div className="list-item">
            <div className="item">
              <a href="/activity/detail/libao?parentKey=hotel&menuKey=libao" target="_blank">
                <em>礼包</em>
                <span>通过金色百年预定婚宴，领取万元品质大礼包</span>
              </a>
            </div>
          </div>
        </div>

        <div className="parameter-box">
          <strong>类型：<b>{this.props.typeName||''}</b></strong>
          <strong>容纳桌数：<b>{this.props.maxTableNum||0}桌</b> </strong>
          <strong>宴厅数量：<b>{banquetHallNum}个专用宴会厅</b> </strong>
          <strong>地址：<b><span>{address}</span><span className="seeMap" onClick={this.hrefIntroduction}>查看地图</span></b></strong>
        </div>

        <div className="tab-box">
          <div className="tag-title">标签:</div>
          <div className="hotel-tag-list">
            {
              _.map(featureLabel,(v,k)=>{
                return (
                  <span key={k} className="hotel-tag">{v}</span>
                )
              })
            }
          </div>
        </div>

        <div className="business-btn-box">
          <div className="schedule-btn" ref={(ref)=>this.schedule=ref} onClick={this.showCalendar.bind(this, this.schedule)}>查看档期</div>
          <div className="site-see-btn" ref={(ref)=>this.site=ref} onClick={this.showSite}>预约看场地</div>
          <div className="phone-number">
            <span className="hint">联系商家：</span>
            <span className="text">400-015-9999</span>
          </div>
        </div>
      </div>
    )
  },

  showCalendar(obj, e){
    e.stopPropagation();
    let top = $(obj).offset().top+$(obj).height();
    let left = $(obj).offset().left;
    if (this.props.optCalendar) {
      this.props.optCalendar(true, top, left, {type:HintType.emHT_SEE_HOTEL_SCHEDULE});
    }
  },

  showSite(e) {
    e.preventDefault();
    if (this.props.optSite) {
      this.props.optSite();
    }
  },

  hrefIntroduction(e) {
    e.preventDefault();
    window.location.href="#introduction"
  }
})

const HeaderContent = React.createClass({
  render() {
    let thumbs = JSON.parse(this.props.pcDetailImages||'[]')
    return (
      <div className="header-module">
        <div className="layout-center-box">
          <div className="hotel-detail-box clearfix">
            <HotelThumb data={thumbs} />
            <HotelBaseInfo {...this.props} />
          </div>
        </div>
      </div>
    )
  }
})

const HotelHall = React.createClass({

  render() {
    return (
      <div className="layout-center-box">
        <div className="hotel-title-box">
          <i className="line"></i>
          <span className="text">宴会厅介绍</span>
        </div>
        <ul className="list-recommend">
          {
            _.map(this.props.banquetHall||[],(v,k)=>{
              let detailImage=JSON.parse(v.pcDetailImages||'[]');
              let group = "{'group':'hotelHall-"+v.id+"'}"
              return (
                <li key={k} className="item-box">
                  <div className="img-box">
                    <a href={v.graphicDesignUrl||v.coverUrlWeb} className='slider-hover-box' data-uk-lightbox={group} data-lightbox-type='image' >
                      <MediaItem
                        aspectRatio="3:2"
                        imageUrl={v.coverUrlWeb}
                        processType={EmImgProcessType.emGD_S_S}
                        height={600}
                      />
                    </a>
                    {
                      _.map(detailImage,(vv,kk)=>{
                        let url = vv+'@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
                        return (
                          <a href={url} key={kk} data-uk-lightbox={group} data-lightbox-type='image'></a>
                        )
                      })
                    }
                  </div>
                  <div className="info-box">
                    <div className="title-box"><h2>{v.name}</h2></div>
                    <ul className="info-list">
                      <li><span className="hint">桌数:</span> <span className="text">{v.maxTableNum}桌</span></li>
                      <li><span className="hint">柱子:</span> <span className="text">{parseInt(v.pillerNum)>0?'有':'无'}</span></li>
                      <li><span className="hint">面积:</span> <span className="text">{v.area}平方米</span></li>
                      <li><span className="hint">形状:</span> <span className="text">{v.shape}</span></li>
                      <li><span className="hint">层高:</span> <span className="text">{v.height}米</span></li>
                      <li><span className="hint">低消:</span> <span className="text">¥{v.lowestConsumption}/桌</span></li>
                    </ul>
                    <div className="btn-query" ref={(ref)=>this.query[k]=ref} onClick={this.showCalendar.bind(this, this.query, k, v.name)} >查询档期</div>
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
    this.query=[];
  },

  showCalendar(obj, k, hallName, e){
    e.stopPropagation();
    let top = $(obj[k]).offset().top+$(obj[k]).height();
    let left = $(obj[k]).offset().left;
    if (this.props.optCalendar) {
      this.props.optCalendar(true, top, left, {banquetHallName:hallName, type:HintType.emHT_SEE_HALL_SCHEDULE});
    }
  }
})

const HotelMenu = React.createClass({

  getMenuContent() {
    let setMealDetail = [];
    if (this.props.setMealDetail) {
      setMealDetail = JSON.parse(this.props.setMealDetail);
    }

    let content = {
      v:[],
      n:[],
    };

    _.each(setMealDetail, (v,k)=>{
      if (v.dishesList && v.dishesList.length>0) {
        content.v.push(
          <li key={k} className="menu-item">
            <div className="cd-name">
              <div className="name">{v.name}</div>
              <div className="outer-box"></div>
              <div className="inner-box"></div>
              <div className="price-box">
                <i>¥</i>
                <span>{v.price}</span>
                <i>/桌</i>
              </div>
            </div>
            <div className="cd-list">
              <ul>
                {
                  _.map(v.dishesList, (v,k)=>{
                    return (
                      <li key={k}>{v.name}</li>
                    )
                  })
                }
              </ul>
            </div>
          </li>
        );
      } else {
        content.n.push(
          <li key={k} className="menu-item">
            <div className="cd-name">
              <div className="name">{v.name}</div>
              <div className="outer-box"></div>
              <div className="inner-box"></div>
              <div className="price-box">
                <i>¥</i>
                <span>{v.price}</span>
                <i>/桌</i>
              </div>
            </div>
            <div className="cd-list">
              <div className="hint-text">暂无菜单,请到店详询.</div>
            </div>
          </li>
        )
      }
    })

    return content;
  },

  render() {
    let content = this.getMenuContent();
    return (
      <div className="layout-center-box">
        <div className="hotel-title-box">
          <i className="line"></i>
          <span className="text">婚宴菜单</span>
        </div>
        <div className="package-menu">
          <ul className="hotel-menu-list">
            {
              content.v
            }
          </ul>
          <ul className="hotel-menu-null-list">
            {
              content.n
            }
          </ul>
        </div>
      </div>
    )
  }
})

const HotelIntroduction = React.createClass({
  render() {
    // 酒店地址
    let address = this.props.address||'';

    return (
      <div id="introduction" className="layout-center-box">
        <div className="hotel-title-box">
          <i className="line"></i>
          <span className="text">酒店介绍</span>
        </div>
        <div className="hotel-desc-box">
          <div className="map-box">
            <div className="map">
              {
                this.props.latitude
                  ? <MapLocation latitude={this.props.latitude} longitude={this.props.longitude} />
                  : null
              }
            </div>
            <div className="info-box">
              <div className="address-box">
                <p>酒店地址：<i>{address}</i>(到店前请提前预约)</p>
              </div>
            </div>
          </div>
          <div className="detail-box">
            <div className="desc-box">
              <div className="desc-text">&emsp;&emsp;{this.props.introduction}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

const BodyContent = React.createClass({
  render() {
    return (
      <div className="content-module">
        <HotelHall {...this.props} />
        <HotelMenu {...this.props} />
        <HotelIntroduction {...this.props} />
      </div>
    )
  }
})

const HotelDetails = React.createClass({

  getInitialState() {
    return {
      details:{}
    };
  },

  render () {
    return (
      <div className='hyyd-detail-view' onClick={this.click}>
        <HeaderContent {...this.state.details} optCalendar={this.optCalendar} optSite={this.optSite}/>
        <BodyContent {...this.state.details} optCalendar={this.optCalendar} />
        <Calendar onDateChange={this.onDateChange} ref={(ref)=>this.myCalendar=ref} />
        <HintBox ref={(ref)=>this.myHintSeeSchedule=ref} />
      </div>
    )
  },

  click(e) {
    // 不要去阻止事件
    this.optCalendar(false, null, null);
  },

  optCalendar(showFlg, top, left, external) {
    this.myCalendar.setChange(showFlg, top, left, 2, external);
  },

  optSite() {
    let p = {
      // 酒店名称
      hotelName:this.state.details.name,
      // 区域
      place:''+this.state.details.cityId,
    }
    this.myHintSeeSchedule.setData(p, HintType.emHT_SEE_SITE);
  },

  onDateChange(dateStr, external) {
    // 隐藏日历
    this.optCalendar(false, null, null);
    let p = {
      // 酒店名称
      hotelName:this.state.details.name,
      // 宴会厅名称
      banquetHallName:external.banquetHallName||'',
      // 档期时间
      schedule:dateStr,
      // 区域
      place:''+this.state.details.cityId,
    }
    this.myHintSeeSchedule.setData(p, external.type);
  },

  componentDidUpdate() {
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
