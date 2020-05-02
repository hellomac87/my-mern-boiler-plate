const { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증 처리를 하는 부분

  // client cookie 에서 token 을 가져온다.
  let token = req.cookies.x_auth;
  // token 을 복호화 한 후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증 X
    if (!user) return res.json({ isAuth: false, error: true });
    // 유저가 있으면 인증 O

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
