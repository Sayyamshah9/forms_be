const ResponseCls = require("./responseCls");

const handleResponse = (_response) => {
  const { statusCode, apiRes } = _response;
  const resp = new ResponseCls(statusCode || 200, apiRes || "");
  return resp;
};

module.exports = handleResponse;
