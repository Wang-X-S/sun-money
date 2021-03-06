import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from "@/views/Money.vue";
import Labels from '@/views/Labels.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'
import Statistics from '@/views/Statistics.vue'
import EditTags from '@/views/EditTags.vue';
import EchartsPage from '@/views/EchartsPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path:'/labels',
    component:Labels
  },

  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'/record/edit/:id',
    component:EditLabel
  },
  {
    path:'/editTags',
    component:EditTags
  },
  {
    path:'/echarts',
    component:EchartsPage
  },
  {
    path:'*',
    component:NotFound
  }

];

const router = new VueRouter({
  routes
});

export default router;
