const app = require('../../app');
const request = require('supertest');
// const should = require('should');

const loginspec = () => {
  return (
    describe('LOGIN', () => {
      describe('GET /auth', () => {
        describe('성공케이스', () => {
          it('Auth! 를 반환한다', (done) => { // done
            request(app)
              .get('/auth')
              .end((err, res) => {
                res.body.should.be.equal('Auth!');
                done();
              });
          });
        });
      });
      describe('POST /auth/signup', () => {
        describe('성공케이스', () => {
          let body;
          let email = getRandomEmailForTest();
          let name = '테스트유저';
          let pw = '1234';
          let profile = '유저 프로파일';
          before((done) => {
            request(app)
              .post('/auth/signup')
              .send({
                email: email,
                name: name,
                pw: pw,
                profile: profile
              })
              .expect(201)
              .end((err, res) => {
                body = res.body;
                done();
              });
          })
          it('회원가입에 성공하면 유저 객체를 반환한다', (done) => { // done
            // body.user.should.have.property('user_id');
            body.user.should.have.property('email', email);
            done();
          });
          it('입력한 email, name, profile 을 반환한다', (done) => {
            body.user.should.have.property('email', email);
            body.user.should.have.property('name', name);
            body.user.should.have.property('profile', profile);
            done();
          });
        });
        describe('실패케이스', () => {
          let body;
          let email = 'test@testDupl.com';
          let name = '테스트유저';
          let pw = '1234';
          let profile = '유저 프로파일';
          before((done) => {
            request(app)
              .post('/auth/signup')
              .send({
                email: email,
                name: name,
                pw: pw,
                profile: profile
              })
              .expect(201)
              .end((err, res) => {
                body = res.body;
                done();
              });
          })
          it('중복된 이메일을 등록하면 message로 duplEmail를 반환한다', (done) => {
            request(app)
              .post('/auth/signup')
              .send({
                email: email,
                name: name,
                pw: pw,
                profile: profile
              })
              .expect(200)
              .end((err, res) => {
                body = res.body;
                body.success.should.eql(false);
                body.message.should.eql('Exist Email');
                done();
              });
          });
        });
      });
      describe('POST /auth/login', () => {
        describe('성공케이스', () => {
          let body;
          let email = 'test@testDupl.com';
          let pw = '1234';
          before((done) => {
            request(app)
              .post('/auth/login')
              .send({
                email: email,
                pw: pw
              })
              .expect(200)
              .end((err, res) => {
                body = res.body;
                done();
              });
          });
          it('로그인에 성공하면 토큰을 반환한다', (done) => { // done
            body.should.have.property('token');
            body.user.should.have.property('email', email)
            done();
          });
        });
        describe('실패케이스', () => {
          it('없는 정보로 로그인하면 401를 반환한다', (done) => { // done
            request(app)
              .post('/auth/login')
              .send({})
              .expect(401)
              .end(done);
          });
          it('없는 사용자로 로그인하면 401를 반환한다', (done) => { // done
            request(app)
              .post('/auth/login')
              .send({ email: 'nullid@email.com', pw: '1111' })
              .expect(401)
              .end(done);
          });
        });
      });

      // it('resolves', (done) => {
      //   fooAsyncPromise(arg1, arg2).then((res, body) => {
      //     expect(res.statusCode).equal(incorrectValue);
      //     done();
      //   }).catch(done);
      // });


      describe('GET /auth/checkDuplEmail', () => {
        describe('성공케이스', () => {
          it(`중복된 이메일을 등록하면 message로 'Exist Email'를 반환한다`, (done) => {
            let email = 'test@testDupl.com';
            request(app)
              .get('/auth/checkDuplEmail')
              .send({
                email: email
              })
              .expect(200)
              .end((err, res) => {
                const body = res.body;
                body.success.should.eql(false);
                body.message.should.eql('Exist Email');
                done();
              });
          });
        });
      });
      // describe('POST /auth/findPassword', () => {
      //   describe('성공케이스', () => {
      //     it('비밀번호를 찾는 이메일을 전송한다', (done) => {
      //       let email = 'test@test.com';
      //       request(app)
      //         .get('/auth/checkDuplEmail')
      //         .send({
      //           email: email
      //         })
      //         .expect(200)
      //         .end((err, res) => {
      //           body = res.body;
      //           body.message.should.eql('duplEmail');
      //           done();
      //         });
      //     });
      //   });
      // });
    })
  )
}

const getRandomEmailForTest = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let emailString = '';
  for (let i = 0; i < 10; i++) {
    emailString += chars[Math.floor(Math.random() * chars.length)];
  }
  return emailString + '@test.com';
}

module.exports = loginspec;