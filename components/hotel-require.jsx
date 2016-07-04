import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Calendar } from './common/calendar.jsx'
import { NetApi } from './common/net-api'
import { MediaItem, EmImgProcessType } from './common/item-media.jsx'

const UserInfo = React.createClass({
  getInitialState() {
    return {
      sexIndex:0,
      sexData:[
        {id:0, text:'男'},
        {id:1, text:'女'}
      ]
    };
  },

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">请输入您的个人信息</label>
        </div>
        <div className="data-box">
          <div className="info-box">
            <input type="text" placeholder="姓名" ref={(ref)=>this.contactName=ref}></input>
            {
              _.map(this.state.sexData, (v,k)=>{
                let handle = this.sexChecked.bind(this, v.id);
                return (
                  <input key={k} name="sex" type="radio" onChange={handle} checked={this.state.sexIndex === v.id}><span>{v.text}</span></input>
                )
              })
            }
          </div>
        </div>
      </li>
    )
  },

  sexChecked(id, e) {
    // 不要去调用e.preventDefault();会阻止事件的传递,导致不能选中
    this.setState({sexIndex:id});
  },

  getValue() {
    return {
      contactName:this.contactName.value||'',
      gender:this.state.sexIndex,
    }
  }
})

const ContactInfo = React.createClass({
  getInitialState() {
    return {
      // 是否显示倒计时,用于重新获取验证码
      showTimeFlg:false,
      // 获取验证码间隔时间
      timeNum:60,
      // 错误信息
      errMsg:'',
    };
  },

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">请输入您的手机号</label>
          <i className="hint-icon">*</i>
        </div>
        <div className="data-box">
          <div className="phone-box">
            <input
              className="input-phone"
              type="text"
              maxlength="11"
              placeholder="请输入您的手机号"
              ref={(ref)=>this.phone=ref} ></input>
            <input
              className="input-pin"
              type="text"
              maxlength="6"
              placeholder="请输入短信验证码"
              ref={(ref)=>this.sms=ref} ></input>
            {
              this.state.showTimeFlg
                ? <button type="button" className="send-pin-btn invalid-btn" >{this.state.timeNum+'秒后重新获取'}</button>
                : <button type="button" className="send-pin-btn" onClick={this.getSMS}>获取验证码</button>
            }
          </div>
          {
            this.state.errMsg.length>0
              ? <div className="error">{this.state.errMsg}</div>
              : null
          }
        </div>
      </li>
    )
  },

  setErr(msg) {
    this.setState({errMsg:msg});
  },

  getValue() {
    return {
      contact:this.phone.value,
      code:this.sms.value,
    }
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

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
})

const BookingTimeInfo = React.createClass({

  getInitialState() {
    // 现在时间
    let dateNow = new Date();
    let dateNowStr = dateNow.getFullYear()+'年'+(dateNow.getMonth()+1)+'月'+dateNow.getDate()+'日';
    return {
      index:0,// 0:日历选择 1:还未确定选择
      bookingTime:dateNowStr
    };
  },

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">您的预订时间</label>
        </div>
        <div className="data-box">
          <div className="date-box">
            <div className={this.state.index===0?"btn-group checked":"btn-group"}
                 ref={(ref)=>this.booking=ref}
                 onClick={this.clickChecked.bind(this, 0, this.booking)} >
              <button type="button" className="btn ">
                <span className="title">{this.state.bookingTime}</span>
                <i className="icon-font">&#xe607;</i>
              </button>
            </div>
            <div className={this.state.index===0?"btn-group":"btn-group checked"}
                 onClick={this.clickChecked.bind(this, 1, null)} >
              <button type="button" className="btn ">
                <span className="title">还不确定</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  },

  componentDidMount() {
    this.setState({index:1});
  },

  clickChecked(index, obj, e) {
    if (index === 0) {
      e.stopPropagation();
      let top = $(obj).offset().top+$(obj).height();
      let left = $(obj).offset().left;
      if (this.props.optCalendar) {
        this.props.optCalendar(true, top, left, 2, {})
      }
    } else {
      e.preventDefault();
    }
    this.setState({index:index});
  },

  getValue() {
    if (this.state.index == 1) {
      return {
        bookingTime:'',
      }
    } else {
      return {
        bookingTime:this.state.bookingTime,
      }
    }
  },

  setValue(p) {
    this.setState({bookingTime:p.bookingTime})
  }
})

const PlaceInfo = React.createClass({
  getInitialState() {
    return {
      index:0,
      data:[
        {id:-1,name:'未确定'}
      ]
    };
  },

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">您的婚礼会在哪个区办呢</label>
        </div>
        <div className="data-box">
          <ul className="option-group">
            {
              _.map(this.state.data,(v,k)=>{
                let handle = this.onChecked.bind(this, k);
                return (
                  <li key={k}
                      className={k===this.state.index?"option checked":"option"}
                      data-radio-name="area" onClick={handle}>
                    <span>{v.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  },

  onChecked(k, e) {
    e.preventDefault();
    this.setState({index:k})
  },

  componentDidMount() {
    // 获取区域
    NetApi.get('/api/hotelDistrict/all', (err,j)=>{
      if (!err) {
        if(j.success) {
          j.data.push({id:-1,name:'未确定'});
          this.setState({index:j.data.length-1, data:j.data})
        }
      }
    })
  },

  getValue() {
    let id = this.state.data[this.state.index].id;
    if (id == -1) {
      return {
        place:'',
      }
    } else {
      return {
        place:''+id,
      }
    }
  },
})

const TableNumInfo = React.createClass({
  getInitialState() {
    return {
      index:5,
      data:[
        {name:'10桌以下'},
        {name:'10至20桌'},
        {name:'20至30桌'},
        {name:'30至40桌'},
        {name:'40桌以上'},
        {name:'未确定'}
      ]
    };
  },

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">请选择你的桌数</label>
        </div>
        <div className="data-box">
          <ul className="option-group">
            {
              _.map(this.state.data, (v,k)=>{
                let handle = this.onChecked.bind(this, k);
                return (
                  <li key={k} className={k===this.state.index?"option checked":"option"} data-radio-name="table" onClick={handle}>
                    <span>{v.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  },

  onChecked(k, e) {
    e.preventDefault();
    this.setState({index:k})
  },

  getValue() {
    return {
      tableNum:this.state.data[this.state.index].name,
    }
  },
})

const RemarkInfo = React.createClass({
  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">您还有别的需求请填写在这里:</label>
        </div>
        <div className="data-box">
          <textarea placeholder="备注" ref={(ref)=>this.remark=ref} ></textarea>
        </div>
      </li>
    )
  },

  getValue() {
    return {
      remark:this.remark.value||'',
    }
  },
})

const HotelRequire = React.createClass({
  getInitialState() {
    return {
      commitFlg:true,
      sucessHint:'金色百年感谢您的信任与支持，现在可以提交了。',
    };
  },

  render () {
    return (
      <div style={{width:'100%',marginTop:'0px',marginBottom:'0px',marginLeft:'auto',marginRight:'auto' ,position:'relative',overflow:'hidden'}} onClick={this.click}>
        <div style={{width:'1920px',position:'relative',left:'50%',marginLeft:'-960px'}} >
          <img src="http://img2.jsbn.com/static/tjbg_01.jpg@95q" style={{display:'block'}}/>
          <img src="http://img2.jsbn.com/static/tjbg_02.jpg@95q" style={{display:'block'}}/>
          <img src="http://img2.jsbn.com/static/tjbg_03.jpg@95q" style={{display:'block'}}/>
          <div style={{width:'1920px',marginTop:'0px',marginBottom:'0px',marginLeft:'auto',marginRight:'auto', position:'absolute',top:'0px'}}>
            <div style={{width:'580px',position:'absolute',top:'60px',left:'920px',marginLeft:'30px',marginTop:'50px'}}>
              <div  className="tjxq-form">
                <div className="header-box" >
                  <h2 className="title">金色百年婚宴预定需求提交</h2>
                  <span className="desc-text">
                    在金色百年婚宴预订服务平台，已接入包括重庆第一婚宴品牌芭菲嘉宴等上百家婚宴酒店，
                    我们的婚礼顾问对这些酒店的了解程度、对婚宴本身的专业知识和丰富的婚宴预定经验，
                    能帮你轻松预定到如你所愿的酒店。简单填写以下表格，剩下的交给统筹师搞定，服务免费，
                    还有万元优质大礼包可以拿哟，赶快行动吧！
                  </span>
                </div>
                <ul className="data-item-list">
                  <UserInfo ref={(ref)=>this.userInfo=ref} />
                  <ContactInfo ref={(ref)=>this.contactInfo=ref} />
                  <BookingTimeInfo ref={(ref)=>this.bookingTimeInfo=ref} optCalendar={this.optCalendar} />
                  <PlaceInfo ref={(ref)=>this.placeInfo=ref} />
                  <TableNumInfo ref={(ref)=>this.tableNumInfo=ref} />
                  <RemarkInfo ref={(ref)=>this.remarkInfo=ref} />
                </ul>
                <div className="footer-box">
                  <div><p>{this.state.sucessHint}</p></div>
                  {
                    this.state.commitFlg
                      ? <input type="submit" className="btn-submit" onClick={this.commit} value="提交"></input>
                      : <input type="submit" className="btn-submit" value="提交中..."></input>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Calendar onDateChange={this.onDateChange} ref={(ref)=>this.myCalendar=ref} />
      </div>
    )
  },
  optCalendar(showFlg, top, left, external) {
    this.myCalendar.setChange(showFlg, top-140, left, 2, external);
  },

  onDateChange(dateStr, external) {
    // 隐藏日历
    this.myCalendar.setChange(false, null, null, 2, external);
    this.bookingTimeInfo.setValue({bookingTime:dateStr})
  },

  click(e) {
    // 不要去阻止事件
    this.myCalendar.setChange(false, null, null, 2, external);
  },

  commit(e) {
    e.preventDefault();
    // 电话号码
    let phoneValue = this.contactInfo.getValue().contact;
    // 短信验证码
    let smsValue = this.contactInfo.getValue().code;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneValue))) {
      this.contactInfo.setErr('请输入正确的手机号码');
    } else if (!(/\d{6}$/.test(smsValue))) {
      this.contactInfo.setErr('请输入正确的验证码');
    } else {
      let body={
        code:smsValue,
        contact:phoneValue,
        remark:this.remarkInfo.getValue().remark,
        contactName:this.userInfo.getValue().contactName,
        gender:this.userInfo.getValue().gender,
        bookingTime:this.bookingTimeInfo.getValue().bookingTime,
        place:this.placeInfo.getValue().place,
        tableNum:this.tableNumInfo.getValue().tableNum,
        hotelName:'',
      }
      this.contactInfo.setErr('');
      // 设置在请求回来之前不能提交
      this.setState({
        commitFlg:false,
      })
      NetApi.post('/bus/hotelSurvey', body, (err, j)=>{
        if (err) {
          this.setState({
            commitFlg:true,
            sucessHint:err
          })
        } else {
          if (!j.success) {
            this.setState({
              commitFlg:true,
              sucessHint:j.message
            })
          } else {
            this.setState({
              commitFlg:true,
              sucessHint:'提交成功，金色百年感谢您的信任与支持，稍后我们的工作人员会与您联系!'
            })
          }
        }
      })
    }
  }
})

export { HotelRequire }
