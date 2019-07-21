import { getCarData } from '@/services/car';
// 原始数据
const state = {
  car: {
    list: [
      {
        car_id: '132275',
        car_name: '40 TFSI 进取版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=132275&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '21.08-30.7万',
          dealer_price_max: '30.7万',
          dealer_price_min: '21.08万',
          official_refer_price: '30.70万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=132275&cl=0'
        }
      },
      {
        car_id: '132276',
        car_name: '40 TFSI 时尚版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=132276&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '24.58-34.29万',
          dealer_price_max: '34.29万',
          dealer_price_min: '24.58万',
          official_refer_price: '34.29万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=132276&cl=0'
        }
      },
      {
        car_id: '132277',
        car_name: '40 TFSI 运动版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=132277&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '26.85-37.1万',
          dealer_price_max: '37.1万',
          dealer_price_min: '26.85万',
          official_refer_price: '36.28万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=132277&cl=0'
        }
      },
      {
        car_id: '132278',
        car_name: '45 TFSI quattro个性运动版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '252',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '185',
        max_power_str: '185kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=132278&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '26.85-37.1万',
          dealer_price_max: '37.1万',
          dealer_price_min: '26.85万',
          official_refer_price: '36.28万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=132278&cl=0'
        }
      },
      {
        car_id: '132279',
        car_name: '45 TFSI quattro运动版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '252',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '185',
        max_power_str: '185kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=132279&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '29.73-41.1万',
          dealer_price_max: '41.1万',
          dealer_price_min: '29.73万',
          official_refer_price: '40.18万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=132279&cl=0'
        }
      },
      {
        car_id: '131315',
        car_name: '35 TFSI 进取版 国V',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '1.4',
        exhaust_str: '1.4L',
        horse_power: '150',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '110',
        max_power_str: '110kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131315&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '20.63-29.3万',
          dealer_price_max: '29.3万',
          dealer_price_min: '20.63万',
          official_refer_price: '29.30万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131315&cl=0'
        }
      },
      {
        car_id: '131316',
        car_name: '35 TFSI 进取版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '150',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '110',
        max_power_str: '110kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131316&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '20.63-29.3万',
          dealer_price_max: '29.3万',
          dealer_price_min: '20.63万',
          official_refer_price: '29.30万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131316&cl=0'
        }
      },
      {
        car_id: '131317',
        car_name: '40 TFSI 进取版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131317&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '21.08-30.7万',
          dealer_price_max: '30.7万',
          dealer_price_min: '21.08万',
          official_refer_price: '30.70万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131317&cl=0'
        }
      },
      {
        car_id: '131318',
        car_name: '40 TFSI 时尚版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131318&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '24.58-34.29万',
          dealer_price_max: '34.29万',
          dealer_price_min: '24.58万',
          official_refer_price: '34.29万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131318&cl=0'
        }
      },
      {
        car_id: '131319',
        car_name: '40 TFSI 运动版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '190',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '140',
        max_power_str: '140kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131319&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '26.85-37.1万',
          dealer_price_max: '37.1万',
          dealer_price_min: '26.85万',
          official_refer_price: '36.28万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131319&cl=0'
        }
      },
      {
        car_id: '131320',
        car_name: '45 TFSI quattro个性运动版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '252',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '185',
        max_power_str: '185kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131320&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '26.85-37.1万',
          dealer_price_max: '37.1万',
          dealer_price_min: '26.85万',
          official_refer_price: '36.28万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131320&cl=0'
        }
      },
      {
        car_id: '131321',
        car_name: '45 TFSI quattro运动版 国VI',
        trans_type: '双离合',
        gear_num: '7',
        exhaust: '2.0',
        exhaust_str: '2.0L',
        horse_power: '252',
        add_press_type: '',
        inhale_type: '涡轮增压',
        max_power: '185',
        max_power_str: '185kW',
        peak_power: '',
        peak_power_str: '',
        link:
          'http://baojia.chelun.com/yiche-redirectYicheWeb.html?ycre_serialid=2593&ycre_carid=131321&ycre_cityid=0&ycre_flag=1',
        jtexts: '',
        link_from: '',
        market_attribute: {
          year: '2019',
          dealer_price: '29.73-41.1万',
          dealer_price_max: '41.1万',
          dealer_price_min: '29.73万',
          official_refer_price: '40.18万',
          sale_status: '在销',
          buy_car_detail_url:
            'https://bu.chelun.com/xunjia-new/?SerialID=2593&city_id=&car_id=131321&cl=0'
        }
      }
    ],
    pic_group_count: '0',
    market_attribute: {
      dealer_price: '■■■■■■',
      official_refer_price: '■■■■■'
    }
  },
  yearTypeIndex: -1,
  SerialID: '2616'
};

//派生数据
const getters = {
  yearType(state: any): string[] {
    let arr = Array.from(
      new Set(state.car.list.map((val: any) => val.market_attribute.year))
    );
    let sortArr = arr.sort((x: any, y: any): any => y - x) as string[];
    return sortArr;
  },
  curYearType(state: any, getters: any): number {
    return getters.yearType[state.yearTypeIndex];
  },
  yearList(state: any, getters: any): any[] {
    if (state.yearTypeIndex === -1) {
      return state.car.list;
    }
    return state.car.list.filter(
      (val: any) => val.market_attribute.year === getters.curYearType
    );
  },
  sortArr(state: any, getters: any): any {
    var obj = getters.yearList.reduce((prev: any, cur: any) => {
      const type = `${cur.exhaust_str}/${cur.max_power_str} ${cur.inhale_type}`;
      if (!prev[type]) {
        prev[type] = {
          exhaust: +cur.exhaust_str.slice(0, -1),
          maxPower: +cur.max_power_str.slice(0, -2),
          inhaleType: cur.inhale_type,
          title: type,
          year: cur.market_attribute.year,
          list: []
        };
      }
      prev[type].list.push(cur);
      return prev;
    }, {});
    /**
     * 排序
     * 排序规则：
     * 1.排量升序
     * 2.发动机功率升序
     * 3.吸气方式（涡轮增压>自然吸气）
     * 4.年份降序
     */
    var sort=[
      (x,y)=> x.exhaust - y.exhaust,
      (x,y)=> x.maxPower - y.maxPower,
      (x,y)=> x.inhaleType === '涡轮增压' && y.inhaleType === '自然吸气'?1:0,
      (x,y)=> y.year - x.year,
    ]
    return Object.values(obj).sort((x,y)=>sort.reduce((prev,cur)=>prev||cur(x,y),0))
    // var arr = Object.values(obj).sort(
    //   (x: any, y: any): number => {
    //     return sort.reduce((prev,cur)=>prev||cur(x,y),0)
        // var flag=0;
        // sort.forEach(item=>{
        //   if(flag===0){
        //     flag=item(x,y)
        //   }
        // })
        //  flag = x.exhaust - y.exhaust;
        // if (flag === 0) {
        //   flag = x.maxPower - y.maxPower;
        // }
        // if (flag === 0) {
        //   if (x.inhaleType === '涡轮增压' && y.inhaleType === '自然吸气') {
        //     flag = 1;
        //   }
        // }
        // if (flag === 0) {
        //   flag = y.year - x.year;
        // }
        // return flag;
    //   }
    // );

    // return arr;
  }
};
//异步改变
const actions = {
  async getCarData(
    { commit }: { commit: any },
    payload: string
  ): Promise<Object> {
    console.log('getCarData.payload',payload);
    
    const res = await getCarData(payload);
    console.log('getCarData.res',res);
    if (res.code === 1) {
      commit('updateSerialID', payload);
      commit('updateCar', res.data);
    }
    return res;
  }
};
//同步改变
const mutations = {
  updateCar(state: { car: any }, payload: any) {
    state.car = payload;
  },
  updateState(state: any, { key, value }: { key: string; value: any }): void {
    state[key] = value;
  },
  updateSerialID(state: any, payload: string) {
    state.SerialID = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
