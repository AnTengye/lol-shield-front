<template>
    <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="list">
        <template #loadMore>
            <div v-if="!initLoading && !loading"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore">loading more</a-button>
            </div>
        </template>
        <template #renderItem="{ item }">
            <a-list-item :class="backgroundColor(item.win)">
                <template #actions>
                    <a key="list-loadmore-edit">查看详情{{ item.gameId }}</a>
                </template>
                <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                    <a-list-item-meta :description="item.desc" style="align-items: center;">
                        <template #title>
                            {{ item.queue }}
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.championIcon" />
                        </template>
                    </a-list-item-meta>
                    <div><icon-font v-if="item.win" :style="{ fontSize: '40px' }" type="icon-shengli1" />
                        <icon-font v-else :style="{ fontSize: '40px' }" type="icon-shibai_--copy" />
                    </div>
                </a-skeleton>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { onMounted, ref, nextTick, computed, watch } from 'vue';
import { getGameList } from '@/api/bog'
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
const data = ref([]);
const list = ref([]);
const queueMap = dicts.getDict('queue');
let { getters } = useStore()
onMounted(() => {
    const selfuuid = computed(() => getters['ws/getUuid'])
    getGameList(selfuuid.value).then(res => {
        console.log(res)
        const temp = []
        res.data.forEach(element => {
            initLoading.value = false;
            const championIcon = import.meta.env.VITE_BACK_URL + '/riot/v1/champion-icons/' + element.championId + '.png'
            const desc = moment(element.createTime).format('MM-DD HH:mm') + '  KDA:' + element.kills + '-' + element.deaths + '-' + element.assists
            temp.push({
                desc: desc,
                gameId: element.gameId,
                queue: queueMap[element.queueId],
                championIcon: championIcon,
                win: element.win,
                assists: element.assists,
                kills: element.kills,
                deaths: element.deaths,
            })
        });
        data.value = temp
        list.value = temp
    }).finally(() => {
        initLoading.value = false
    })
});
const route = useRoute()

watch(() => route.params.id, (newId, oldId) => {
    console.log('123', newId, oldId)
})
const backgroundColor = (win) => {
    return win ? 'gradient-background-win' : 'gradient-background-lose';
}
const onLoadMore = () => {
    loading.value = true;
    list.value = data.value.concat(
        [...new Array(count)].map(() => ({
            loading: true,
            name: {},
            picture: {},
        })),
    );
    fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
            const newData = data.value.concat(res.results);
            loading.value = false;
            data.value = newData;
            list.value = newData;
            nextTick(() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
};
</script>
<style scoped></style>
<style type="text/css">
.icon {
    font-size: 24px;
    /* Adjust the size as needed */
}

.gradient-background-win {
    background: linear-gradient(to right, #e0f7e9 30%, #ffffff 70%);
    /* 调整颜色停靠点 */
}

.gradient-background-lose {
    background: linear-gradient(to right, #f7e0e0 30%, #ffffff 70%);
    /* 调整颜色停靠点 */
}
</style>