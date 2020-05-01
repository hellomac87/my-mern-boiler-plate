const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt가 몇글자인지
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // ex) dob by@gmail.com <= 공백을 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// user Model에 정보를 저장하기 전에 실행
// 일종의 model middleware
userSchema.pre("save", function (next) {
  let user = this;

  // 비밀번호를 생성하거나 바꿀떄
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      if (err) return next(err);

      // 유저 passowrd 를 hash 로 교체
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 가 같은지 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    // cb(_err, match)
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;

  // jsonwebtoken 을 이용해서 토큰 생성하기
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token
  // 'secetToken' => user._id
  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
