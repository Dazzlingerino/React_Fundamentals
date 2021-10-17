export default class Mapper {
	static mapHttpError = (statusCode) =>
		({
			400: 'Bad Request',
			401: 'Unauthorized',
			403: 'Forbidden',
			404: 'Not Found',
			405: 'Method Not Allowed',
			406: 'Not Acceptable',
			408: 'Request Timeout',
			409: 'Conflict',
			410: 'Gone',
			412: 'Precondition Failed',
			413: 'Payload Too Large',
			415: 'Unsupported Media Type',
			422: 'Unprocessable Entity',
			429: 'Too Many Requests',
			500: 'Internal Server Error',
			501: 'Not Implemented',
			502: 'Bad Gateway',
			503: 'Service Unavailable',
			504: 'Gateway Timeout',
		}[statusCode]);

	static mapError = (err) =>
		({
			no_permission: 'No permission',
			not_found: 'Not found',
			exists: 'Exists',
			unknown: 'Unknown',
			forbidden: 'Forbidden',
			unavailable: 'Unavailable',
			bad_token: 'Bad token',
		}[err] || err);
}
