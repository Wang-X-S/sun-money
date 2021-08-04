let id: number = parseInt(window.localStorage.getItem('_idRecordMax') || '0') || 0;

function recordId() {
  id++;
  window.localStorage.setItem('_idRecordMax',id.toString())
  return id;
}

export default recordId;