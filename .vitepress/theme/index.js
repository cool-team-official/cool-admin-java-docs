import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';

export default {
    ...DefaultTheme,
    
    setup() {
        const route = useRoute();
        const initZoom = () => {
          new mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
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