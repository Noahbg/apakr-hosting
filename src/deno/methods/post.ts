import type { Context } from 'npm:hono';
import { PostFileResponse } from '../../handler.ts';

export async function PostHandler(Context: Context): Promise<Response> {
	let Form;

	try {
		Form = await Context.req.formData();
	} catch (_) {}

	return await PostFileResponse(
		Context.req.header('user-agent'),
		Context.req.header('authorization'),
		Context.req.header('cf-connecting-ip') || Context.req.header('x-forwarded-for') || Context.env.remoteAddr.hostname,
		Context.req.header('content-type'),
		Form,
		Context.env,
		Context.req.header('x-download-url'),
		Context.req.url
	);
}
