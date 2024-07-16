<template>
  <Layout>
    <template #sidebar-nav-before>
      <div class="ad">
        <img
          v-for="item in ad.list"
          :key="item"
          :src="item.pic"
          @click="ad.toLink(item)"
        />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted, reactive } from "vue";

const { Layout } = DefaultTheme;

const ad = reactive({
  list: [],

  toLink(item) {
    if (item.link) {
      window.open(item.link);
    } else {
      window.open(`https://cool-js.com/ad/${item.id}`);
    }
  },

  get() {
    fetch("https://service.cool-js.com/api/app/info/ad/list", {
      method: "POST",
      body: {
        channel: 1,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.list = res.data;
      });
  },
});

onMounted(() => {
  ad.get();
});
</script>

<style scoped>
.ad img {
  display: block;
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.ad img:hover {
  opacity: 0.9;
}
</style>
