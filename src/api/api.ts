import { DateRange } from "react-day-picker";

const api = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const deleteUser = async (id: number) => {
  console.log("delete user", id);
  const response = await fetch(`${api}/user/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }

  return await response.json();
};

export const addUser = async (name: string, desc: string, image: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", desc);
  formData.append("face_image", image);

  const response = await fetch(`${api}/user`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to add user`);
  }

  return await response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${api}/users`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users`);
  }

  return await response.json();
};

export const getAttempts = async (date: DateRange) => {};
