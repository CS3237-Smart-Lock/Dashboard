import { NewUserForm } from "@/components/NewUserForm";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import { useState } from "react";

type User = {
  name: string;
  description: string;
  image_url: string;
};

const SettingsPage = () => {
  const [users, setUsers] = useState<User[]>([
    { name: "Sam", description: "me", image_url: "https://placehold.co/200" },
    {
      name: "Dummy",
      description: "Lorem Ipsum",
      image_url: "https://placehold.co/200",
    },
    {
      name: "Dummy",
      description: "Lorem Ipsum",
      image_url: "https://placehold.co/200",
    },
    {
      name: "Dummy",
      description: "Lorem Ipsum",
      image_url: "https://placehold.co/200",
    },
    {
      name: "Dummy",
      description: "Lorem Ipsum",
      image_url: "https://placehold.co/200",
    },
    {
      name: "Dummy",
      description: "Lorem Ipsum",
      image_url: "https://placehold.co/200",
    },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Settings</h1>
      <NewUserForm trigger={<Button className="w-fit">Add new user</Button>} />
      <div className="flex gap-4 flex-wrap">
        {users.map((user) => (
          <UserCard
            name={user.name}
            description={user.description}
            image_url={user.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
