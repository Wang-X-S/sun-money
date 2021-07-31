import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

type RootState={
  recordList:RecordItem[],
  tagList: Tag[],
  currentTag ?:Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [] ,
    tagList:[] ,
    currentTag :undefined
  } as RootState,
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
    setCurrentTag(state,id){
      state.currentTag = state.tagList.filter(t=>t.id ===id)[0]

    },
    fetchTags(state){
      state.tagList =  JSON.parse(window.localStorage.getItem('tagList')||'[]');
    },
    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0){
        window.alert('标签名重复')
      }
      const id = createId().toString()
      state.tagList.push({id: id, name: name});
      store.commit('saveTags')
      window.alert('添加成功')
    },
    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
  },

});
export default store;