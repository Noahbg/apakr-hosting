import { GetHandler } from './cf/methods/get.ts';
import { PostHandler } from './cf/methods/post.ts';
import type { Env } from './env.d.ts';

export default {
	async fetch(
		Request: Request<unknown, IncomingRequestCfProperties<unknown>>,
		Environment: Env,
		Context: ExecutionContext
	): Promise<Response> {
		if (Request.method.toUpperCase() === 'GET') return GetHandler(Request, Environment, Context);
		else if (Request.method.toUpperCase() === 'POST') return PostHandler(Request, Environment, Context);

		return new Response('Unsupported method.', {
			status: 404,
		});
	},
} satisfies ExportedHandler<Env>;
