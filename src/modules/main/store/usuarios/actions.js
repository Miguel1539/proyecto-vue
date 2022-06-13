import store from "@/store"
import authApi from '@/apis/authApi'

// export const myAction = async({ commit }) =>{}
export const getListUsers = async({ commit },stringToSearch) =>{
    try{
        const response = await authApi.get('/users',{
            params: {
                token: store.getters['authModule/getToken'],
                user: store.getters['authModule/getUserName'],
                all: true,
                stringToSearch
            }
        })
        // console.log(response.data.result.lista)
        commit('setListUsers',response.data.result.lista)
        return response.data.result.lista
    }catch (error) {
        console.log(error)
    }
}