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
            if (v.menu === currentKey) {
              menuClass += ' item-current'
            }
            if (v.target) {
              return (
                <div key={k} className={menuClass}>
                  <a href={v.link} target="_blank">
                    <div className="shade-box">
                      <div className="left-border"></div>
                      <div className="right-border"></div>
                    </div>
                    <div className="ch gold">
                      <span>{v.cn}</span>
                      <div className="en gold">{v.en}</div>
                      <div className="arrow-5-js">{v.remark}</div>
                    </div>
                  </a>
                </div>
              )
            } else {
              return (
                <div key={k} className={menuClass}>
                  <a href={v.link}>
                    <div className="shade-box">
                      <div className="left-border"></div>
                      <div className="right-border"></div>
                    </div>
                    <div className="ch gold">
                      <span>{v.cn}</span>
                      <div className="en gold">{v.en}</div>
                      <div className="arrow-5-js">{v.remark}</div>
                    </div>
                  </a>
                </div>
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
