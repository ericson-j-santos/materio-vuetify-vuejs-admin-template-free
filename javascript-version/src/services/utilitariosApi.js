// src/services/utilitariosApi.js
import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'
import { usuarioStore } from "@/store/Usuario/usuarioStore";
import router from '../router/index'

export function adicionarInterceptorAutenticacao(instanciaApi) {
    instanciaApi.interceptors.request.use(
        config => {
            // const store = usuarioStore()
            const token = usuarioStore().accessToken
            console.log('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            // else {
            //     delete config.headers.Authorization
            // }
            return config
        },
        error => Promise.reject(new Error(error))
    )
    instanciaApi.interceptors.response.use(response => {
        console.log(response)
        if (response.status != 200) {
            console.log(response.status, response.config.url)
        }
        if (response.status == 401) {
            usuarioStore().accessToken = ''
            router.push('/login')
        } else if (response.status == 504) {
            router.go()
        }
        return response;
    }, error => Promise.reject(error)
    )
}

export function criarInstanciaApi(baseURL, recurso = '') {
    const instance = axios.create({
        baseURL: `${baseURL}${recurso}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const api = setupCache(instance);

    adicionarInterceptorAutenticacao(api)
    return api
}
