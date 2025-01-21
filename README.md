# Clicker!
클릭으로 할 수 있는 게임입니다.
<a href="https://github.com/ByeolNabi/RN_clicker/blob/main/preview_clicker.apk">apk파일 주소</a>
## 기술
`React Native`와 `expo`를 사용해서 만들었습니다.   
AsyncStorage를 사용해서 정보를 저장합니다.   
EventEmitter를 이용해서 AsyncStorage에 데이터를 저장할 때 랭킹을 업데이트 합니다.
## 페이지
<p align="center">
  <img src="https://github.com/user-attachments/assets/0d778cf9-2c3a-40d2-a1f3-ef7bc2bd86a4" align="center" width="32%">
  <img src="https://github.com/user-attachments/assets/44ecc765-6f7e-40fb-a0bb-71e9cea123bd" align="center" width="32%">
    <img src="https://github.com/user-attachments/assets/3aa4d820-4d0e-4df2-82e2-eaefb27976a1" align="center" width="32%">
</p>
  
### clicker
주어진 시간 안에 클릭을 많이 해야 고득점합니다.

https://github.com/user-attachments/assets/6e3a08b3-175a-4d6a-82d4-8ceea4f7f38c

### Freezer
1초에 가까울수록 고득점합니다.

https://github.com/user-attachments/assets/ffa5d4e4-9c2c-4c04-bd38-c81b5d512746

# 사건사고
### 데이터 보내기
시간초와 버튼 클릭하는 엘리멘트를 따로 만들었더니 데이터를 부모를 거쳐 옆으로 보내야하는 상황이 생겼다.   
-> forwardRef() useImperativeHandle()를 이용해서 해결했다.

### 핸드폰에 데이터 저장하기
AsyncStorage를 사용하면 핸드폰에 데이터를 저장할 수 있다. 그런데 AsyncStorage에 데이터가 업데이트 되었다는 것은 어떻게 확인하지?
-> 저장을 하는 함수와 이벤트 발생시키는 함수를 사용해서 저장되었다는 것을 알리라고 한다.   
```
const eventer = new EventEmitter();
eventer.emit('이벤트 고유 이름');  //이벤트 발생
eventer.on('이벤트 고유 이름',실행할 함수);
```

