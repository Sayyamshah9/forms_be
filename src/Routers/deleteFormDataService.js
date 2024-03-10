const { ObjectId } = require("mongodb");
const ResponseCls = require("../common/responseCls");
const { deleteOne } = require("../data-layer/dbConfig");
const CONSTANTS = require("../common/constants");

const MSGS = {
  1: { msg: "Form Deleted", code: CONSTANTS.STATUS_CODES.SUCCESS },
  0: { msg: "No Data Found", code: CONSTANTS.STATUS_CODES.NOT_FOUND },
};

const deleteFormDataRtr = async (_reqPayload) => {
  let resp = {
    statusCode: CONSTANTS.STATUS_CODES.BAD_REQUEST,
    response: { data: null },
  };
  let filterObj = {};
  const collectionName = CONSTANTS.DB_CONSTANTS.COLLECTIONS.FORM_DATA;

  if (_reqPayload) {
    filterObj = {
      _id: new ObjectId(_reqPayload?.id),
    };

    let resProm = await deleteOne(collectionName, filterObj);

    if (String(resProm?.deletedCount)) {
      resp.response.data = MSGS[resProm?.deletedCount]?.msg;
      resp.statusCode = MSGS[resProm?.deletedCount]?.code;
    }
  } else {
    throw CONSTANTS.ERROR_MSGS.INPUT_PARAMS_FAILED;
  }

  return new ResponseCls(resp);
};

module.exports = deleteFormDataRtr;
