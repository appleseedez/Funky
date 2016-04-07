/**
 * Created by chenjianjun on 16/3/16.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const ActiveConfig = {
  // 关于我们
  'aboutUs': {
    kClass:'layout-center-box',
    pic:[
      {
        'url':'//img2.jsbn.com/static/about_us/01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/05.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/07.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/08.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/09.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/10.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/about_us/11.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  },
  'libao':{
    kClass:'topic',
    pic:[
      {
        'url':'//img2.jsbn.com/static/libao/libao_01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_05.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/libao/libao_07.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  },
  'tyzx':{
    kClass:'topic',
    pic:[
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx05.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx07.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx08.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx09.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx10.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx11.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx12.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx13.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx14.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx15.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx16.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx17.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx18.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx19.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx20.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx21.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx22.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx23.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx24.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx25.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx26.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx27.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx28.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx29.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx30.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx31.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx32.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx33.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx34.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/tyzx/tyzx35.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  },
  'zuhe':{
    kClass:'topic',
    pic:[
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_05.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_07.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_08.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_09.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_10.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_11.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_12.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/youhui/youhui_13.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  },
  'syp':{
    kClass:'topic',
    pic:[
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_05.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_07.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_08.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_09.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'http://img2.jsbn.com/static/syp/syptip_10.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  },
  '4ybf':{
    kClass:'topic',
    pic:[
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/01.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/02.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/03.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/04.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/05.jpg',
        'href':true,
        'hrefUrl':'//chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=533854&configID=75804&jid=6937519900&skillId=4927'
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/06.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/07.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/08.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/09.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/10.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/11.jpg',
        'href':true,
        'hrefUrl':'//chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=533854&configID=75804&jid=6937519900&skillId=4927'
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/12.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/13.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/14.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/15.jpg',
        'href':true,
        'hrefUrl':'//chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=533854&configID=75804&jid=6937519900&skillId=4927'
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/16.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/17.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/18.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/19.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/20.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/21.jpg',
        'href':false,
        'hrefUrl':''
      },
      {
        'url':'//img2.jsbn.com/static/activities/4ybf/22.jpg',
        'href':false,
        'hrefUrl':''
      }
    ]
  }
}

export { ActiveConfig }
