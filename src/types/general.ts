export type RequestResponseSuccess<T> = {
  data: T;
  success: true;
};

export type RequestResponseFail = {
  success: false;
};

export type RequestResponse<T> = Promise<
  RequestResponseSuccess<T> | RequestResponseFail
>;

export type DatabaseCollection = "notes";

export type DatabaseDocument = {
  id: string;
};
