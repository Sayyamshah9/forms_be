const createUsrRtr = require("./createUsrService");
const deleteFormDataRtr = require("./deleteFormDataService");
const getFormDataRtr = require("./getFormDataService");
const insertFormDataRtr = require("./insertFormDataService");
const loginUsrRtr = require("./loginUsrService");
const updateFormDataRtr = require("./updateFormDataService");

const Router = require("express").Router();

const Controller = {
  createUsr: createUsrRtr,
  loginUsr: loginUsrRtr,
  insertFormData: insertFormDataRtr,
  getFormData: getFormDataRtr,
  updateFormData: updateFormDataRtr,
  deleteFromData: deleteFormDataRtr,
};

Router.all("/", async (req, res) => {
  const { payload, apiCode } = req?.body;
  const controllerFunc = Controller[apiCode];

  if (controllerFunc) {
    try {
      const { statusCode, response } = await controllerFunc(payload);
      res.status(statusCode).json(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Invalid API Code");
  }
});

module.exports = Router;
