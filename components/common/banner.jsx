import React, { PropTypes } from 'react'
/*横幅广告 只支持单张静态图片*/
const Banner = React.createClass({
  render () {
    return (
      <div className='bannar-box'>
        <img src={this.props.imageUrl+'@90q'} />
      </div>
    )
  },
  propTypes: {
    imageUrl: React.PropTypes.string
  },
  getDefaultProps(){
    return {
      imageUrl:''
    }
  }
})


export { Banner }
