//
//kClass:'item secondary index-1',
//remark:' >'
const MenuConfig = {
  '/':[
    {
      cn:'婚庆定制',
      en:'WEDDING',
      menu:'/scheme',
      link:'/scheme',
      target:false,
      kClass:'item primary'
    },
    {
      cn:'婚纱摄影',
      en:'PHOTO',
      menu:'/shot',
      link:'/shot',
      target:false,
      kClass:'item primary',
      remark:''
    },
    {
      cn:'金色旅拍',
      en:'TRIP',
      menu:'',
      link:'http://trip.jsbn.com',
      target:true,
      kClass:'item primary',
      remark:''
    },
    {
      cn:'婚宴预订',
      en:'BANQUET',
      menu:'/hotel',
      link:'/hotel',
      target:false,
      kClass:'item primary',
      isCheckBafei:true,
      remark:''
    }
  ],
  '/home':[
    {
      cn:'婚庆定制',
      en:'WEDDING',
      menu:'/scheme',
      link:'/scheme',
      target:false,
      kClass:'item primary'
    },
    {
      cn:'婚纱摄影',
      en:'PHOTO',
      menu:'/shot',
      link:'/shot',
      target:false,
      kClass:'item primary',
      remark:''
    },
    {
      cn:'金色旅拍',
      en:'TRIP',
      menu:'',
      link:'http://trip.jsbn.com',
      target:true,
      kClass:'item primary',
      remark:''
    },
    {
      cn:'婚宴预订',
      en:'BANQUET',
      menu:'/hotel',
      link:'/hotel',
      target:false,
      kClass:'item primary',
      isCheckBafei:true,
      remark:''
    }
  ],

  '/shot':[
    {
      cn:'全站首页',
      en:'HOME',
      menu:'/',
      link:'/',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'摄影首页',
      en:'PHOTO',
      menu:'/shot',
      link:'/shot',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'作品欣赏',
      en:'WORKS',
      menu:'/sample',
      link:'/sample',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'客片欣赏',
      en:'PRINGLES',
      menu:'/pringles',
      link:'/pringles',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'套系报价',
      en:'SUITE',
      menu:'/suite',
      link:'/suite',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'微电影',
      en:'MOVIE',
      menu:'/movie',
      link:'/movie',
      target:false,
      kClass:'item second-menu',
      remark:''
    }
  ],
  '/hotel':[
    {
      cn:'全站首页',
      en:'HOME',
      menu:'/',
      link:'/',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚宴酒店',
      en:'BANQUET',
      menu:'/hotel',
      link:'/hotel',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'提交需求',
      en:'REQUIRE',
      menu:'/hotel-require',
      link:'/hotel-require',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'大礼包',
      en:'GIFT',
      menu:'/libao',
      link:'/activity/detail/libao?parentKey=hotel&menuKey=libao',
      target:false,
      kClass:'item second-menu',
      remark:''
    }
  ],
  '/scheme':[
    {
      cn:'全站首页',
      en:'HOME',
      menu:'/',
      link:'/',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚庆首页',
      en:'WEDDING',
      menu:'/scheme',
      link:'/scheme',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'实景案例',
      en:'CASES',
      menu:'/cases',
      link:'/cases',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼跟拍',
      en:'FOLLOW',
      menu:'/followPhoto',
      link:'/followPhoto',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼视频',
      en:'VIDEO',
      menu:'/followVideo',
      link:'/followVideo',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'选婚礼人',
      en:'F4',
      menu:'/f4',
      link:'/f4',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚纱礼服',
      en:'DRESS',
      menu:'/dress',
      link:'/dress',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚礼用品',
      en:'SUPPLIES',
      menu:'/supply',
      link:'/supply',
      target:false,
      kClass:'item second-menu',
      remark:''
    },
    {
      cn:'婚车租赁',
      en:'CAR',
      menu:'/car',
      link:'/car',
      target:false,
      kClass:'item second-menu',
      remark:''
    }
  ]
}

export { MenuConfig }
