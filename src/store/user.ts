import { defineStore } from 'pinia'

interface UserState {
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    }	
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [{
      key: 'xiaoluxian_user',
      storage: localStorage,
      //paths: ['token']
    }]
  }
})
