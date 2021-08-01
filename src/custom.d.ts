type RootState={
  recordList:RecordItem[],
  tagList: Tag[],
  currentTag ?:Tag
}
type RecordItem ={
  tags: string[];
  notes:string;
  type:string;
  amount:number;
  createAt?: string;
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

