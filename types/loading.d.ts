
import { showLoading, hideLoading } from '../utils/common'

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		showLoading: typeof showLoading
		hideLoading: typeof hideLoading
	}
}