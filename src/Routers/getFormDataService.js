const { ObjectId } = require("mongodb");
const CONSTANTS = require("../common/constants");
const ResponseCls = require("../common/responseCls");
const { find } = require("../data-layer/dbConfig");

const getFormDataRtr = async (_reqPayload) => {
  let resp = {
    statusCode: CONSTANTS.STATUS_CODES.BAD_REQUEST,
    response: { data: null },
  };
  let filterObj = {};
  const collectionName = CONSTANTS.DB_CONSTANTS.COLLECTIONS.FORM_DATA;

  if (_reqPayload?.id) {
    filterObj = {
      _id: new ObjectId(_reqPayload?.id),
    };
  }

  let resProm = await find(collectionName, filterObj);

  if (resProm?.length > 0) {
    resp.response.data = resProm;
    resp.statusCode = CONSTANTS.STATUS_CODES.SUCCESS;
  }

  return new ResponseCls(resp);
};

module.exports = getFormDataRtr;
