import { join, dirname } from 'path';

import { PathLike, promises as fs } from 'fs';

// @ts-ignore
import api from './api';

const Template = (output: PathLike | fs.FileHandle, { api, title, redoc }: { api: string; title: string; redoc: string; }) => fs.writeFile(
	output,
	`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>${title}</title>
	</head>
	<body>
		<redoc spec-url="${api}"></redoc>
		<script src="${redoc}"></script>
	</body>
</html>
`,
);

const Api = (output: PathLike | fs.FileHandle) => fs.writeFile(output, JSON.stringify(api));

const Redoc = (output: PathLike) => fs.copyFile(
	join(
		dirname(require.resolve('redoc')),
		'redoc.standalone.js',
	),
	output,
);

export default (async () => {
	const out = join(__dirname, 'static');
	const apiFile = 'api.json';
	const redocFile = 'redoc.js';
	await fs.mkdir(out, { recursive: true });
	return Promise.all([
		Api(join(out, apiFile)),
		Redoc(join(out, redocFile)),
		Template(join(out, 'index.html'), {
			api: apiFile,
			title: api.info.title,
			redoc: redocFile,
		}),

	]);
})();
