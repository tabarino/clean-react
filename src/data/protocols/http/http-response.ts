export enum HttpStatusCode {
  noContent = 204,
  unauthorised = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
