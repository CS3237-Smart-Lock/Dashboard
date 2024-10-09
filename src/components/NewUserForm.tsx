import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type NewUserFormProps = {
  open: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  onAddUser?: (name: string, desc: string, image: File) => Promise<JSON>;
};

export const NewUserForm = (props: NewUserFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const { toast } = useToast();

  useEffect(() => {
    return () => {
      setName("");
      setDescription("");
      setImage(null);
      setImageSrc(undefined);
    };
  }, [props.open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !image) {
      toast({
        variant: "destructive",
        title: "Error adding user",
        description: "Fields cannot be empty",
      });
      return;
    }

    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!validImageTypes.includes(image.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only PNG, JPG, or JPEG images are allowed.",
      });
      return;
    }

    if (!props.onAddUser) {
      return;
    }

    try {
      await props.onAddUser(name, description, image);
      toast({
        variant: "default",
        description: "User successfully added",
      });

      if (props.onOpenChange) props.onOpenChange(false);
    } catch (e) {
      const error = e as Error;
      console.error("Error during request:", error.message);
      toast({
        variant: "destructive",
        title: "Error adding user",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new user, click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="photo" className="text-right">
              Image
            </Label>
            <Input
              id="photo"
              type="file"
              onChange={handleImageChange}
              className="col-span-3"
            />
            {imageSrc && (
              <img src={imageSrc} className="max-h-[300px] mx-auto" />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
