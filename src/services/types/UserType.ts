export interface User {
	id: number,
	email: string,
	passwordHash: string,
	enabled: boolean,
	minJwtIat: Date,
	createdAt: Date,
	updatedAt: Date,
}

export interface UserRaw {
	id: number,
	email: string,
	passwordHash: string,
	enabled: boolean,
	minJwtIat: Date,
	createdAt: Date,
	updatedAt: Date,
}

export interface SaveUser extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'>{
	password: string,
}
