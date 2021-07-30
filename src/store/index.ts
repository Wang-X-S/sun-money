import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList:[] as Tag[]
  },
  mutations: {
    //recordList
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const recordCopy = clone(record);
      recordCopy.createAt = new Date();
      state.recordList?.push(recordCopy);
      store.commit('saveRecords');
    },
    //tagList
    fetchTags(state){
      state.tagList =  JSON.parse(window.localStorage.getItem('tagList')||'[]');
      return state.tagList
    },
    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0){
        window.alert('标签名重复')
        return 'duplicated'
      }
      const id = createId().toString()
      state.tagList.push({id: id, name: name});
      store.commit('saveTags')
      window.alert('添加成功')
      return 'success'
    },
    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
  },

});
export default store;