import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { Banner } from './common/banner.jsx'
import { FollowPhotoConfig } from './config/follow-photo-config'
import { SchemeListItem } from './common/scheme-list-item.jsx'

const FollowPhoto = React.createClass({
  render () {
    return (
      <div className="hlgp-view">
        <div className="bannar-all-box">
          <div id="slider_top" className="slider-box bannar" style={{height:FollowPhotoConfig['MediaSlider']['height']}}>
            <MediaSlider {...FollowPhotoConfig['MediaSlider']} />
          </div>
        </div>
        <div className="layout-center-box">
          <Banner {...FollowPhotoConfig['Banner'][0]} />
          <SchemeListItem {...FollowPhotoConfig['SchemeListItem']} params={_.merge(this.state.params,FollowPhotoConfig['SchemeListItem'].params)}/>
          <div onClick={this.loadMore} id="J_MoreButton">
              <div className="more-btn"><span>点击查看更多</span></div>
          </div>
        </div>
      </div>
    )
  },
  getInitialState() {
    return {
      params:{}
    }
  }
})

export { FollowPhoto }
