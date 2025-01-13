# 사건사고
### 데이터 보내기
시간초와 버튼 클릭하는 엘리멘트를 따로 만들었더니 데이터를 부모를 거쳐 옆으로 보내야하는 상황이 생겼다.   
-> forwardRef() useImperativeHandle()를 이용해서 해결했다.

### 핸드폰에 데이터 저장하기
AsyncStorage를 사용하면 핸드폰에 데이터를 저장할 수 있다. 그런데 AsyncStorage에 데이터가 업데이트 되었다는 것은 어떻게 확인하지?
-> 저장을 하는 함수와 이벤트 발생시키는 함수를 사용해서 저장되었단는 것을 알리라고 한다.   
```
const eventer = new EventEmitter();
eventer.emit('이벤트 고유 이름');  //이벤트 발생
eventer.on('이벤트 고유 이름',실행할 함수);
```

