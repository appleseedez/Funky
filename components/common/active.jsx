import React, { PropTypes } from 'react'
import { ActiveConfig } from '../config/active-config.js'
import _ from 'lodash'

const Active = React.createClass({
  render() {
    return(
      <div className={this.state.kClass}>
        {
          _.map(this.state.picUrls, (v,k) => {

            let content = null;
            let url = v.url + '@95q';
            if(v.href) {
              content = (
                <a href={v.hrefUrl} target="_blank"> <img src={url} /></a>
              )
            } else {
              content = (<img src={url} />)
            }

            return(
              <div key={k} className="box-img">
                {
                  content
                }
              </div>
            );
          })
        }
      </div>
    )
  },

  getInitialState() {
    return {
      picUrls:[],
      kClass:'topic'
    };
  },

  componentDidMount() {
    let template = this.props.dataParams;
    if(ActiveConfig[template.name]) {
      this.setState({picUrls:ActiveConfig[template.name].pic, kClass:ActiveConfig[template.name].kClass});
    }
  }
})

export { Active }
