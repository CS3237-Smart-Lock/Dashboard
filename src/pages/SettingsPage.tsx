import * as Api from "@/api/api";
import { NewUserForm } from "@/components/NewUserForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCard } from "@/components/UserCard";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

const SettingsPage = () => {
  const [newUserFormOpen, setNewUserFormOpen] = useState(false);
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await Api.getAllUsers();
        setUsers(usersData);
      } catch (e) {
        const error = e as Error;
        toast({
          variant: "destructive",
          title: "Error fetching users:",
          description: error.message,
        });
      }
    };
    fetchUsers();
  }, [newUserFormOpen]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Settings</h1>
      <NewUserForm
        open={newUserFormOpen}
        onOpenChange={setNewUserFormOpen}
        onAddUser={Api.addUser}
      />
      <Button className="w-fit" onClick={() => setNewUserFormOpen(true)}>
        Add new user
      </Button>
      <div className="flex gap-4 flex-wrap">
        {users
          ? users.map((user) => (
              <UserCard
                name={user.name}
                description={user.description}
                image_url={user.image_url}
                onDeleteUser={() => Api.deleteUser(user.id)}
              />
            ))
          : Array.from({ length: 8 }).map(() => (
              <div className="flex flex-col gap-4 p-4 border rounded-lg w-52">
                <Skeleton className="rounded-md w-full h-6" />
                <Skeleton className="rounded-md w-full h-6" />
                <Skeleton className="h-32" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SettingsPage;
