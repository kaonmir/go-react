import config from "../config";

interface Go {
  id: string;
  logs: string;
}

export async function getids(): Promise<string[]> {
  console.log(config);

  return await fetch(`${config.SERVER_URL}/api/go`)
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
  return await fetch(`${config.SERVER_URL}/api/go/${id}`).then((res) =>
    res.json()
  );
}

export async function patchGoById(id: string, logs: string): Promise<Go> {
  console.log(`${config.SERVER_URL}/api/go`);

  return await fetch(`${config.SERVER_URL}/api/go`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, logs }),
  }).then((res) => res.json());
}
