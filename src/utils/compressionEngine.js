export function compressText(raw_text){
  const split_raw_text = [...raw_text];
  var compressed = [];
  var size = split_raw_text.length;
  var cur_len = 1;
  var i = 0;
  while (i < size-1){
    if (split_raw_text[i] === split_raw_text[i+1]){
      cur_len +=1;
    }
    else{
      compressed.push(split_raw_text[i]);
      compressed.push(cur_len);
      compressed.push(';');
      cur_len = 1;
    }
    i++;

  }
  compressed.push(split_raw_text[size-1]);
  compressed.push(cur_len);
  compressed.push(';');

  return compressed.join('');
}
export function decompressText(encoded_string) {
    if (encoded_string.length <= 2) throw new Error("Minimum length of 2, string and number!");

    let decoded_string = []
    for (let i = 0; i < encoded_string.length; i++) {
      var ch = encoded_string[i];
    i++;
      var nr = 0;
      var power = 1;
      while (encoded_string[i] !== ';' && i< encoded_string.length){
        if  (encoded_string[i] < '0' || encoded_string[i] >'9'){
        throw new Error("Didnt formated the correct way");
      }
        nr = nr*power + (encoded_string[i] - '0');
        power = power*10;
        
      i++;
      console.log(power);
    }
      for (let j = 1; j<= nr; j++)
        decoded_string.push(ch);
    }
    return decoded_string
}

console.log(decompressText("a12;"));
