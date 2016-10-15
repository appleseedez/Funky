/**
 * Created by chenjianjun on 16/3/9.
 */
import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'
import { PringlesDetailsConfig } from './config/pringles-details-config'
/**
 组件结构
 <PringlesDetails> <= styles,scenes,list
 </PringlesDetails>
 **/
const PringlesDetails = React.createClass({

  render() {
    return (
      <div className="kpxs-detail-view">
        <div className="kp-detail-box">
          <div className="kpxs-title-box">
            <span className="title">{this.state.name}</span>
          </div>
          <div className="img-list">
            <div className="box-img">
              {
                _.map(this.state.details, (v, k) => {
                  return (
                    <MediaItem key={k} mediaUrl={v} width={900} aspectRatio={'1:-1'} />
                  );
                })
              }
            </div>
          </div>
          <div className="float-nav">
            <div className="title">最新客片</div>
            <ul className="list">
              {
                _.map(this.state.beasts, (v,k)=>{
                  return (
                    <li key={k}>
                      <a href={'/pringles/'+v.id} target='_blank'>
                        <span className="name">{v.name}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  },



  getInitialState: function() {
    return {
      name:"",
      details:[],
      beasts:[]
    };
  },

  // pcDetailImages  pringles/detail/828
  componentDidMount() {
    {
      let cfg = PringlesDetailsConfig['PringlesDetails']
      let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
      if(fetchUrl){
        fetch(fetchUrl)
          .then(res => {return res.json()})
          .then(j=>{
            if(j.success && j.data.length > 0) {
              // 因为后天返回的pcDetailImages是一个字符串,所以要转换成json
              this.setState({details:JSON.parse(j.data[0].pcDetailImages), name:j.data[0].name});
            }
          })
      }
    }

    // 最佳客片
    {
      let cfg = PringlesDetailsConfig['ShotListItem']
      let fetchUrl = cfg['buildUrl']({},cfg['dataUrl'])
      if(fetchUrl){
        fetch(fetchUrl)
          .then(res => {return res.json()})
          .then(j=>{
            if(j.success && j.data.length > 0) {
              // 因为后天返回的pcDetailImages是一个字符串,所以要转换成json
              this.setState({beasts:j.data});
            }
          })
      }
    }
  }
});

export { PringlesDetails }
