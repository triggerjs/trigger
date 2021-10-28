export function get(value?: string) {
  const items: Record<string, string> = {};

  if (typeof value === 'string' && value.trim() !== '') {
    value.split(';').forEach((pair) => {
      let arr = pair.split(':');

      if (arr.length === 2) {
        if (arr[0].indexOf(',') > -1) {
          // Multiple Values
          arr[0].split(',').forEach((key) => {
            items[key.trim()] = arr[1].trim();
          });
        }else if(arr[0].indexOf('-') > -1){
          let [from, to] = arr[0].split('-').map((val)=>{
            return +val
          }).sort((a, b) => a - b)

          for(let i = from; i <= to; i++){
            items[i] = arr[1].trim();
          }
        } else {
          items[arr[0].trim()] = arr[1].trim();
        }
      }
    });
  }
console.log(items);

  return items;
}
