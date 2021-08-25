import config from "../config";

interface Go {
  id: string;
  logs: number[];
}

export async function getAllIds(): Promise<string[]> {
  return await fetch(`${config.SERVER_URL}/api/go/all`)
    .then((res) => res.json())
    .then((gos: Go[]) => gos.map((go) => go.id));
}

export async function createGo(logs: string): Promise<Go> {
  return await fetch(`${config.SERVER_URL}/api/go`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ logs }),
  }).then((res) => res.json());
}

export async function getGoById(id: string): Promise<Go> {
  return await fetch(`${config.SERVER_URL}/api/go?id=${id}`).then((res) =>
    res.json()
  );
}

export async function patchGoById(id: string, logs: number[]): Promise<Go> {
  return await fetch(`${config.SERVER_URL}/api/go?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ logs }),
  }).then((res) => res.json());
}
