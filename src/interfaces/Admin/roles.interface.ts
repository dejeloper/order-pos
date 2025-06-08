export interface Role {
	id: number;
	name: string;
	label: string;
	guard_name: GuardName;
	created_at: Date;
	updated_at: Date;
	permissions: Permission[];
}

export enum GuardName {
	API = "api",
}

export interface Permission {
	id: number;
	name: string;
	guard_name: GuardName;
	created_at: Date;
	updated_at: Date;
	pivot: Pivot;
}

export interface Pivot {
	role_id: number;
	permission_id: number;
}
