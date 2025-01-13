export type AxiosErrorType = {
  response: { data: { message: string; error?: string; statusCode?: string } };
};
