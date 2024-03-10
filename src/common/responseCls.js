class ResponseCls {
  constructor(respObj) {
    (this.response = respObj?.response),
      (this.statusCode = respObj?.statusCode);
  }
}

module.exports = ResponseCls;
