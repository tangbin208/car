import { getCityId, getDealerList, getProvinceList, getCityList, submitLowPrice } from "@/services";
// 原始数据
const state = {
    cityID: '201',
    cityName: '北京',
    provinceID: '2',
    provinceName: '北京',
    provinceList: [],
    cityList: [],
    dealerList: [{
        isChecked:  false,
        dealerShortName: '■■■■',
        vendorPrice: '■■■■',
        address: '■■■■',
        saleRange: '■■■■',
        dealerId:1,
    },{
        isChecked:  false,
        dealerShortName: '■■■■',
        vendorPrice: '■■■■',
        address: '■■■■',
        saleRange: '■■■■',
        dealerId:2,
    },{
        isChecked:  false,
        dealerShortName: '■■■■',
        vendorPrice: '■■■■',
        address: '■■■■',
        saleRange: '■■■■',
        dealerId:3,
    },],
    carDetail: {
        AliasName: '■■■■■■■■',
        title: '■■■■■■■■■■■■■■■',
        Picture: '',
    },
    carId: 0,
}

//派生数据
const getters = {
    dealerids(state: any) {
        // console.log(state.dealerList);
        // console.log(state.dealerList.length);
        
        let temp = state.dealerList.filter((val: any) => val.isChecked);
        if (temp.length === 0) { return ''; }
        // console.log(temp);
        temp = temp.map((val: any) => val.dealerId).join();
        // console.log('temp', temp);

        return temp;
    },
}
//异步改变
const actions = {
    /**获取当前车辆详情、报价经销商详情、城市详情
     * 
     * @param payload 车辆id
     */
    async getDetail({ commit, state, dispatch }: { commit: any, state: any, dispatch: any }, payload: any) {
        await dispatch('getCityId')
        await dispatch('getDealerList', payload)
    },
    /**获取当前车辆详情\报价经销商详情
     * 
     * @param payload 车辆id
     */
    async getDealerList({ commit, state }: { commit: any, state: any, }, payload: any) {
        // carId,cityID
        let { data: dealerData, code: Dcode } = await getDealerList(payload || state.carId, state.cityID
        )
        if (Dcode !== 1) { return; }
        commit('updateCarId', dealerData.details.car_id)
        commit('updateDearleData', dealerData)
    },
    /**获取当前城市信息
     * 
     * @param payload 
     */
    async getCityId({ commit, state, dispatch }: { commit: any, state: any, dispatch: any }, payload: any) {
        let { data: cityData, code: Ccode } = await getCityId()
        if (Ccode !== 1) { return; }
        await commit('updateState', {
            key: 'cityID', value: cityData.CityID
        })
        await commit('update', ['cityName', cityData.CityName])
    },
    /**获取省份数据
     * 
     * @param payload 
     */
    async getProvinceList({ commit, state, rootState }: { commit: any, state: any, rootState: any }, payload: any) {
        let res = await getProvinceList()
        if (res.code === 1) {
            commit('update', ['provinceList', res.data])
        }
    },
    /**获取市级数据
     * 
     * @param payload 省份id
     */
    async getCityList({ commit, state, rootState }: { commit: any, state: any, rootState: any }, payload: string) {
        let res = await getCityList(payload)
        if (res.code === 1) {
            commit('update', ['cityList', res.data])
        }
    },
    /**提交询问最低价表单
     * 
     * @param payload 
     */
    async submitLowPrice({ commit, state, getters }: { commit: any, state: any, getters: any }, payload: any) {
        let res = await submitLowPrice({
            name: payload.name,
            mobile: payload.mobile,
            carid: state.carId,
            carname: state.title,
            dealerids: getters.dealerids,
            location: state.cityName,
            locationid: state.cityID,
        })
        return res;
    }

}
//同步改变
const mutations = {
    update(state: any, [key, value]: [string, any]) {
        state[key] = value;
    },
    updateState(state: any, { key, value }: { key: string, value: any }): void {
        state[key] = value;
    },
    updateDearleData(state: any, payload: any): void {
        // console.log(payload.list);
        state.dealerList = payload.list ? payload.list.map((val: any, index: number) => ({
            isChecked: index < 3 ? true : false,
            dealerShortName: val.dealerShortName,
            vendorPrice: parseInt(val.vendorPrice),
            address: val.address,
            saleRange: val.saleRange,
            dealerId: val.dealerId,
        })) : [];
        // console.log(state.dealerList);
        state.carDetail = {
            AliasName: payload.details.serial.AliasName,
            Picture: payload.details.serial.Picture,
            title: `${payload.details.market_attribute.year}款 ${payload.details.car_name}`
        }
    },
    checkDearle(state: any, payload: number): void {
        let target = state.dealerList[payload];
        target.isChecked = !target.isChecked;
        // console.log(target,payload);
    },
    updateCarId(state: any, payload: number): void {
        state.carId = payload;
    },
    updateCityInfo(state: any, payload: number): void {
        const city = state.cityList[payload];
        state.cityName = city.CityName;
        state.cityID = city.CityID;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}