"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import {type Role, type Permission, GuardName} from "@/interfaces/Admin/roles.interface"

interface RoleFormProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (role: Omit<Role, "id" | "created_at" | "updated_at">) => void
	role?: Role | null
	permissions: Permission[]
	title: string
}

export function RoleForm({isOpen, onClose, onSubmit, role, permissions, title}: RoleFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		label: "",
		guard_name: GuardName.API,
		permissions: [] as Permission[],
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (role) {
			setFormData({
				name: role.name,
				label: role.label,
				guard_name: role.guard_name,
				permissions: role.permissions || [],
			})
		} else {
			setFormData({
				name: "",
				label: "",
				guard_name: GuardName.API,
				permissions: [],
			})
		}
	}, [role])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		try {
			await onSubmit(formData)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handlePermissionChange = (permission: Permission, checked: boolean) => {
		if (checked) {
			setFormData((prev) => ({
				...prev,
				permissions: [...prev.permissions, permission],
			}))
		} else {
			setFormData((prev) => ({
				...prev,
				permissions: prev.permissions.filter((p) => p.id !== permission.id),
			}))
		}
	}

	const isPermissionSelected = (permissionId: number) => {
		return formData.permissions.some((p) => p.id === permissionId)
	}

	const areAllPermissionsSelected = (group: Permission[]) =>
		group.every((perm) => isPermissionSelected(perm.id));

	const handleSelectAllGroup = (group: Permission[], checked: boolean) => {
		if (checked) {
			setFormData((prev) => ({
				...prev,
				permissions: [
					...prev.permissions,
					...group.filter(
						(perm) => !prev.permissions.some((p) => p.id === perm.id)
					),
				],
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				permissions: prev.permissions.filter(
					(p) => !group.some((perm) => perm.id === p.id)
				),
			}));
		}
	};

	const groupPermissionsByType = (permissions: Permission[]) => {
		const groups: {[key: string]: Permission[]} = {};
		permissions.forEach((permission) => {
			const type = permission.type || "General";
			if (!groups[type]) {
				groups[type] = [];
			}
			groups[type].push(permission);
		});
		return groups;
	};

	const permissionGroups = groupPermissionsByType(permissions);


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>
						{role ? "Modifica los datos del rol y sus permisos" : "Completa los datos para crear un nuevo rol"}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Rol</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
								placeholder="ej: role_example"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="label">Nombre</Label>
							<Input
								id="label"
								value={formData.label}
								onChange={(e) => setFormData((prev) => ({...prev, label: e.target.value}))}
								placeholder="ej: Rol de ejemplo"
								required
							/>
						</div>
					</div>

					<div className="space-y-4">
						<Label>Permisos</Label>
						<ScrollArea className="h-64 border rounded-md p-4">
							<div className="space-y-6">
								{Object.entries(permissionGroups).map(([type, typePermissions], idx, arr) => (
									<div key={type} className="space-y-3">
										<div className="flex items-center pb-2 w-fit">
											<Label htmlFor={`select-all-${type}`} className=" font-medium text-sm uppercase tracking-wide text-muted-foreground flex-1 mr-2">
												{type}
											</Label>
											<Checkbox
												id={`select-all-${type}`}
												checked={areAllPermissionsSelected(typePermissions)}
												onCheckedChange={(checked) =>
													handleSelectAllGroup(typePermissions, checked as boolean)
												}
											/>
										</div>
										<div className="grid grid-cols-2 gap-3">
											{typePermissions.map((permission) => (
												<div key={permission.id} className="flex items-center space-x-2">
													<Checkbox
														id={`permission-${permission.id}`}
														checked={isPermissionSelected(permission.id)}
														onCheckedChange={(checked) =>
															handlePermissionChange(permission, checked as boolean)
														}
													/>
													<Label htmlFor={`permission-${permission.id}`} className="text-sm font-normal cursor-pointer">
														{permission.label}
													</Label>
												</div>
											))}
										</div>
										{idx < arr.length - 1 && <Separator />}
									</div>
								))}
							</div>
						</ScrollArea>
						<p className="text-sm text-muted-foreground">{formData.permissions.length} permisos seleccionados</p>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
							Cancelar
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Procesando..." : role ? "Actualizar Rol" : "Crear Rol"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
