const CONSTANTS = require("../common/constants");
const ResponseCls = require("../common/responseCls");
const { insertOne } = require("../data-layer/dbConfig");

const createUsrRtr = async (_reqPayload) => {
  let resp = {};
  const collectionName = CONSTANTS.DB_CONSTANTS.COLLECTIONS.USERS;

  if (_reqPayload) {
    let resProm = await insertOne(collectionName, _reqPayload);
    resp.statusCode = resProm?.insertedId
      ? CONSTANTS.STATUS_CODES.SUCCESS
      : CONSTANTS.STATUS_CODES.BAD_REQUEST;
    resp.response = {
      data: { message: "Account Created!", id: resProm?.insertedId },
    };
  } else {
    throw CONSTANTS.ERROR_MSGS.INPUT_PARAMS_FAILED;
  }

  return new ResponseCls(resp);
};

module.exports = createUsrRtr;
