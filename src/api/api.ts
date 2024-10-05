const api = process.env.API_URL;

const deleteUser = async (id: number) => {
  const response = await fetch(`${api}/user/${id}`, {
    method: "DELETE",
  });

  return response;
};

export const addUser = async (name: string, desc: string, image: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("image", image);

  const response = await fetch(`${api}/user`, {
    method: "POST",
    body: formData,
  });

  return response;
};

export const getAllUsers = async () => {
  const response = await fetch(`${api}/users`, {
    method: "get",
  });

  return response;
};
