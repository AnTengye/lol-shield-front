import { request } from '@/utils/request'


export function getConfig() {
    return request.get('/config', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function getVersion() {
    return request.get('/version', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function getOnline() {
    return request.get('/lcu', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function updateConfig(auto_confirm, auto_pick, auto_ban) {
    return request({
        url: '/config',
        method: 'post',
        data: { auto_confirm, auto_pick, auto_ban }
    })
}

export function getUser() {
    return request.get('/user', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}