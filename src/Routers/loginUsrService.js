const CONSTANTS = require("../common/constants");
const ResponseCls = require("../common/responseCls");
const { find } = require("../data-layer/dbConfig");

const loginUsrRtr = async (_reqPayload) => {
  let resp = {
    statusCode: CONSTANTS.STATUS_CODES.BAD_REQUEST,
    response: { data: { message: "", id: "" } },
  };
  const collectionName = CONSTANTS.DB_CONSTANTS.COLLECTIONS.USERS;

  if (_reqPayload) {
    let resProm = await find(collectionName, {
      emailId: _reqPayload?.emailId,
    });

    if (resProm?.length > 0) {
      if (resProm[0]?.password !== _reqPayload?.password) {
        resp.response.data.message = "Invalid Password";
      } else {
        resp.response["data"] = {
          message: "User LoggedIn",
          id: resProm[0]?._id,
          name: resProm[0]?.name,
        };
        resp.statusCode = CONSTANTS.STATUS_CODES.SUCCESS;
      }
    } else {
      resp.response["data"] = { message: "Invalid EmailId" };
    }
  } else {
    throw CONSTANTS.ERROR_MSGS.INPUT_PARAMS_FAILED;
  }

  return new ResponseCls(resp);
};

module.exports = loginUsrRtr;
