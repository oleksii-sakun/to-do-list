import axios, { AxiosResponse } from "axios";
import urljoin from "url-join";
import { Column } from "../components/Board";

export interface User {
  login: string;
  password: string;
  id: number;
}

const baseUrl = "http://localhost:3001";

export default async function getData(userId: string): Promise<Column[]> {
  const { data } = await axios.get(
    urljoin(baseUrl, `columns?userId=${userId}&&_embed=tasks`)
  );

  return data;
}

export async function deleteTaskRequest(id: number): Promise<void> {
  await axios.delete(urljoin(baseUrl, "tasks", id.toString()));
}

export async function createTaskRequest(
  title: string,
  color: string,
  date: string,
  columnId: number
): Promise<void> {
  await axios.post(urljoin(baseUrl, "tasks"), {
    title,
    description: "",
    color,
    date,
    columnId,
  });
}

export async function updateTaskRequest(
  id: number,
  title: string,
  color: string,
  date: string,
  columnId: number
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "tasks", id.toString()), {
    title,
    description: "",
    color,
    date,
    columnId,
  });
}

export async function createColumnRequest(title: string): Promise<void> {
  const userId = localStorage.getItem("userId");
  await axios.post(urljoin(baseUrl, "columns"), {
    title,
    userId: Number(userId),
  });
}

export async function deleteColumnRequest(id: number): Promise<void> {
  await axios.delete(urljoin(baseUrl, "columns", id.toString()));
}

export async function editColumnTitleRequest(
  id: number,
  title: string
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "columns", id.toString()), { title });
}

export async function singUpRequest(
  login: string,
  password: string
): Promise<void> {
  await axios.post(urljoin(baseUrl, "users"), { login, password });
}

export async function singInRequest(
  login: string,
  password: string
): Promise<AxiosResponse<User[]>> {
  const userData = await axios.get(
    urljoin(baseUrl, `users?login=${login}&password=${password}`)
  );
  return userData;
}

export async function loginCheckRequest(login: string): Promise<boolean> {
  const userData = await axios.get(urljoin(baseUrl, `users?login=${login}`));

  return !userData.data[0];
}
