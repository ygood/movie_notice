// 設置、获取用戶信息
export const setAccountInfo = (account: any) => { uni.setStorageSync("account", account) }
export const getAccountInfo = () => { uni.getStorageSync("account") }

