const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MogoDB Connected!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello Express!"));

app.post("/register", (req, res) => {
  // 회원가입시 필요한 정보를 client 에서 가져오면
  // 데이터베이스에 저장
  const user = new User(req.body);

  // 유저모델에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});

app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾기

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 유저가 없습니다.",
      });
    }

    // 요청한 이메일이 DB에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        // 비밀번호가 맞다면 token 을 생성하기.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에? => 쿠키, 로컬스토리지 등
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }
    });
  });
});

app.listen(port, () => console.log(`Express listening on port:${port}!`));
