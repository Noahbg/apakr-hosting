import { PostFileResponse } from '../../handler.ts';

export async function PostHandler(
	Request: Request<unknown, IncomingRequestCfProperties<unknown>>,
	Environment: Env,
	_: ExecutionContext
): Promise<Response> {
	let Form;

	try {
		Form = await Request.formData();
	} catch (_) {}

	return await PostFileResponse(
		Request.headers.get('user-agent'),
		Request.headers.get('authorization'),
		Request.headers.get('cf-connecting-ip') || Request.headers.get('x-forwarded-for'),
		Request.headers.get('content-type'),
		Form,
		Environment,
		Request.headers.get('x-download-url'),
		Request.url
	);
}
