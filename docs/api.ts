// @ts-ignore
import { config } from 'dotenv';
import * as p from '../package.json';

const vars = config({ path: '../.env' });

export default {
	openapi: '3.0.0',
	info: {
		title: 'Api Docs',
		description: 'API reference.\n',
		version: p.version,
	},
	servers: [
		{
			url: vars.parsed?.HTTP_ORIGIN,
		},
	],
	tags: [
		{
			name: 'Health',
		},
		{
			name: 'Authentication',
		},
		{
			name: 'user',
		},
	],
	paths: {
		'/health': {
			get: {
				tags: ['Health'],
				summary: 'API health',
				responses: {
					200: {
						description: 'API is healthy',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										status: {
											type: 'string',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/auth/jwt': {
			post: {
				tags: ['Authentication'],
				description: 'Login',
				parameters: [
					{
						name: 'email',
						description: 'Email',
						required: true,
						explode: true,
						schema: {
							type: 'string',
							example: 'user@example.com',
						},
						in: 'path',
					},
					{
						name: 'password',
						description: 'Password',
						required: true,
						explode: true,
						in: 'path',
						schema: {
							type: 'string',
							example: 'password',
						},
					},
				],
				responses: {
					200: {
						description: 'List of links',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/inline_response_200',
								},
							},
						},
					},
				},
			},
		},
		'/links/{id}': {
			delete: {
				tags: ['links'],
				description: 'Delete a link',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						style: 'simple',
						explode: false,
						schema: {
							type: 'string',
							format: 'uuid',
						},
					},
				],
				responses: {
					200: {
						description: 'Deleted link successfully',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/inline_response_200_1',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
			patch: {
				tags: ['links'],
				description: 'Update a link',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						style: 'simple',
						explode: false,
						schema: {
							type: 'string',
							format: 'uuid',
						},
					},
				],
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/body_1',
							},
						},
					},
				},
				responses: {
					200: {
						description: 'Updated link successfully',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/Link',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
		},
		'/links/{id}/stats': {
			get: {
				tags: ['links'],
				description: 'Get link stats',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						style: 'simple',
						explode: false,
						schema: {
							type: 'string',
							format: 'uuid',
						},
					},
				],
				responses: {
					200: {
						description: 'Link stats',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/Stats',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
		},
		'/domains': {
			post: {
				tags: ['domains'],
				description: 'Create a domain',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/body_2',
							},
						},
					},
				},
				responses: {
					200: {
						description: 'Created domain',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/Domain',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
		},
		'/domains/{id}': {
			delete: {
				tags: ['domains'],
				description: 'Delete a domain',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						style: 'simple',
						explode: false,
						schema: {
							type: 'string',
							format: 'uuid',
						},
					},
				],
				responses: {
					200: {
						description: 'Deleted domain successfully',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/inline_response_200_1',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
		},
		'/users': {
			get: {
				tags: ['users'],
				description: 'Get user info',
				responses: {
					200: {
						description: 'User info',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/User',
								},
							},
						},
					},
				},
				security: [
					{
						BearerJWT: [],
					},
				],
			},
		},
	},
	components: {
		schemas: {
			Link: {
				type: 'object',
				properties: {
					address: {
						type: 'string',
					},
					banned: {
						type: 'boolean',
						default: false,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					id: {
						type: 'string',
						format: 'uuid',
					},
					link: {
						type: 'string',
					},
					password: {
						type: 'boolean',
						default: false,
					},
					target: {
						type: 'string',
					},
					description: {
						type: 'string',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
					visit_count: {
						type: 'number',
					},
				},
			},
			Domain: {
				type: 'object',
				properties: {
					address: {
						type: 'string',
					},
					banned: {
						type: 'boolean',
						default: false,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					id: {
						type: 'string',
						format: 'uuid',
					},
					homepage: {
						type: 'string',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
				},
			},
			User: {
				type: 'object',
				properties: {
					apikey: {
						type: 'string',
					},
					email: {
						type: 'string',
					},
					domains: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Domain',
						},
					},
				},
			},
			StatsItem: {
				type: 'object',
				properties: {
					stats: {
						$ref: '#/components/schemas/StatsItem_stats',
					},
					views: {
						type: 'array',
						items: {
							type: 'number',
						},
					},
				},
			},
			Stats: {
				type: 'object',
				properties: {
					allTime: {
						$ref: '#/components/schemas/StatsItem',
					},
					lastDay: {
						$ref: '#/components/schemas/StatsItem',
					},
					lastMonth: {
						$ref: '#/components/schemas/StatsItem',
					},
					lastWeek: {
						$ref: '#/components/schemas/StatsItem',
					},
					updatedAt: {
						type: 'string',
					},
					address: {
						type: 'string',
					},
					banned: {
						type: 'boolean',
						default: false,
					},
					created_at: {
						type: 'string',
						format: 'date-time',
					},
					id: {
						type: 'string',
						format: 'uuid',
					},
					link: {
						type: 'string',
					},
					password: {
						type: 'boolean',
						default: false,
					},
					target: {
						type: 'string',
					},
					updated_at: {
						type: 'string',
						format: 'date-time',
					},
					visit_count: {
						type: 'number',
					},
				},
			},
			inline_response_200: {
				properties: {
					limit: {
						type: 'number',
						default: 10,
					},
					skip: {
						type: 'number',
						default: 0,
					},
					total: {
						type: 'number',
						default: 0,
					},
					data: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Link',
						},
					},
				},
			},
			body: {
				required: ['target'],
				properties: {
					target: {
						type: 'string',
					},
					description: {
						type: 'string',
					},
					expire_in: {
						type: 'string',
						example: '2 minutes/hours/days',
					},
					password: {
						type: 'string',
					},
					customurl: {
						type: 'string',
					},
					reuse: {
						type: 'boolean',
						default: false,
					},
					domain: {
						type: 'string',
					},
				},
			},
			inline_response_200_1: {
				properties: {
					message: {
						type: 'string',
					},
				},
			},
			body_1: {
				required: ['target', 'address'],
				properties: {
					target: {
						type: 'string',
					},
					address: {
						type: 'string',
					},
					description: {
						type: 'string',
					},
					expire_in: {
						type: 'string',
						example: '2 minutes/hours/days',
					},
				},
			},
			body_2: {
				required: ['address'],
				properties: {
					address: {
						type: 'string',
					},
					homepage: {
						type: 'string',
					},
				},
			},
			StatsItem_stats_browser: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
					},
					value: {
						type: 'number',
					},
				},
			},
			StatsItem_stats: {
				type: 'object',
				properties: {
					browser: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/StatsItem_stats_browser',
						},
					},
					os: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/StatsItem_stats_browser',
						},
					},
					country: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/StatsItem_stats_browser',
						},
					},
					referrer: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/StatsItem_stats_browser',
						},
					},
				},
			},
		},
		securitySchemes: {
			BearerJWT: {
				type: 'http',
				name: 'Bearer',
				in: 'header',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
};
