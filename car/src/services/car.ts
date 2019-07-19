import axios from '@/utils/request';

interface Response{
  data: any;
  code: number;
  msg: string;
}
export function getCarData(SerialID: any) : Promise<Response> {
  return axios.get(`/v2-car-getInfoAndListById.html?SerialID=${SerialID}&${+new Date()}`);
}
