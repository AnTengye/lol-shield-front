import { localriotapi } from '@/utils/request'

export function getProfileIcon(param) {
    const url = `/profile-icons/6666.jpg`;
    return localriotapi.get(url, {
        headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
        }
    })
}