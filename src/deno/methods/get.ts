import type { Context } from 'npm:hono';
import { GetFileResponse } from '../../handler.ts';

const cache = new Map();

const caches = {
	default: {
		async match(Context: Context): Promise<Response | void> {
			const Match: Response | undefined = cache.get(Context.req.url);

			return Match ? Match.clone() : undefined;
		},
		async put(Context: Context, Response: Response): Promise<void> {
			cache.set(Context.req.url, Response);
		},
	},
};

export async function GetHandler(Context: Context): Promise<Response> {
	return await GetFileResponse(Context, Context.req.header('user-agent'), Context.env, Context.req.url, caches);
}
