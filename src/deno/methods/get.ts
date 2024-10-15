import type { Context } from 'npm:hono';
import { GetFileResponse } from '../../handler.ts';

const cache = new Map();

const caches = {
	default: {
		async match(Context: Context) {
			let Match: any = cache.get(Context.req.url);

			if (typeof Match !== 'undefined' && Match instanceof Response) return Match.clone();

			return Match;
		},
		async put(Context: Context, Response: Response) {
			cache.set(Context.req.url, Response);
		},
	},
};

export async function GetHandler(Context: Context): Promise<Response> {
	return await GetFileResponse(Context, Context.req.header('user-agent'), Context.env, Context.req.url, caches);
}
