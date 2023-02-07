import methodType from "./custom_type"
import { Response } from "../entity/interface/response"

// const api_prefix = "http://172.18.217.144:3001/api/"

const api_prefix = "http://192.168.58.1:3004/api/"

const request = <T>(url: string, data?: any, method?: methodType, header?: any) => {
	return new Promise<Response<T>>((resolve, reject) => {
		uni.request({
			url: `${api_prefix}${url}`,
			data: data || {},
			method: method || "GET",
			header: header || {},
			success: (res) => {
				resolve(res.data as Response<T>)
			},
			fail: (error) => {
				reject(error.errMsg)
			}
		})
	})
}

export default request
