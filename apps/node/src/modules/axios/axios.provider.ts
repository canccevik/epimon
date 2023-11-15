import { Provider } from '@nestjs/common'
import axios from 'axios'

export const AXIOS_INSTANCE = 'AxiosInstance'

const axiosInstance = axios.create({
  validateStatus: (status): boolean => status < 500
})

export const AxiosProvider: Provider = {
  provide: AXIOS_INSTANCE,
  useValue: axiosInstance
}
