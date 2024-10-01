const deleteUser = async (name: string) => {
  const response = await fetch(`/users/${name}`, {
    method: "DELETE",
  });

  return response;
};

export const addUser = async (name: string, desc: string, image: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("image", image);

  const response = await fetch("/your-api-endpoint", {
    method: "POST",
    body: formData,
  });

  return response;
};
