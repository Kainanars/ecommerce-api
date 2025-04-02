export interface ResponseMessageDTO {
  message: string;
  status: number;
  data?: any;
  error?: any;
}

export class ApiResponse {
  static success<T>(data: T): ResponseMessageDTO {
    return { message: 'Success', status: 200, data };
  }
  static error(
    message: string,
    status: number,
    error?: any
  ): ResponseMessageDTO {
    return { message, status, error };
  }
  static unauthorized(): ResponseMessageDTO {
    return ApiResponse.error('Unauthorized', 401);
  }
  static forbidden(): ResponseMessageDTO {
    return ApiResponse.error('Forbidden', 403);
  }
  static notFound(): ResponseMessageDTO {
    return ApiResponse.error('Not Found', 404);
  }
  static internalServerError(): ResponseMessageDTO {
    return ApiResponse.error('Internal Server Error', 500);
  }
  static badRequest(message: string): ResponseMessageDTO {
    return ApiResponse.error(message, 400);
  }
  static conflict(message: string): ResponseMessageDTO {
    return ApiResponse.error(message, 409);
  }
  static tooManyRequests(): ResponseMessageDTO {
    return ApiResponse.error('Too Many Requests', 429);
  }
  static unsupportedMediaType(): ResponseMessageDTO {
    return ApiResponse.error('Unsupported Media Type', 415);
  }
  static unprocessableEntity(): ResponseMessageDTO {
    return ApiResponse.error('Unprocessable Entity', 422);
  }
  static notAcceptable(): ResponseMessageDTO {
    return ApiResponse.error('Not Acceptable', 406);
  }
  static tooLarge(): ResponseMessageDTO {
    return ApiResponse.error('Payload Too Large', 413);
  }
  static unavailable(): ResponseMessageDTO {
    return ApiResponse.error('Service Unavailable', 503);
  }
  static gatewayTimeout(): ResponseMessageDTO {
    return ApiResponse.error('Gateway Timeout', 504);
  }
  static methodNotAllowed(): ResponseMessageDTO {
    return ApiResponse.error('Method Not Allowed', 405);
  }

  static noContent(): ResponseMessageDTO {
    return ApiResponse.success(null);
  }
}
