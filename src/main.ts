import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);
app.directive('v-click-outside', {
    mounted(el,binding){
        el.addEventListener('onclick', (event:MouseEvent) => {
            event.stopPropagation();
        })
        document.addEventListener('onclick', () => {
            binding.value();
        });
    },
    unmounted(el,binding){
        el.removeEventListener('onclick',(event:MouseEvent) => {
            event.stopPropagation();
        })
        document.removeEventListener('onclick',() => {
            binding.value();
        })
    }
})
app.use(router).mount('#app')
