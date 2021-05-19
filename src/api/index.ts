import axios, { AxiosResponse } from "axios";
import urljoin from "url-join";
import { Column } from "../components/Board";
import { Moment } from "moment";

export interface User {
  login: string;
  password: string;
  id: number;
}

const baseUrl = "http://localhost:3001";

export default async function getData(): Promise<Column[]> {
  const { data } = await axios.get(urljoin(baseUrl, "columns?_embed=tasks"));

  return data;
}

export async function deleteTaskRequest(id: number): Promise<void> {
  await axios.delete(urljoin(baseUrl, "tasks", id.toString()));
}

export async function changeTaskColumnIdRequest(
  taskId: number,
  columnId: number
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "tasks", taskId.toString()), { columnId });
}

export async function editTaskTitleRequest(
  taskId: number,
  title: string
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "tasks", taskId.toString()), { title });
}

export async function addTaskDeadlineRequest(
  taskId: number,
  date: Moment
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "tasks", taskId.toString()), { date });
}

export async function createTaskRequest(
  title: string,
  columnId: number
): Promise<void> {
  await axios.post(urljoin(baseUrl, "tasks"), {
    title,
    description: "",
    color: "#FFFFFF",
    columnId,
  });
}

export async function createColumnRequest(title: string): Promise<void> {
  await axios.post(urljoin(baseUrl, "columns"), { title });
}

export async function deleteColumnRequest(id: number): Promise<void> {
  await axios.delete(urljoin(baseUrl, "columns", id.toString()));
}

export async function changeTaskColorRequest(
  taskId: number,
  color: string
): Promise<void> {
  await axios.patch(urljoin(baseUrl, "tasks", taskId.toString()), { color });
}

export async function singUpRequest(
  login: string,
  password: string
): Promise<void> {
  await axios.post(urljoin(baseUrl, "users"), { login, password });
}

export async function singInRequest(
  login: string
): Promise<AxiosResponse<User[]>> {
  const userData = await axios.get(urljoin(baseUrl, `users?login=${login}`));
  return userData;
}
