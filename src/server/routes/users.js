const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const passwordValidator = require("password-validator");
const { validate } = require("email-validator");
const { v4: uuidv4 } = require("uuid");

/* password req*/
// Create a schema
// eslint-disable-next-line new-cap
const passSchema = new passwordValidator();

// Add properties to it
passSchema
  .is()
  .min(12) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1); // Must have at least 1 digits

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "a11ymaps1@gmail.com",
    pass: "apppassword",
  },
});

const mailOptions = {
  from: "a11lymaps1@gmail.com",
  to: "myfriend@yahoo.com",
  subject: "A11ymaps Recovery Code",
  text: "That was easy!",
};

const Schema = mongoose.Schema;
const loginSchema = new Schema({
  email: String,
  userName: String,
  userPass: String,
  accessToken: String,
  verified: Boolean,
});
const LoginModel = mongoose.model("LoginModel", loginSchema);

const user = "userName";
const pass = "userPass";
const email = "email";
const verificationCode = "verificationCode";

function valCookie(req, res, next) {
  const { cookies } = req;
  if ("session_id" in cookies) {
    console.log("session_id exists");
    if (cookies.session_id === "") {
      res.status(403).send({ msg: "no session present" });
      return;
    } else {
      next();
    }
  } else {
    res.status(403).send({ msg: "no session present" });
  }
}

/* GET users listing. First New Login/signup Verification MainContainer.js, setInitialCookieCurl */
router.put("/cookie", function (req, res, next) {
  const curr = req.body[user];
  LoginModel.find({ accessToken: curr })
    .then((arr) => {
      if (arr.length !== 0) {
        const test = arr[0][user];
        console.log(`first login ${arr[0]}`);
        res.cookie("session_id", `${curr}`);
        res.send(getReturnHelper(0, test, arr[0], "")).status(304);
      } else {
        res.send(getReturnHelper(1, "", "")).status(403);
      }
    })
    .catch((error) => {
      res.send({ error: error });
      return;
    });
});

/* persistent login verification, getCookieValidationCurl*/
router.get("/cookie", valCookie, function (req, res) {
  const { cookies } = req;
  LoginModel.find({ accessToken: cookies.session_id })
    .then((ref) => {
      if (ref.length !== 0) {
        res.status(200).send({ [user]: ref[0][user] });
      } else {
        res
          .cookie("session_id", "")
          .status(403)
          .send({ msg: "cookie not valid" });
      }
    })
    .catch((error) => {
      res.send({ error: error });
      return;
    });
});

/* logout verification logoutCurl*/
router.put("/cookie/logout", valCookie, async function (req, res) {
  const { cookies } = req;
  try {
    await LoginModel.findOneAndUpdate(
      { accessToken: cookies.session_id },
      { accessToken: "" },
      { new: true }
    );
  } catch (error) {
    res.send({ error: error });
    return;
  }
  console.log("made it here");
  res.cookie("session_id", "").send({});
});

function getReturnHelper(stat, payload, token) {
  return { status: stat, userName: payload, accessToken: token };
}

function getErrorHelper(stat, payload, token) {
  return { status: stat, error: payload, accessToken: token };
}

/* PUT users listing. first new loginCurl login.js , error 1 is bad user, error 2 is bad password, error 3 is not verified*/
router.put("/", function (req, res, next) {
  const email = req.body["email"];
  LoginModel.find({ email: email })
    .then((arr) => {
      if (arr.length !== 0) {
        if (arr[0][pass] === req.body[pass]) {
          if (arr[0]["verified"] === false) {
            res.send(getReturnHelper(3, "", ""));
            return;
          }
          console.log("inside verified");
          const uuid = uuidv4();
          LoginModel.findOneAndUpdate(
            { email: email },
            { accessToken: `${uuid}` },
            { new: true }
          )
            .then((newStuff) => {
              res
                .cookie("session_id", `${newStuff["accessToken"]}`)
                .send(
                  getReturnHelper(0, newStuff[user], newStuff["accessToken"])
                );
            })
            .catch((error) => {
              res.send({ error: error });
            });
          return;
        } else {
          res.send(getReturnHelper(2, "", ""));
          return;
        }
      } else {
        res.send(getReturnHelper(1, "", ""));
        return;
      }
    })
    .catch((error) => {
      res.send({ error: error });
    });
  return;
});

/* initial signup.js signupCurl error 1:email aready exists, error 2:email is not valid, error 3: password too weak*/
router.post("/", function (req, res, next) {
  const mail = req.body["email"];
  const LoginModel = mongoose.model("LoginModel", loginSchema);
  LoginModel.find({ email: mail })
    .then((arr) => {
      if (!validate(mail)) {
        res.send(getReturnHelper(1, mail, "", ""));
        return;
      }
      if (arr.length == 0) {
        const passCheck = passSchema.validate(req.body[pass], {
          details: true,
        });
        if (passCheck.length !== 0) {
          res.send(getErrorHelper(3, passCheck[0]["message"], ""));
          return;
        }
        const uuid = uuidv4();
        const test = new LoginModel({
          email: mail,
          userName: req.body[user],
          userPass: req.body[pass],
          accessToken: `${uuid}`,
          verified: false,
        });
        test
          .save()
          .then((stuff) => {
            res.send(getReturnHelper(0, mail, ""));
          })
          .catch((error) => {
            res.send({ error: error });
          });
        return;
      } else {
        res.send(getReturnHelper(2, "", ""));
      }
    })
    .catch((error) => {
      res.send({ error: error });
    });
  return;
});

/* PUT users listing. account verification, verificationCurl, error 1 is bad user, error 2 is bad Verification*/
router.put("/verify", function (req, res, next) {
  const ver = req.body[verificationCode];
  const mail = req.body[email];
  LoginModel.find({ email: mail })
    .then((arr) => {
      if (arr.length !== 0) {
        if (arr[0]["accessToken"] === ver) {
          LoginModel.findOneAndUpdate(
            { email: mail },
            { verified: true },
            { new: true }
          )
            .then((newStuff) => {
              res
                .cookie("session_id", `${newStuff["accessToken"]}`)
                .send(getReturnHelper(0, mail, newStuff["accessToken"]));
            })
            .catch((error) => {
              res.send({ error: error });
            });
          return;
        } else {
          res.send(getReturnHelper(2, "", ""));
          return;
        }
      } else {
        res.send(getReturnHelper(1, "", ""));
        return;
      }
    })
    .catch((error) => {
      res.send({ error: error });
    });
  return;
});

/* POST users listing. Account recovery email send, recoverySendCodeCurl , error 1 is bad user, error 2 is bad password, error 3 is not verified*/
router.post("/verify", function (req, res, next) {
  const mail = req.body[email];
  console.log(mail);
  LoginModel.find({ email: mail })
    .then((arr) => {
      console.log(arr[0]["accessToken"]);
      if (arr.length !== 0) {
        if (arr[0]["accessToken"] === "") {
          const newUuid = uuidv4();
          LoginModel.findOneAndUpdate(
            { email: mail },
            { accessToken: newUuid },
            { new: true }
          )
            .then((newStuff) => {
              mailOptions["to"] = newStuff["email"];
              mailOptions["text"] = newStuff["accessToken"];
              console.log(mailOptions["to"]);
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  res.send({ error: error });
                  console.log(error);
                } else {
                  res.send(getReturnHelper(0, mail, ""));
                  console.log("Email sent: " + info.response);
                }
              });
            })
            .catch((error) => {
              res.send({ error: error });
            });
          return;
        } else {
          mailOptions["to"] = arr[0]["email"];
          mailOptions["text"] = arr[0]["accessToken"];
          console.log(mailOptions["to"]);
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send({ error: error });
              console.log(error);
            } else {
              res.send(getReturnHelper(0, mail, ""));
              console.log("Email sent: " + info.response);
            }
          });
        }
      } else {
        res.send(getReturnHelper(1, "", ""));
        return;
      }
    })
    .catch((error) => {
      res.send({ error: error });
    });
  return;
});
/* reset password, recoveryCurl , Error 1:email not found, Error 2:verification code wrong, Error 3:password too weak
Error 4: not verified yet*/
router.put("/recovery", function (req, res, next) {
  const ver = req.body[verificationCode];
  const mail = req.body[email];
  const password = req.body[pass];
  LoginModel.find({ email: mail })
    .then((arr) => {
      if (arr.length !== 0) {
        if (arr[0]["verified"] === false) {
          res.send(getErrorHelper(4, "must verify account first", ""));
          return;
        }
        if (arr[0]["accessToken"] === ver) {
          const passCheck = passSchema.validate(password, { details: true });
          if (passCheck.length !== 0) {
            res.send(getErrorHelper(3, passCheck[0]["message"], ""));
            return;
          }
          LoginModel.findOneAndUpdate(
            { email: mail },
            { [pass]: password },
            { new: true }
          )
            .then((newStuff) => {
              res
                .cookie("session_id", `${newStuff["accessToken"]}`)
                .send(getReturnHelper(0, mail, newStuff["accessToken"]));
            })
            .catch((error) => {
              res.send({ error: error });
            });
          return;
        } else {
          res.send(getReturnHelper(2, "", ""));
          return;
        }
      } else {
        res.send(getReturnHelper(1, "", ""));
        return;
      }
    })
    .catch((error) => {
      res.send({ error: error });
    });
  return;
});

module.exports = router;
module.exports.valCookie=valCookie;
module.exports.LoginModel=LoginModel;
