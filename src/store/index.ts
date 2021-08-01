import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router'
Vue.use(Vuex);

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
      recordCopy.createAt = new Date().toISOString();
      state.recordList?.push(recordCopy);
      store.commit('saveRecords');
    },
    //tagList
    removeTag(state,id:string){
      const idList = state.tagList.map(item=>item.id)
      const index = idList.indexOf(id)
      state.tagList.splice(index,1)
      store.commit('saveTags')
      router.back()

    },
    updateTagName(state,payload:{id:string,name:string}){
      const {id,name} = payload
      const idList=state.tagList.map(item=>item.id)
      if(idList.indexOf(id)>=0){
        const names=state.tagList.map(item=>item.name)
        if(names.indexOf(name)>=0){
          window.alert('标签名重复')
        }else{
          const tag = state.tagList.filter(item=>item.id===id)[0]
          tag.name=name
          store.commit('saveTags')
          return 'success'
        }
      }else{
        return 'not found'
      }
    },

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