import axios, { AxiosHeaders } from "axios"
import handlingErrors from "../../utils/handlingErrors";

const TOKEN: string | null = window.localStorage.getItem("accessToken") ?? null
const headers: AxiosHeaders = new AxiosHeaders();

headers.set('Authorization', `Bearer ${TOKEN}`);
headers.set('Access-Control-Allow-Origin', '*');
headers.set('Content-Type', 'application/json');

interface ErrorResponse {
    response?: {
      data?: {
          message?: string;
      };
    }
}

const ApiService = { 
	async get(URL: string) {
        try {
            const response: object = await axios.get(URL, { headers })
            return response
        } catch (err) {
            handlingErrors(err as ErrorResponse)
        }
	},
	async post(URL: string, data: object) {
        try {
            const response: object = await axios.post(URL, data, { headers })
            return response
        } catch (err) {
            handlingErrors(err as ErrorResponse)
        }
	},
	async update(URL: string, data: object) {
        try {
            const response: object = await axios.patch(URL, data, { headers })
            return response
        } catch (err) {
            handlingErrors(err as ErrorResponse)
        }
	},
	async delete(URL: string) {
        try {
            const response: object = await axios.delete(URL, { headers })
            return response
        } catch (err) {
            handlingErrors(err as ErrorResponse)
        }
	},
}

export default ApiService