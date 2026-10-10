function greet(name) {
  let message = '';
  switch (name) {
    case 'taro':
      message = 'こんにちは';
      break;
    case 'john':
      message = 'hello';
      break;
      default:
        console.log('登録なし');
        break;
  }
  console.log(message)//REPLで入力しない場合はこの記述必要
  // return message; //REPL使用の場合はこのコード
}

greet('taro');
greet('john');
greet('pochi');