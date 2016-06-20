import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Banner } from './common/banner.jsx'
import { MediaItem } from './common/media-item.jsx'
import { DressDetailsConfig } from './config/dress-details-config.js'

const DressDetails = React.createClass({
  render() {
    return (
      <div className="hslf-xq-view">
        <div className="layout-center-box">
          <Banner {...DressDetailsConfig['Banner'][0]} />
          {
            //<div className="title-hslf-xq">
            //  <h1>{this.state.title}</h1>
            //</div>
          }
          <ul className="list-recommend">
            {
              _.map(this.state.dressItems, (v,k) => {
                return (
                  <li key={k} className="item-box">
                    <a className="img-box" data-uk-lightbox="{'group':'dress-img'}" data-lightbox-type='image'  title={v.number}
                       href={v.imageUrl+'@90Q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'} >
                      <div className="layer-box"></div>
                      <MediaItem aspectRatio='2:3' height={550} mediaUrl={v.imageUrl} water={false} />
                    </a>
                    <div className="title-box">
                      <span>{v.number}</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
          {
            this.state.showMoreFlg
              ? <div className="more-btn" onClick={this.handleMore}><span>点击查看更多</span></div>
              : null
          }
        </div>
      </div>
    );
  },

  propTypes: {
    dressItems: PropTypes.array,
    title: PropTypes.string,
  },

  getInitialState: function() {
    return {
      dressItems:[],
      title:"",
      showMoreFlg:true,
      params: {
        pageSize:9,
        pageIndex:1,
      }
    };
  },

  handleMore(e) {
    e.preventDefault();

    let p = {};
    p = _.merge(p, this.state.params)
    p.pageIndex += 1;
    this.queryData(p, true);
  },

  // 数据请求/dress/dress_list?brandld=5品牌ID&typeId=礼服类型ID
  componentDidMount() {
    let request = this.props.dataParams;
    if(request['brandId'] && request['typeId']) {
      let p = {}
      p.pageSize = this.state.params.pageSize;
      p.pageIndex = 1;
      _.merge(p, {brandId:request['brandId'], typeId:request['typeId']})
      this.queryData(p, false);
    }
  },

  queryData(params, isChunk=false) {
    let fetchUrl = DressDetailsConfig['APIConfig'].buildQueryUrl(params, 'dress/dress_list');
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j=>{
        if(j.success && j.data.length > 0) {
          let t;
          // 如果是加载更多
          if (isChunk) {
            t = this.state.dressItems;
            t = t.concat(j.data);
          } else {
            t = j.data;
          }

          // 判断服务器数据是否加载完毕
          let m = (j.count > t.length) ? true : false;
          this.setState({params:params, dressItems:t, showMoreFlg:m})
        }
      })
  }

});

export { DressDetails };
