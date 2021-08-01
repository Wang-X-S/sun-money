interface RootState{
  recordList:RecordItem[],
  tagList: Tag[],
  currentTag ?:Tag
}
interface RecordItem {
  tags: string[];
  notes:string;
  type:string;
  amount:number;
  createAt?: string;
}
interface Tag {
  id:string;
  name:string;
}
interface tagListModel {
  data: Tag[]
  fetch: () => Tag[]
  create:(name:string)=>string
  remove:(id:string)=>boolean
  save:()=>void
  update:(id:string,name:string)=>'success'|'not found'|'duplicated'
}

