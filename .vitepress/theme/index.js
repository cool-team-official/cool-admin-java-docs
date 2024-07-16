import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { nextTick, onMounted, watch } from "vue";
import "./custom.css";
import Layout from "./layout.vue";

export default {
  Layout,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      new mediumZoom("[data-zoomable]", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
