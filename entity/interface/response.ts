import { responseStatus } from "../../utils/enum"

export interface Response<T> {
	errCode: responseStatus,
	data: T
}
