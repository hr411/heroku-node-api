# heroku에 nodejs api 서버 올리는 방법

## 명령어

```bash
# push to github
$ git push origin main

# heroku 실행
$ git push heroku master

# 로그보기
$ heroku logs --tail
```

## 실행방법

### 데이터베이스 설정

mysql/mysql 에 적절한 설정 추가

```js
var db = mysql.createConnection({
  host : 'sampelhost.com',
  port : '3306',
  user : 'sample-user',
  password : 'sample',
  database : 'sample-db'
});
```

서버실행

```bash
# 실행
$ npm start

# 디버그 모드로 실행
$ npm run debug

# 테스트 케이스 실행
$ npm test
```

## heroku push 방법

1. main branch 소스수정
1. main branch push
    ```bash
    $ git push main
    ```
1. master checkout
    ```bash
    $ git checkout master 
    ```
1. merge main
    ```bash
    $ git merge --no-ff main
    ```
1. master push
    ```bash
    $ git push heroku master
    ```

## heroku 에 대해

https://enigmatic-falls-66086.herokuapp.com/


## 참고
- https://medium.com/@yoobi55/express-node-js-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%84%9C%EB%B2%84%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4-heroku%EC%97%90-%EC%98%AC%EB%A6%AC%EB%8A%94-%EB%B0%A9%EB%B2%95-3a5134fc8743