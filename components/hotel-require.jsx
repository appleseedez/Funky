import React, { PropTypes } from 'react'

const HotelRequire = React.createClass({
  render () {
    return (
      <div style={{width:'100%',marginTop:'0px',marginBottom:'0px',marginLeft:'auto',marginRight:'auto' ,position:'relative',overflow:'hidden'}}>
        <div style={{width:'1920px',position:'relative',left:'50%',marginLeft:'-960px'}} >
            <img src="http://image.jsbn.com/static/tjbg_01.jpg" style={{display:'block'}}/>
            <img src="http://image.jsbn.com/static/tjbg_02.jpg" style={{display:'block'}}/>
            <img src="http://image.jsbn.com/static/tjbg_03.jpg" style={{display:'block'}}/>

              <div style={{width:'1920px',marginTop:'0px',marginBottom:'0px',marginLeft:'auto',marginRight:'auto', position:'absolute',top:'0px'}}>
              <div style={{width:'580px',position:'absolute',top:'90px',left:'920px',marginLeft:'30px',marginTop:'50px'}}>
                <iframe height="900" allowTransparency="true" frameBorder="0" scrolling="no"style={{border:'none',width:'100%'}} src="http://jsform.com/web/formembed/5630399a0cf25bb366c5ae91"></iframe>
              </div>
              </div>
            </div>
        </div>
    )
  }
})

export { HotelRequire }
