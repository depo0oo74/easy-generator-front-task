
const URL = `${import.meta.env.VITE_API_URL}`
import AxiosApis from './axios/index'

const AuthApis = {
  async login(data: object) {
    const response: object | undefined = await AxiosApis.post(`${URL}/login`, data)

    return response
  },
  async signup(data: object) {
    const response: object | undefined = await AxiosApis.post(`${URL}/signup`, data)

    return response
  },
}

export default AuthApis
