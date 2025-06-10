'use client';

import {useEffect, useState} from "react";
import toast from "react-hot-toast";

import {useAuthStore} from "@/stores/authStore";
import FullPageLoader from "@/components/common/FullPageLoader";
import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

import {getRolesService} from "@/services/admin/roles/getRoles";
import {Permission, Role} from "@/interfaces/Admin/roles.interface";
import {Pencil, Shield, Trash2, Users} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import RoleAddActions from "@/components/admin/roles/role.add";
import {RoleForm} from "@/components/admin/roles/role.form";

export default function RolesPage() {
	const {token} = useAuthStore();
	const [roles, setRoles] = useState<Role[]>([]);
	const [permissions, setPermissions] = useState<Permission[]>([])
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingRole, setEditingRole] = useState<Role | null>(null)

	const getUniquePermissions = (roles: Role[]) => {
		const permisosMap = new Map();

		roles.forEach(role => {
			role.permissions.forEach(permission => {
				if (!permisosMap.has(permission.id)) {
					permisosMap.set(permission.id, permission);
				}
			});
		});

		return Array.from(permisosMap.values());
	}

	const handleCreateRole = (roleData: Omit<Role, "id" | "created_at" | "updated_at" | "permissions">) => {
		const newPermission: Permission[] = permissions;
		const newRole: Role = {
			...roleData,
			id: Math.max(...roles.map((r) => r.id)) + 1,
			created_at: new Date(),
			updated_at: new Date(),
			permissions: newPermission
		}
		setRoles([...roles, newRole])
		setIsFormOpen(false)
	}

	const handleUpdateRole = (roleData: Omit<Role, "id" | "created_at" | "updated_at" | "permissions">) => {
		if (!editingRole) return

		const updatedRole: Role = {
			...roleData,
			id: editingRole.id,
			created_at: editingRole.created_at,
			updated_at: new Date(),
			permissions: editingRole.permissions
		}

		setRoles(roles.map((role) => (role.id === editingRole.id ? updatedRole : role)))
		setEditingRole(null)
	}

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
				const permissionsData = getUniquePermissions(rolesData);

				setRoles(rolesData);
				setPermissions(permissionsData);

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
			<PagesWrapper breadcrumbItems={breadcrumbItems} title="Gestión de Roles" subtitle="Administra los roles y permisos del sistema" actions={<RoleAddActions onAdd={() => setIsFormOpen(true)} />}>

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
											<Button variant="outline" size="sm" onClick={() => setEditingRole(role)} className="gap-2">
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
															{(permission.label)}
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



			<RoleForm
				isOpen={isFormOpen || !!editingRole}
				onClose={() => {
					setIsFormOpen(false)
					setEditingRole(null)
				}}
				onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
				role={editingRole}
				permissions={permissions}
				title={editingRole ? "Editar Rol" : "Crear Nuevo Rol"}
			/>
		</Protected>
	);
}
