const { ObjectId } = require("mongodb");
const ResponseCls = require("../common/responseCls");
const { updateOne } = require("../data-layer/dbConfig");
const CONSTANTS = require("../common/constants");

const updateFormDataRtr = async (_reqPayload) => {
  let resp = {
    statusCode: CONSTANTS.STATUS_CODES.BAD_REQUEST,
    response: { data: null },
  };
  let { toUpdate, filter } = _reqPayload;
  toUpdate = {
    $push: { responses: toUpdate },
  };
  // { $set: _payloadDoc }
  let filterObj = {};
  const collectionName = CONSTANTS.DB_CONSTANTS.COLLECTIONS.FORM_DATA;

  if (_reqPayload) {
    filterObj = { _id: new ObjectId(filter?.id) };

    let resProm = await updateOne(collectionName, toUpdate, filterObj);

    if (resProm) {
      resp.response.data = resProm;
      resp.statusCode = CONSTANTS.STATUS_CODES.SUCCESS;
    }
  } else {
    throw CONSTANTS.ERROR_MSGS.INPUT_PARAMS_FAILED;
  }

  return new ResponseCls(resp);
};

module.exports = updateFormDataRtr;
