const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Init extends RequestInit {
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
}

export const fetcher = async (path: string, init?: Init) => {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, init);
  return response;
};
