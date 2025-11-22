function compressText(raw_text){
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
      cur_len = 1;
    }
    i++;

  }
  compressed.push(split_raw_text[size-1]);
  compressed.push(cur_len);

  return compressed.join('');
}
