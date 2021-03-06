import React, { PropTypes } from 'react'
import ShortId from 'shortid'
import { BaseConfig } from '../config/base'
import _ from 'lodash'

/**
 !! 给嫌字太多不想看的观众。= 。=
 配置方法如下：
 1. 淘宝视频 : <MediaItem aspectRatio='38:27' height={270} mediaUrl={封面url} videoUrl={淘宝视频Url}/>
 {{
 Q:如果伦家要自动播放的淘宝视频呢?
 A:需求没有，不支持！！！虽然淘宝视频在url参数里有autoplay，蛋素~ 自动播放的视频全部都用的是MediaElement.js 特点就是不带播放条
 }}
 2. 图片: <MediaItem aspectRatio='38:27' height={270} mediaUrl={图片url} />
 3. 自动播放视频（隐藏播放条）:
 <MediaItem aspectRatio='38:27' height={270} mediaUrl={封面url} videoUrl={视频Url} autoplay={true}/>

 MediaItem 需要承担的功能:
 作为图片容器。 根据不同的环境进行水印，尺寸的配置
 作为视频容器。
 使用taobao的嵌入视频（flash）
 使用MediaElement.js (主要是对于需要隐藏播放调的场景以及小尺寸视频场景)
 和其他库结合使用（light-box）

 TODO 同一页面内的多个播放控件 同一时间只播放一个
 基本结构
 如果是 普通图片
 <div class='J_MediaWrapper' data-width='width' data-height='height'>
 <img src='mediaUrl' />
 </div>

 如果是视频
 对于使用taobao视频 只支持flash格式， 并且视频播放控件无法隐藏。无法循环播放
 对于使用支持html5的播放器：mediaelement.js 则支持循环播放，隐藏控件等高级配置
 基本参数：
 autoplay 是否自动播放 default false 只有视频是有效的。
 width  容器宽度
 height 容器高度
 aspectRatio w:h的比例 默认值是2:3
 * 正常情况下 请提供width或者height的其中一个 加上aspectRatio 这样可以达到适应响应式的目的 *
 * 如果同时提供了width和height则aspectRatio被忽略 *
 videoUrl 视频资源
 mediaUrl 封面资源/图片资源
 **/
const RegForDimension = /_(\d{1,4})x(\d{1,4})\.\w+g$/i
/**
 从querystring里面提取参数转换为json
 **/
const qTJSON = (vid,width,height,querystring)=>{
  let pairs = querystring.split('&');
  let result = {}
  _.each(pairs,(value,key)=>{
    let pair = value.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  })
  result['div'] = vid
  result['width'] = width || '100%'
  result['height'] = height || '100%'

  return _.pick(result,['vid','uid','tid','div','height','width'])
}

const VideoItem = React.createClass({
  render () {
    if (-1 !== this.props.videoUrl.indexOf('taobao.com')) {
      return (
        <div id={this.state.genID} style={{'width':this.props.width+'px','height':this.props.height+'px'}}>
          <h1>Loading TaobaoVideoJS...</h1>
        </div>
      )
    } else {
      return (
        <div id={this.state.genID} style={ {width: this.props.width, height: this.props.height} } />
      )
    }
  },

  getInitialState() {
    return {
      genID: ShortId.generate() // 用来生成每个组件唯一的id便于视频初始化
    }
  },

  loadTaobaoVideo(vid,videoUrl,width,height,posterUrl){
    return () => {
      tb_player_object.embedPlayer(
        qTJSON(vid,width,height,videoUrl),
        { autoplay:"false",poster:posterUrl },
        { wmode:"transparent",allowScriptAccess:"always",allowFullScreen:"true" });
    }
  },

  componentDidMount() {
    if (-1 !== this.props.videoUrl.indexOf('taobao.com')) {
        // taobao视频
        (2 === this.props.videoUrl.split('?').length) && setTimeout(this.loadTaobaoVideo(
          this.state.genID,
          this.props.videoUrl.split('?')[1],
          this.props.width,
          this.props.height,
          this.props.mediaUrl
        ),0)
    } else if (-1 !== this.props.videoUrl.indexOf('.mp4')) {
      // 不自动播放的MediaElement视频
      setTimeout(this.loadVideo(this.state.genID, this.props), 0)
    } else {
      console.log('视频地址格式错误')
    }
  },

  loadVideo(videoId, props) {
    let { mediaUrl, videoUrl, aspectRatio, autoPlay, width, height } = props

    let flashVars = {}
    // 参考http://www.ckplayer.com/tool/help/29.htm
    // 视频播放地址
    flashVars.f = videoUrl
    // 封面地址
    flashVars.i = `${mediaUrl}@${width}w_${height}h_90q`
    // 播放结束的动作 调用js函数(function playerstop(){})并且退出全屏
    flashVars.e = 6
    // 是否支持拖动 视频是否支持播放未下载的内容 1:按关键帧进行拖动
    flashVars.h = 1
    // 视频宽高比例
    if (aspectRatio) {
      flashVars.wh = aspectRatio
    }
    // 是否自动播放
    if (autoPlay) {
      flashVars.p = 1
    }
    // 视频调用配置方式 0:调用ckplayer.js
    flashVars.c = 0

    let params = { bgcolor:'#FFF', allowFullScreen:true, allowScriptAccess:'always', wmode:'transparent' }
    let h5Video = [`${videoUrl}->video/mp4`]

    CKobject.embed('/script/ckplayer/ckplayer.swf', videoId, videoId, '100%', '100%', true, flashVars, h5Video, params);
  }

})

const EmImgProcessType = {
  emGD_NONE:0,
  emGD_H_W:1,
  emGD_W_H:2,
  emGD_HW_L:3,
  emGD_HW_S:4,
  emGD_L_S:5,
  emGD_S_S:6
}

const ImageItem = React.createClass({
  render () {
    /**
     如果mediaUrl是有带widthXheight的。
     就应该把这个实际的图片尺寸提取出来。
     如果没有，则按照传入的参数进行设置
     **/
    let width = this.props.width
    let height = this.props.height
    let found = null;

    let fileExtend=''
    if (this.props.mediaUrl) {
      found = this.props.mediaUrl.match(RegForDimension)
      fileExtend = this.props.mediaUrl.substring(this.props.mediaUrl.lastIndexOf('.')).toLowerCase();
    }

    // 图片质量
    let quality = this.props.quality || '95'

    let imageOption='';
    if (fileExtend == '.jpg' || fileExtend == '.jpeg') {
      switch (this.props.processType) {
        case EmImgProcessType.emGD_NONE:
        {
          /**
           水印: 如果配置了要显示水印才显示。
           如果是100%这样的,就不带
           **/
          if (this.props.width !== '100%') {
            imageOption = imageOption + this.props.width+'w_';
          }
          if (this.props.height !== '100%') {
            imageOption = imageOption + this.props.height+'h_';
          }
          imageOption = '@' + imageOption + quality + 'q';

          break;
        }
        case EmImgProcessType.emGD_H_W:
        {
          // 固定高度，宽度自适应
          if (height !== '100%') {
            imageOption += '@0o_0l_' + height + 'h_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        case EmImgProcessType.emGD_W_H:
        {
          // 固定宽度，高度自适应
          if (width !== '100%') {
            imageOption += '@0o_0l_' + width + 'w_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        case EmImgProcessType.emGD_HW_L:
        {
          // 限定宽高，按长边缩放 0e_0o_0l_200h_200w_90q.src
          if (height !== '100%' && width !== '100%') {
            imageOption += '@0e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        case EmImgProcessType.emGD_HW_S:
        {
          // 限定宽高，按短边缩放 1e_0o_0l_200h_200w_90q.src
          if (height !== '100%' && width !== '100%') {
            imageOption += '@1e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        case EmImgProcessType.emGD_L_S:
        {
          // 按长边缩放，缩略填充 4e_0o_0l_200h_200w_90q.src
          if (height !== '100%' && width !== '100%') {
            imageOption += '@4e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        case EmImgProcessType.emGD_S_S:
        {
          // 按短边缩放，居中裁剪 1e_1c_0o_0l_200h_200w_90q.src
          if (height !== '100%' && width !== '100%') {
            imageOption += '@1e_1c_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
          } else {
            imageOption += '@' + quality + 'q.src'
          }
          break;
        }
        default:
        {
          imageOption += '@' + quality + 'q.src'
          break;
        }
      }

      if (this.props.water) {
        imageOption += '|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
      }
    }

    let mediaUrl = ''
    if (this.props.mediaUrl && this.props.mediaUrl !== '') {
      mediaUrl = this.props.mediaUrl + imageOption;
    }

    if (found && 3 === found.length) {
      width = parseInt(found[1])
      height = parseInt(found[2])
    }

    // 在高版本的IE下面,如果img有onError的话会卡死,所以去掉 <img src={mediaUrl} onError={this.imageNotLoaded} />
    if (this.props.outerLink) {
      return (
        <a href={this.props.outerLink} className='img-box'>
          <div className='J_MediaWrapper' style={{'height':'100%'}} data-width={width} data-height={height}>
            <img src={mediaUrl}  />
          </div>
        </a>
      )
    } else {
      return (
        <div className='J_MediaWrapper' style={{'height':'100%'}} data-width={width} data-height={height}>
          <img src={mediaUrl} />
        </div>
      )
    }
  },
  getDefaultProps(){
    return {
      water:true
    }
  }
})


const MediaItem = React.createClass({
  render () {
    /**
     width 和 height 任意传入一个。
     **/
    let factors = this.props.aspectRatio.split(':')
    let width = 1
    let height = 1
    if (this.props.width) {
      if (factors[1] === '-1') {
        height = '100%'
      }else {
        height = parseInt(this.props.width*parseFloat(factors[1])/parseFloat(factors[0]))
      }
      width = this.props.width
    }else if(this.props.height) {
      if (factors[0] === '-1') {
        width='100%'
      }else {
        width = parseInt(this.props.height*parseFloat(factors[0])/parseFloat(factors[1]))
      }
      height = this.props.height
    }else {
      console.log('高度或者宽度必须指定一个啊.');
    }

    if (this.props.videoUrl) {
      return <VideoItem {...this.props} height={height} width={width} />
    }else {
      return (
        <ImageItem  {...this.props} height={height} width={width} />
      )
    }
  },
  propTypes: {
    autoplay: React.PropTypes.bool,
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    aspectRatio:React.PropTypes.string,
    coverUrl:React.PropTypes.string,
    videoUrl:React.PropTypes.string,
    mediaUrl:React.PropTypes.string,
    water:React.PropTypes.bool,
    processType:React.PropTypes.number
  },
  getDefaultProps(){
    return {
      mediaUrl:'',
      aspectRatio:'2:3',
      processType:EmImgProcessType.emGD_NONE
    }
  }
})

export { MediaItem, EmImgProcessType }
