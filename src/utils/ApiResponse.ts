class ApiResponse {
  statusCode: number;
  data: any;
  success: boolean;
  constructor(statusCode: number, data: any, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = this.statusCode < 400;
  }
}

export { ApiResponse };
