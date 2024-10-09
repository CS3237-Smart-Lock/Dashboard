import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { useState } from "react";

type UserCardProps = {
  name: string;
  description: string;
  image_url?: string;
  onDeleteUser: () => Promise<JSON>;
};

export const UserCard = (props: UserCardProps) => {
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);

  return (
    <>
      <DeleteUserDialog
        open={deleteUserDialogOpen}
        onOpenChange={setDeleteUserDialogOpen}
        onDeleteUser={props.onDeleteUser}
      />
      <Card className="hover:bg-muted transition-all">
        <CardHeader>
          <CardTitle className="flex justify-between">
            {props.name}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setDeleteUserDialogOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 w-52">
          <img
            src={`${import.meta.env.VITE_API_URL}${props.image_url}`}
            alt={props.name}
          />
        </CardContent>
      </Card>
    </>
  );
};
