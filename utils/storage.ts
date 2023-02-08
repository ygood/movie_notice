// 設置、获取、删除用戶信息
export const setAccountInfo = (account: any) => { uni.setStorageSync("account", account) }
export const getAccountInfo = () => { return uni.getStorageSync("account") }
export const removeAccountInfo = () => {
	try {
		uni.removeStorageSync("account")
	} catch (e) {
		return false
	}
	return true
}

