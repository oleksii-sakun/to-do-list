import axios from "axios";
import urljoin from "url-join";
import { Column } from "../components/Board";

const baseUrl = "http://localhost:3000";

export default async function getData(): Promise<Column> {
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

export async function createTaskRequest(
  title: string,
  columnId: number
): Promise<void> {
  await axios.post(urljoin(baseUrl, "tasks"), {
    title,
    description: "",
    columnId,
  });
}

export async function createColumnRequest(title: string): Promise<void> {
  await axios.post(urljoin(baseUrl, "columns"), { title });
}

export async function deleteColumnRequest(id: number): Promise<void> {
  await axios.delete(urljoin(baseUrl, "columns", id.toString()));
}
