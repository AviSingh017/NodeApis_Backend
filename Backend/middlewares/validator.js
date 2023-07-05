const usernameRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,12}$/
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/

const validatorMiddleware = (req, res, next) => {
  const { name,pass } = req.body;

  if (!usernameRegex.test(name)) {
    return res.status(400).send({ msg: "Username should be alphanumeric and between 6-12 characters." });
  }
  if(!passwordRegex.test(pass)){
    return res.status(400).send({ msg: "Username should be alphanumeric and between 6-12 characters." });
  }
  next();
};

module.exports = {validatorMiddleware}
