import React, { PropTypes } from 'react'

import { MediaSlider } from './common/media-slider.jsx'
import { Banner } from './common/banner.jsx'
import { FollowVideoConfig} from './config/follow-video-config'
import { VideoListItem } from './common/video-list-item.jsx'

const FollowVideo = React.createClass({
  render () {
    return (
      <div className="hlsp-view">
        <div className="bannar-all-box">
          <div id="slider_top" className="slider-box bannar mgb30" style={{height:FollowVideoConfig['MediaSlider']['height']}}>
            <MediaSlider {...FollowVideoConfig['MediaSlider']}/>
          </div>
        </div>
        <div className="layout-center-box">
          <Banner {...FollowVideoConfig['Banner'][0]} />
          <VideoListItem {...FollowVideoConfig['VideoListItem']} />
          <div id="J_MoreButton">
              <div className="more-btn"><span>点击查看更多</span></div>
          </div>
        </div>
      </div>
    )
  }
})

export { FollowVideo }
