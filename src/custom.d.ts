type RecordItem ={
  tags: string[];
  notes:string;
  type:string;
  amount:number;
  createdAt?:Date
}
type Tag ={
  id:string;
  name:string;
}
type tagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create:(name:string)=>string
  remove:(id:string)=>boolean
  save:()=>void
  update:(id:string,name:string)=>'success'|'not found'|'duplicated'
}
interface Window {
  tagList:Tag[]
  createTag:(name:string)=>void
  removeTag:(id:string)=>boolean
}
