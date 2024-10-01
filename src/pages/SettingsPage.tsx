import { NewUserForm } from "@/components/NewUserForm";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Settings</h1>
      <NewUserForm trigger={<Button className="w-fit">Add new user</Button>} />
      <div className="flex gap-4 flex-wrap">
        <UserCard
          name="Sam"
          description="Me"
          image_url="https://placehold.co/200"
        />
        <UserCard
          name="Li"
          description="Dad"
          image_url="https://placehold.co/200"
        />
        <UserCard
          name="Dummy"
          description="dummy"
          image_url="https://placehold.co/200"
        />
        <UserCard
          name="Dummy"
          description="dummy"
          image_url="https://placehold.co/200"
        />
        <UserCard
          name="Dummy"
          description="dummy"
          image_url="https://placehold.co/200"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
