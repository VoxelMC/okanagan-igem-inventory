export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined; }
	| Json[];

export interface Database {
	public: {
		Tables: {
			roles: {
				Row: {
					id: number;
					name: string;
					uuid: string;
				};
				Insert: {
					id?: number;
					name?: string;
					uuid?: string;
				};
				Update: {
					id?: number;
					name?: string;
					uuid?: string;
				};
				Relationships: [];
			};
			roletokens: {
				Row: {
					id: number;
					role: number;
					token: string | null;
				};
				Insert: {
					id?: number;
					role: number;
					token?: string | null;
				};
				Update: {
					id?: number;
					role?: number;
					token?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "roletokens_role_fkey";
						columns: ["role"];
						referencedRelation: "roles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never
		};
		Functions: {
			[_ in never]: never
		};
		Enums: {
			[_ in never]: never
		};
		CompositeTypes: {
			[_ in never]: never
		};
	};
}
