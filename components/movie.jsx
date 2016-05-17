import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem } from './common/media-item.jsx'
import { Banner } from './common/banner.jsx'
import { MovieConfig } from './config/movie-config'

const ItemType = React.createClass({
  render () {
    let listType = this.props.listType;
    return (
      <div className='layout-center-box'>
        <div className="nav-box">
          <ul className="hover-box">
            {
              _.map(this.props.type, (v,k) => {
                var boundClick = this.handleClick.bind(this, k, v);
                if (k == 0) {
                  // 最新微电影
                  return (
                    <li key={k} onClick={boundClick} className={(k === this.state.index)? 'hover-item sel':'hover-item'}>
                      <div className="english-title">
                        <span className="primary-title">MICRO</span>
                        <span className="secondary-title">MOVIE</span>
                      </div>
                      <div className="chinese-title">
                        <span className="title">最新微电影</span>
                      </div>
                      <div className="tab-black"></div>
                    </li>
                  );
                } else if (k == 1) {
                  // 纪实MV
                  return (
                    <li key={k} onClick={boundClick} className={(k === this.state.index)? 'hover-item sel':'hover-item'}>
                      <div className="english-title">
                        <span className="primary-title">DOCUMENTARY</span>
                        <span className="secondary-title">MV</span>
                      </div>
                      <div className="chinese-title">
                        <span className="title">纪实MV</span>
                      </div>
                      <div className="tab-black"></div>
                    </li>
                  );
                } else if (k == 2) {
                  // 爱情MV
                  return (
                    <li key={k} onClick={boundClick} className={(k === this.state.index)? 'hover-item sel':'hover-item'}>
                      <div className="english-title">
                        <span className="primary-title">LOVE</span>
                        <span className="secondary-title">MV</span>
                      </div>
                      <div className="chinese-title">
                        <span className="title">爱情MV</span>
                      </div>
                      <div className="tab-black"></div>
                    </li>
                  );
                } else if (k == 3) {
                  // 爱情微电影
                  return (
                    <li key={k} onClick={boundClick} className={(k === this.state.index)? 'hover-item sel':'hover-item'}>
                      <div className="english-title">
                        <span className="primary-title">LOVE</span>
                        <span className="secondary-title">MOVIE</span>
                      </div>
                      <div className="chinese-title">
                        <span className="title">爱情微电影</span>
                      </div>
                      <div className="tab-black"></div>
                    </li>
                  );
                }
              })
            }
          </ul>
        </div>
        <ul className="list-recommend">
          {
            _.map(this.state.data[this.state.index], (v,k) => {
              let key = ''+this.state.index+k;
              let hf = '/movie-details?id='+v.id;
              let description = v.description || ''
              return (
                <li key={key} className="item-box">
                  <div className="animat-1-hive" />
                  <a href={hf} target="_blank">
                    <div className="img-box">
                      <MediaItem aspectRatio='38:25' height={250} mediaUrl={v.coverUrlWeb} water={false} />
                      <i></i>
                    </div>
                    <div className="item-info">
                      <h2>{v.name}</h2>
                      <p>{description.length>41?v.description.slice(0,40)+'......':v.description}</p>
                      <span className="more"> >>更多详情</span>
                    </div>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },

  propTypes: {
    data: PropTypes.array,
    index: PropTypes.number
  },

  getInitialState: function() {
    return {
      data:[],
      index:0
    };
  },

  componentDidMount(){
    // 默认是显示第一个,加载最新微电影
    fetch(this.props.type[0])
      .then(res => {return res.json()})
      .then(j => {
        if(j.success) {
          // 针对每个数据,只取 id, type, coverUrlWeb, description, videoUrl, videoId, hitNum
          let temp = this.state.data;
          let count = j.count;// 数据的实际条数,如果实际条数小于预期拉取的条数,说明数据已经取完了
          temp[0] = _.map(j.data || [], (v,k)=>{
            return _.pick(v,['name','videoId', 'type', 'coverUrlWeb', 'description', 'videoUrl', 'id'])
          });
          this.setState({data:temp, index:0});
        }
      });
  },

  handleClick(i, url) {
    let temp = this.state.data;
    if(temp[i] === undefined) {
      fetch(url)
        .then(res => {return res.json()})
        .then(j => {
          if(j.success) {
            // 针对每个数据,只取 id, type, coverUrlWeb, description, videoUrl, videoId, hitNum
            temp[i] = _.map(j.data || [], (v,k)=>{
              return _.pick(v,['name','videoId', 'type', 'coverUrlWeb', 'description', 'videoUrl', 'id'])
            });
            this.setState({data:temp, index:i});
          }
        });
    } else {
      this.setState({index: i});
    }
  }
});

const Movie = React.createClass({
  render () {
    var self = this;
    return (
      <div className="wdy-view">
        <div className="bannar-all-box">
          <div id="slider_top" className="slider-box bannar" style={{height:MovieConfig['MediaSlider']['height']}}>
            <MediaSlider {...MovieConfig['MediaSlider']}/>
          </div>
        </div>
        <div className='layout-center-box'>
          <Banner {...MovieConfig['Banner'][0]} />
        </div>
        <ItemType type={this.state.types} />
      </div>
    )
  },
  getInitialState: function() {
    return {
      types: [MovieConfig['NewMovie'].baseUrl+MovieConfig['NewMovie'].dataUrl,
        MovieConfig['MVMovie'].baseUrl+MovieConfig['MVMovie'].dataUrl,
        MovieConfig['LoveMovie'].baseUrl+MovieConfig['LoveMovie'].dataUrl,
        MovieConfig['LoveMovieMV'].baseUrl+MovieConfig['LoveMovieMV'].dataUrl]
    };
  }
})

export  { Movie }
