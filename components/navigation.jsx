import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MenuConfig } from './config/menu-config.js'

const Navigation = React.createClass({
  render () {
    let currentKey = this.props.currentKey
    let menuKey = this.props.menuKey;
    return (
      <div>
        {
          _.map(MenuConfig[menuKey],(v,k)=>{
            let menuClass = v.kClass
            if (v.link === currentKey) {
              menuClass += 'item-current'
            }
            if (v.target) {
              return (
                <a key={k} href={v.link} target="_blank">
                  <div className={menuClass}>
                    <div className="ch">
                      <span>{v.cn}</span>
                      <div className="en">{v.en}</div>
                      <div className="arrow-5-js triangle"></div>
                    </div>
                  </div>
                </a>
              )
            } else {
              return (
                <a key={k} href={v.link}>
                  <div className={menuClass}>
                    <div className="ch">
                      <span>{v.cn}</span>
                      <div className="en">{v.en}</div>
                      <div className="arrow-5-js triangle"></div>
                    </div>
                  </div>
                </a>
              )
            }
          })
        }
      </div>
    )
  },

  propTypes: {
    menuKey: React.PropTypes.string,
    currentKey:React.PropTypes.string
  },

  getDefaultProps(){
    return {
      menuKey:'/',
      currentKey:'/'
    }
  }

})

export { Navigation }
