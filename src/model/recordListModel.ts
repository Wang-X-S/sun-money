import clone from '@/lib/clone';

const localStorageKeyName = 'recordList'
const recordListModel = {
  data:[] as RecordItem[],
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as RecordItem[];
    return this.data
  },
  save(){
   window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
  },
  create(record:RecordItem){
    const recordCopy=clone(record)
    recordCopy.createAt=new Date()
    this.data.push(recordCopy)
  }
}
export default recordListModel