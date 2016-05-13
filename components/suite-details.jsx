import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'
import { SuiteDetailsConfig} from './config/suite-details-config'

const SuiteDetails = React.createClass({
  render () {
    return (
      <div className='layout-center-box margin-top-box'>
        <div className='container wedding-detail clearfix'>
          <div className='detail-box container mgt30 clearfix'>
            <div className='photo-box mgb30 clearfix'>
              {
                _.map(this.state.details,(v,k)=>{
                  return (
                    <div key={k} className='bottom' style={{height:'auto'}}>
                      <div className='img-box'>
                        <MediaItem width={1200} aspectRadio={'1:-1'} mediaUrl={v} water={false} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='content mgb30 clearfix'></div>
          </div>
        </div>
      </div>
    )
  },
  propTypes: {
    dataParams: React.PropTypes.object
  },
  getDefaultProps(){
    return {}
  },
  getInitialState() {
    return {
      details:[]
    }
  },
  componentDidMount() {
    let cfg = SuiteDetailsConfig['SuiteDetails']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    if(fetchUrl){
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j=>{
          let images = []
          if(j.success && j.data.length > 0) {

            let origin = JSON.parse(j.data[0]['pcDetailImages'])
            let keys = [
              'pc_detailImages',
              'pc_serviceImages',
              'pc_cosmeticImages',
              'pc_clothShootImages',
              'pc_baseSampleImages',
              'pc_processImages'
            ]

            _.each(keys, function(v) {
              _.each(origin[v] || [], function(v1) {
                images.push(v1)
              })
            })

            this.setState({details:images});
          }
        })
    }
  }
})

export { SuiteDetails }
