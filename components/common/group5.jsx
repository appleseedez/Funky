import React, { PropTypes } from 'react'
import { MediaItem } from './media-item.jsx'
import _ from 'lodash'
const Group5 = React.createClass({
  render () {
    let dimension = this.props.dimension
    return (
      <div className="nav-box">
        {  // 因为是一组资源 一共5个 如果超出5个忽略 目前必须要求达到5个
          _.map(this.state.data.slice(0,5),(v,k)=>{
            if (k===0) {
              return (
                <li key={k} className='big-box'>
                  <div className='l-item img-box' >
                    <MediaItem {...dimension[0]} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} outerLink={v.linkUrl} water={false} />
                  </div>
                </li>
              )
            }else {
              return (
                <li key={k} className='small-box'>
                  <div className='img-box'>
                    <MediaItem {...dimension[1]} mediaUrl={v.coverUrlWeb} videoUrl={v.videoUrl} outerLink={v.linkUrl} />
                  </div>
                </li>
              )
            }
          })
        }
        {/*列表为空，默认输出*/}
        {(this.state.data.length === 0 )&& <h1>加载中...</h1>}
      </div>
    )
  },
  propTypes: {
    dataUrl: React.PropTypes.string
  },
  getDefaultProps(){
    return {
      dataUrl:undefined
    }
  },
  getInitialState() {
    return {
      data:[]
    };
  },

  componentDidMount() {
    /** 数据请求 **/
    if (this.props.dataUrl !== undefined) {
      fetch(this.props.baseUrl + this.props.dataUrl)
      .then(res => {return res.json()})
      .then(j =>{
        let five = j.data
        let size = _.size(five)
        _.times(5-size,()=>{
          five.push({})
        })
        this.setState({ data:j.data })
      })
    }
  }
})

export { Group5 }
