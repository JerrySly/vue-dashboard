import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);
app.directive('click-outside', {
    mounted(el,binding){
        el.addEventListener('click', (event:MouseEvent) => {
            event.stopPropagation();
        })
        document.addEventListener('click', () => {
            binding.value();
        });
    },
    unmounted(el,binding){
        el.removeEventListener('click',(event:MouseEvent) => {
            event.stopPropagation();
        })
        document.removeEventListener('click',() => {
            binding.value();
        })
    }
})
app.use(router).mount('#app')
