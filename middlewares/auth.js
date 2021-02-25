const admin = require("../services/firebase.service");

const getAuthToken = (req, _res, next) => {
  if (req.headers.authorization) {
    const hasToken = req.headers.authorization.split(" ")[0] === "Bearer";
    if (hasToken) req.authToken = req.headers.authorization.split(" ")[1];
    else req.authToken = null;
  }
  next();
};

// Check if request contain authorization info
const isAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  });
};

const makeAdmin = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
  } catch (err) {
    console.log(err);
  }
};

const isAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);

      if (userInfo.admin === true) {
        req.authId = userInfo.uid;
        return next();
      }

      throw new Error("Unauthorized");
    } catch (err) {
      return res
        .status(401)
        .json({ error: "You are nor authorized to make this request" });
    }
  });
};

module.exports = { getAuthToken, isAuthenticated, makeAdmin, isAdmin };
