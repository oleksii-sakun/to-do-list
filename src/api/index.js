const baseUrl = "http://localhost:3000";

export default async function getData() {
  const apiData = await fetch(`${baseUrl}/columns?_embed=tasks`);
  let taskData = await apiData.json();

  return taskData;
}

export async function deleteTaskRequest(id) {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
}

export async function changeTaskColumnIdRequest(taskId, columnId) {
  await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      columnId,
    }),
  });
}

export async function createTaskRequest(title, columnId) {
  await fetch(`${baseUrl}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: "",
      columnId: columnId,
    }),
  });
}
