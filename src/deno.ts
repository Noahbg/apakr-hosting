import { Hono } from 'npm:hono';
import { logger } from 'npm:hono/logger';
import type { Next } from 'npm:hono/types';
import { GetHandler } from './deno/methods/get.ts';
import { PostHandler } from './deno/methods/post.ts';
import 'https://deno.land/x/worker_types@v1.0.0/cloudflare-worker-types.ts';

const KVStore = new Map();

const KV = {
	get: async function (Key: string, _Type: 'arrayBuffer'): Promise<ArrayBuffer | undefined> {
		return KVStore.get(Key);
	},
	put: async function (Key: string, Content: ArrayBuffer): Promise<void> {
		KVStore.set(Key, Content);
	},
};

type Bindings = {
	ApakrFiles: KVNamespace;
};

const App = new Hono<{ Bindings: Bindings }>();

App.use('*', logger());
App.use('*', async function (Context, Next: Next) {
	// @ts-ignore: In-memory map.
	Context.env.ApakrFiles = KV;

	await Next();
});

App.get('/', GetHandler);
App.post('/', PostHandler);

Deno.serve({ port: 3984 }, App.fetch);