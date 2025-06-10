import Protected from "@/components/common/Protected";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

interface RoleAddActionsProps {
	onAdd: () => void;
}

export default function RoleAddActions({onAdd}: RoleAddActionsProps) {
	return (
		<Protected requiredPermission="create_roles" onlyRender={true}>
			<Button className="gap-2" onClick={onAdd}>
				<Plus className="h-4 w-4" />
				Nuevo Rol
			</Button>
		</Protected>
	)
}
