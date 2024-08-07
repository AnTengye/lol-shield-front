<template>
    <a-row>
        <a-col style="background-color: bisque;" :span="6">col-12</a-col>
        <a-col :span="18">
            <a-row class="fade-total-background" style="height: 32px;" justify="space-around">
                <a-col class="justift-center-container" :span="2">
                    <div>开始时间：{{ baseGameData.createTime }}</div>
                </a-col>
                <a-col class="justift-center-container" :span="2">
                    <div>游戏模式：{{ baseGameData.queueId }}</div>
                </a-col>
                <a-col class="justift-center-container" :span="2">
                    <div>游戏时长：{{ baseGameData.gameDuration }}min</div>
                </a-col>
            </a-row>
            <a-row v-for="team in teamInfo">
                <a-col :class="backgroundColor(team.teamId, baseGameData.winTeamId)" :span="12">
                    <a-row style="height: 32px;" justify="space-around">
                        <a-col class="justift-center-container" :span="8">
                            <div class="defeat" v-if="baseGameData.winTeamId !== team.teamId">失败</div>
                            <div class="victory" v-else>胜利</div>
                        </a-col>
                        <a-col class="justift-center-container" :span="8">
                            <div style="font-size: 18px;"><icon-font :style="{ fontSize: '24px' }"
                                    type="icon-caidanlan-xiaoshou-jingzhengduishou" />{{ team.kills }}
                            </div>
                        </a-col>
                        <a-col class="justift-center-container" :span="8">
                            <div style="font-size: 18px;"><icon-font :style="{ fontSize: '20px' }"
                                    type="icon-jinbi" />{{ (team.goldEarned / 1000).toFixed(1) }}
                            </div>
                        </a-col>
                    </a-row>
                    <a-row v-for="item in team.data" :key="item.puuid">
                        <a-col :span="3" class="justift-center-container">
                            <a-badge class="badge-level" :count="item.champLevel" :offset="[-8, 35]" color="orange">
                                <a-avatar shape="square" :src="item.championIcon" size="large" alt="空"></a-avatar>
                            </a-badge>
                            <p style="margin: 32px 0 0 0;font-size: 16px;">{{ item.kills }}-{{ item.deaths }}-{{
                                item.assists }}</p>
                        </a-col>
                        <a-col :span="4" class="justift-center-container">
                            <a-tooltip>
                                <template #title>{{ item.gameName }}#{{ item.tagLine }}</template>
                                <div class="text-overflow-container" style="font-size: 16px;">{{ item.gameName }}#{{
                                    item.tagLine }}</div>
                            </a-tooltip>
                            <!-- <p><icon-font :style="{ fontSize: '16px' }" type="icon-jinbi" />19.6k</p> -->
                            <!-- <p><icon-font :style="{ fontSize: '16px' }" type="icon-jinbi" />19.6k</p> -->
                        </a-col>
                        <a-col :span="2" class="justift-center-container">
                            <a-avatar size="large" shape="square" :src="getAssetsFile('rank/gold.png')"
                                alt="空"></a-avatar>
                        </a-col>
                        <a-col :span="15" class="justift-center-container">
                            <a-row class="justift-left-element">
                                <a-col style="text-align: right;" :span="3">
                                    <a-avatar class="small-items-container" :src="item.spell1Icon" alt="空"></a-avatar>
                                    <a-avatar class="small-items-container" :src="item.spell2Icon" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item0" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item1" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item2" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item3" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item4" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item5" alt="空"></a-avatar>
                                </a-col>
                                <a-col :span="3">
                                    <a-avatar class="square" shape="square" :src="item.item6" alt="空"></a-avatar>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-col>
                <!-- <a-col :span="2"></a-col> -->
                <!-- <a-col class="fade-green-background" :span="12">
                </a-col> -->
            </a-row>
        </a-col>
    </a-row>
</template>
<script setup>
const testUrl = import.meta.env.VITE_BACK_URL + '/riot/ASSETS/items/icons2d/6672_marksman_t4_behemothslayer.png'
import { getAssetsFile } from '@/utils/getAssetsUrl.js'
import { onMounted, ref, nextTick, computed, watch } from 'vue';
import { getGameDetail } from '@/api/bog'
import dicts from '@/model/dicts/index'
import moment from 'moment';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_ICON_URL,
});
const count = 3;
const initLoading = ref(true);
const loading = ref(false);
const queueMap = dicts.getDict('queue');
const spellMap = dicts.getFeDict('spell');
const itemIconMap = dicts.getFeDict('gameItem');
let { getters } = useStore()

// 定义基础数据
const baseGameData = ref({
    gameId: 0,
    queueId: '自选匹配',
    createTime: '01-01 00:00',
    gameDuration: 60,
    winTeamId: 100,
})
const teamInfo = ref([])
const partMap = ref([])
const gameDetailTeam1 = ref([])
const gameDetailTeam2 = ref([])
onMounted(() => {
    getGameDetail(9248758356).then(res => {
        let baseData = {}
        baseData.gameId = res.data.gameId
        baseData.queueId = queueMap[res.data.queueId]
        baseData.createTime = moment(res.data.gameCreation).format('MM-DD HH:mm')
        baseData.gameDuration = (res.data.gameDuration / 60).toFixed(1)
        res.data.teams.forEach(element => {
            if (element.win !== 'Fail') {
                baseData.winTeamId = element.teamId
            }
        });
        baseGameData.value = baseData
        res.data.participantIdentities.forEach(element => {
            partMap[element.participantId] = {
                puuid: element.player.puuid,
                gameName: element.player.gameName,
                tagLine: element.player.tagLine,
            }
        })
        let totalPart = []
        let tempPart1 = []
        let tempPart2 = []
        let teamTotal1 = { teamId: 100, data: [], kills: 0, deaths: 0, assists: 0, goldEarned: 0 }
        let teamTotal2 = { teamId: 200, data: [], kills: 0, deaths: 0, assists: 0, goldEarned: 0 }
        res.data.participants.forEach(element => {
            let tempData = {
                uuid: partMap[element.participantId].puuid,
                championId: element.championId,
                championIcon: import.meta.env.VITE_BACK_URL + `/riot/v1/champion-icons/${element.championId}.png`,
                spell1Icon: import.meta.env.VITE_BACK_URL + `/riot/DATA/Spells/Icons2D/${spellMap[element.spell1Id]}`,
                spell2Icon: import.meta.env.VITE_BACK_URL + `/riot/DATA/Spells/Icons2D/${spellMap[element.spell2Id]}`,
                kills: element.stats.kills,
                deaths: element.stats.deaths,
                assists: element.stats.assists,
                champLevel: element.stats.champLevel,
                gameName: partMap[element.participantId].gameName,
                tagLine: partMap[element.participantId].tagLine,
                item0: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item0]}`,
                item1: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item1]}`,
                item2: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item2]}`,
                item3: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item3]}`,
                item4: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item4]}`,
                item5: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item5]}`,
                item6: import.meta.env.VITE_BACK_URL + `/riot/ASSETS/items/icons2d/${itemIconMap[element.stats.item6]}`,
                goldEarned: element.stats.goldEarned,
                totalDamageDealtToChampions: element.stats.totalDamageDealtToChampions,
            }
            console.log('tempData', tempData)
            if (element.teamId === 100) {
                tempPart1.push(tempData)
            } else {
                tempPart2.push(tempData)
            }
        })
        tempPart1.forEach(element => {
            teamTotal1.kills += element.kills
            teamTotal1.deaths += element.deaths
            teamTotal1.assists += element.assists
            teamTotal1.goldEarned += element.goldEarned
        })
        teamTotal1.data = tempPart1
        totalPart.push(teamTotal1)
        if (tempPart2.length > 0) {
            tempPart2.forEach(element => {
                teamTotal2.kills += element.kills
                teamTotal2.deaths += element.deaths
                teamTotal2.assists += element.assists
                teamTotal2.goldEarned += element.goldEarned
            })
            teamTotal2.data = tempPart2
            totalPart.push(teamTotal2)
        }
        // gameDetailTeam1.value = tempPart1
        // gameDetailTeam2.value = tempPart2
        teamInfo.value = totalPart
    }).finally(() => {
        initLoading.value = false
    })
});
const backgroundColor = (cur, target) => {
    return cur === target ? 'fade-green-background' : 'fade-red-background';
}
</script>
<style scoped>
.justift-center-container {
    display: grid;
    place-items: center;
}

.justift-left-element {
    justify-self: start;
}

.badge-level {
    font-size: 12px;
    height: 14px;
    line-height: 14px;
}

.fade-red-background {
    background: linear-gradient(to bottom, rgba(255, 71, 71, 0.2), rgba(236, 179, 179, 0));
}

.fade-green-background {
    background: linear-gradient(to bottom, rgba(69, 255, 100, 0.2), rgba(160, 255, 173, 0));
}

.fade-total-background {
    background-color: rgba(139, 186, 247, 0.2);
}

.text-overflow-container {
    width: 100%;
    /* 设置宽度 */
    white-space: nowrap;
    /* 禁止文本换行 */
    overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
    /* 使用省略号表示溢出内容 */
}

.container {
    display: flex;
    justify-content: center;
    gap: 1px;
    margin: 0 auto;
    width: fit-content;
}

.square {
    width: 36px;
    height: 36px;
}

.small-items-container {
    width: 20px;
    height: 20px;
}

.victory {
    font-weight: bold;
    color: rgb(70, 182, 47);
    font-size: 16px;
}

.defeat {
    font-weight: bold;
    color: rgb(199, 33, 33);
    font-size: 16px;
}
</style>