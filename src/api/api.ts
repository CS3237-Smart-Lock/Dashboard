import { Attempt } from "@/models/Attempt";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const api = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

export const deleteUser = async (id: number) => {
  console.log("delete user", id);
  const response = await fetch(`${api}/user/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getAllUsers = async () => {
  const response = await fetch(`${api}/users`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getAttempts = async (date: DateRange) => {
  const fromDateString = date.from ? format(date.from, "yyyy-MM-dd") : null;
  const toDateString = date.to ? format(date.to, "yyyy-MM-dd") : null;

  const queryParams = new URLSearchParams();

  if (fromDateString) {
    queryParams.append("start_date", fromDateString);
  }
  if (toDateString) {
    queryParams.append("end_date", toDateString);
  }

  const response = await fetch(`${api}/attempts?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to get attempts.`);
  }

  const data = await response.json();
  data.map((attempt: any) => (attempt.recognized_user = attempt.name));
  return data;
};

export const lockDoor = async () => {
  const response = await fetch(`${api}/lock_door`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const unlockDoor = async () => {
  const response = await fetch(`${api}/unlock_door`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};
