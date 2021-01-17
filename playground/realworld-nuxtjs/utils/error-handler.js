class ErrorHandler {
  static handleAuthError(errors) {
    if (Object.prototype.toString.call(errors) !== "[object Object]") {
      return [];
    }
    let result = [];
    try {
      for (let key in errors) {
        const errReasons = errors[key];
        result = result.concat(errReasons.map((reason) => `${key} ${reason}`));
      }
    } catch (e) {
      console.error("解析后端返回出错", e);
      result = [];
    }
    return result;
  }
}

export default ErrorHandler;
