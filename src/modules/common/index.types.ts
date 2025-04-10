export type Response<T = null> = SuccessResponse<T> | FailureResponse;

type SuccessResponse<T> = {
    success: true;
    data: T;
};

type FailureResponse = {
    success: false;
    message: string;
};
