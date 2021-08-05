import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import recordId from '@/lib/recordId';
import router from '@/router';
import {defaultExpendTags} from '@/contants/defaultTag.ts';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] ,
    tagList: JSON.parse(window.localStorage.getItem('tagList')||'0')||defaultExpendTags,
    currentTag :undefined,
    currentRecord: undefined,
  } as RootState,
  mutations: {
    //recordList
    updateCurrentRecord(state,record:RecordItem){
      const idList =  state.recordList.map(item=>item.id)
      const index = record.id
      if(idList.indexOf(index)>=0){
        const oldRecord =state.recordList.filter(item=>item.id===index)[0]
        oldRecord.amount = record.amount
        oldRecord.notes = record.notes
        store.commit('saveRecords')

      }
    },
    setCurrentRecord(state,id){
      state.currentRecord = state.recordList.filter(t=>t.id ===id)[0]
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      if(record.tags.length===0){
        window.alert('请选择一个标签')
      }else{
      const recordCopy = clone(record);
      recordCopy.id=recordId().toString();
      recordCopy.createAt = new Date().toISOString();
      state.recordList?.push(recordCopy);
      store.commit('saveRecords');
      }
    },
    removeRecord(state,id:string){
      const idList = state.recordList.map(item=>item.id)
      const index = idList.indexOf(id)
      state.recordList.splice(index,1)
      store.commit('saveRecords')
      router.back()
    },
    //tagList
    removeTag(state,id:string){
      const idList = state.tagList.map(item=>item.id)
      const index = idList.indexOf(id)
      state.tagList.splice(index,1)
      store.commit('saveTags')


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
    // fetchTags(state){
    //   state.tagList =
    // },
    createTag(state,tag){
      const id = state.tagList.map(item=>item.id)
      if(id.indexOf(tag.id)>=0){
        window.alert('标签名重复')
      }else{
        state.tagList.push(tag);
        store.commit('saveTags')
        window.alert('添加成功')
        router.back()
      }


    },
    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },

  },

});
export default store;