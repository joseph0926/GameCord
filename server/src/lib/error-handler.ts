import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse {
	message: string;
	statusCode: number;
	status: string;
	serializeErrors(): IError;
}

export interface IError {
	message: string;
	statusCode: number;
	status: string;
}

export abstract class CustomError extends Error {
	abstract statusCode: number;
	abstract status: string;

	constructor(message: string) {
		super(message);
	}

	serializeErrors(): IError {
		return { message: this.message, statusCode: this.statusCode, status: this.status };
	}
}
export class JoiRequestValidationError extends CustomError {
	statusCode = StatusCodes.BAD_REQUEST;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class BadRequestError extends CustomError {
	statusCode = StatusCodes.BAD_REQUEST;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends CustomError {
	statusCode = StatusCodes.NOT_FOUND;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class UnAuthorizedError extends CustomError {
	statusCode = StatusCodes.UNAUTHORIZED;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class FileSizeError extends CustomError {
	statusCode = StatusCodes.REQUEST_TOO_LONG;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class ServerError extends CustomError {
	statusCode = StatusCodes.SERVICE_UNAVAILABLE;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}
