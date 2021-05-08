import axios from "axios";
import urljoin from "url-join";

const baseUrl = "http://localhost:3000";

export default async function getData() {
  const { data } = await axios.get(urljoin(baseUrl, "columns?_embed=tasks"));

  return data;
}

export async function deleteTaskRequest(id: number) {
  await axios.delete(urljoin(baseUrl, "tasks", id.toString()));
}

export async function changeTaskColumnIdRequest(
  taskId: number,
  columnId: number
) {
  await axios.patch(urljoin(baseUrl, "tasks", taskId.toString()), { columnId });
}

export async function createTaskRequest(title: string, columnId: number) {
  await axios.post(urljoin(baseUrl, "tasks"), {
    title,
    description: "",
    columnId,
  });
}

export async function createColumnRequest(title: string) {
  await axios.post(urljoin(baseUrl, "columns"), { title });
}

export async function deleteColumnRequest(id: number) {
  await axios.delete(urljoin(baseUrl, "columns", id.toString()));
}
