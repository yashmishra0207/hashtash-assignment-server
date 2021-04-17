class ResponseUtil {
  static getInstance () {
    return new ResponseUtil();
  }

  reponseJson (body: object, message: string) {
    return {
      body,
      message,
    }
  }
}
export const responseUtil = ResponseUtil.getInstance();