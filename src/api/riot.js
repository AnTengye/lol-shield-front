import { riotapi } from '@/utils/request'


export function getChampion() {
    return riotapi.get('/champion.json', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}