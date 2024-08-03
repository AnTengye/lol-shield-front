<template>
  <a-row justify="space-around" :gutter="16">
    <a-col :span="8" class="icon-col" @click="handleClick('icon1')">
      <a-icon type="smile" class="large-icon" />
    </a-col>
    <a-col :span="8" class="icon-col" @click="handleClick('icon2')">
      <a-icon type="heart" class="large-icon" />
    </a-col>
    <a-col :span="8" class="icon-col" @click="handleClick('icon3')">
      <a-icon type="star" class="large-icon" />
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent } from 'vue';
import { SmileOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'IconRow',
  components: {
    'a-icon': {
      SmileOutlined,
      HeartOutlined,
      StarOutlined
    }
  },
  setup() {
    const handleClick = (icon) => {
      console.log(`${icon} clicked`);
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.large-icon {
  font-size: 48px; /* Adjust the size as needed */
  cursor: pointer;
}
</style>