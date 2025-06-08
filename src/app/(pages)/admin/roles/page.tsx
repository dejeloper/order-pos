'use client';

import {useEffect, useState} from "react";
import toast from "react-hot-toast";

import {useAuthStore} from "@/stores/authStore";
import FullPageLoader from "@/components/common/FullPageLoader";
import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

import {getRolesService} from "@/services/admin/roles/getRoles";
import {Role} from "@/interfaces/Admin/roles.interface";
import {Pencil, Shield, Trash2, Users} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import RoleAddActions from "@/components/admin/roles/role.add";



export default function RolesPage() {
	const {token} = useAuthStore();
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);


	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Administación", href: "/admin"},
		{name: "Roles"}
	];

	useEffect(() => {
		if (!token) return;

		const loadRoles = async () => {
			setLoading(true);
			setError(null);

			try {
				const rolesData = await getRolesService();

				setRoles(rolesData);
			} catch (error) {
				setError(error + " ");
				toast.error(error + " ");
			} finally {
				setLoading(false);
			}
		};

		loadRoles();
	}, [token]);

	return (
		<Protected requiredPermission="view_roles">
			<PagesWrapper breadcrumbItems={breadcrumbItems} title="Gestión de Roles" subtitle="Administra los roles y permisos del sistema" actions={<RoleAddActions />}>

				{loading && <FullPageLoader message="Procesando..." />}
				{error && <p className="text-red-500 mb-4">{error}</p>}

				<div className="grid gap-6">
					{roles.length === 0 && !loading ? (
						<div className="text-center py-10 border rounded-lg bg-muted/20">
							<p className="text-muted-foreground">No hay roles disponibles</p>
						</div>
					) : (
						roles.map((role) => (
							<Card key={role.id} className="w-full">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-primary/10 rounded-lg">
											<Shield className="h-5 w-5 text-primary" />
										</div>
										<div>
											<CardTitle className="text-xl">{role.label}</CardTitle>
											<CardDescription className="flex items-center gap-2 mt-1">
												<code className="bg-muted px-2 py-1 rounded text-sm">{role.name}</code>
												<Badge variant="outline">Api</Badge>
											</CardDescription>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Protected requiredPermission="edit_roles" onlyRender={true}>
											<Button variant="outline" size="sm" className="gap-2">
												<Pencil className="h-4 w-4" />
												Editar
											</Button>
										</Protected>
										<Protected requiredPermission="delete_roles" onlyRender={true}>
											<Button
												variant="outline"
												size="sm"
												className="gap-2 text-destructive hover:text-destructive"
											>
												<Trash2 className="h-4 w-4" />
												Eliminar
											</Button>
										</Protected>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Users className="h-4 w-4" />
											<span>{role.permissions?.length || 0} permisos asignados</span>
										</div>

										{role.permissions && role.permissions.length > 0 && (
											<div>
												<h4 className="font-medium mb-3">Permisos:</h4>
												<div className="flex flex-wrap gap-2">
													{role.permissions.map((permission) => (
														<Badge key={permission.id} variant="secondary" className="text-xs">
															{(permission.name)}
														</Badge>
													))}
												</div>
											</div>
										)}

										<div className="text-xs text-muted-foreground pt-2 border-t">
											<div className="flex justify-between">
												<span>Creado: {new Date(role.created_at).toLocaleDateString()}</span>
												<span>Actualizado: {new Date(role.updated_at).toLocaleDateString()}</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					)}

				</div>

			</PagesWrapper>
		</Protected>
	);
}
