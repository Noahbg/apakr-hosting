import { DeniedResponse, MissingFileResponse, UnauthorizedResponse, BadParametersResponse } from './responses.ts';
import type { Context } from 'npm:hono';
import { createHash as Hash } from 'node:crypto';
import type { Env } from './env.d.ts';

const FileRegex = /data\/apakr\/([0-9a-fA-F]+\.bsp\.bz2)/;

export function HandleProxiedURL(ProxyURL: string | null, File: string) {
	if (ProxyURL)
		return new Response(null, {
			status: 301,
			headers: {
				Location: `${ProxyURL}${File}`,
			},
		});

	return MissingFileResponse();
}

export async function GetFileResponse(Request: unknown, UserAgent: string | undefined, Environment: Env, RequestURL: string, caches: any) {
	if (UserAgent !== 'Half-Life 2') return DeniedResponse();

	const { searchParams: SearchParams } = new URL(RequestURL);

	const ServerIdentifier: string = decodeURIComponent(SearchParams.get('server') || '');
	if (!ServerIdentifier || ServerIdentifier === '') return DeniedResponse();

	const File: string = decodeURIComponent(SearchParams.get('file') || '');
	if (!File || File == '') return DeniedResponse();

	let ProxyURL: string = decodeURIComponent(SearchParams.get('proxy') || '');
	if (ProxyURL && ProxyURL !== '') ProxyURL = decodeURI(ProxyURL);

	if (!FileRegex.test(File)) return HandleProxiedURL(ProxyURL, File);

	const Match: RegExpMatchArray | null = File.match(FileRegex);
	if (!Match || Match.length === 0) return HandleProxiedURL(ProxyURL, File);

	const CacheResponse: Response | undefined = await caches.default.match(Request);
	if (CacheResponse) return CacheResponse.clone();

	const Key = `${ServerIdentifier}_${Match[1]}`;
	const FileContent = await Environment.ApakrFiles.get(Key, 'arrayBuffer');
	if (!FileContent) return HandleProxiedURL(ProxyURL, File);

	const FileResponse = new Response(FileContent, {
		headers: {
			'Content-Disposition': `attachment; filename="${File}"`,
			'Content-Type': 'application/x-bzip2',
			'Cache-Control': 'public, max-age=86400',
			'X-Cache-Status': 'MISS',
		},
	});

	await caches.default.put(Request, FileResponse.clone());

	return FileResponse;
}

function SHA256(String: string): string {
	return Hash('sha256').update(String).digest('hex');
}

export async function PostFileResponse(
	UserAgent: string | undefined,
	Authorization: string | undefined,
	RequestingIP: string | undefined,
	ContentType: string | undefined,
	Form: FormData | undefined,
	Environment: Env,
	XDownloadURL: string | undefined,
	URL: string
) {
	if (UserAgent != 'apakr_server' || !Authorization || Authorization === '') return DeniedResponse();
	if (SHA256(RequestingIP || '') != Authorization) return UnauthorizedResponse();
	if (!ContentType || !ContentType.startsWith('multipart/form-data')) return BadParametersResponse();
	if (!Form) return BadParametersResponse();

	const Delete: string | File | null = Form.get('delete');
	let DeleteArray: string[] = [];
	if (Delete && typeof Delete === 'string') DeleteArray = JSON.parse(Delete);

	for (const FileName of DeleteArray) Environment.ApakrFiles.delete(`${Authorization}_${FileName}`);

	const FileData: string | File | null = Form.get('file');
	if (!FileData || !(FileData instanceof File)) return BadParametersResponse();

	const Content: ArrayBuffer = await FileData.arrayBuffer();
	const Key = `${Authorization}_${FileData.name}`;
	if (URL.substring(URL.length - 1, URL.length) === '/') URL = URL.substring(0, URL.length - 1);

	if (Environment.ApakrFiles.get(Key, 'arrayBuffer') !== null) await Environment.ApakrFiles.put(Key, Content);
	if (Environment.SaveKVStore) Environment.SaveKVStore();

	return new Response(`File written.`, {
		status: 200,
		headers: {
			'X-Download-URL': `${URL}/?server=${Authorization}${
				XDownloadURL && XDownloadURL !== '' ? `&proxy=${encodeURI(XDownloadURL)}` : ''
			}&file=`,
		},
	});
}
