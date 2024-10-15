import { GetFileResponse } from '../../handler.ts';

export async function GetHandler(
	Request: Request<unknown, IncomingRequestCfProperties<unknown>>,
	Environment: Env,
	_: ExecutionContext
): Promise<Response> {
	return await GetFileResponse(Request, Request.headers.get('user-agent'), Environment, Request.url, caches);
}
