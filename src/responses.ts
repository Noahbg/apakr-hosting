export function DeniedResponse(): Response {
	return new Response('Access denied.', {
		status: 401,
	});
}

export function MissingFileResponse(): Response {
	return new Response('File missing.', {
		status: 404,
	});
}

export function UnauthorizedResponse(): Response {
	return new Response('Server identifier does not match request ip.', {
		status: 401,
	});
}

export function BadParametersResponse(): Response {
	return new Response('Bad parameters.', {
		status: 400,
	});
}
