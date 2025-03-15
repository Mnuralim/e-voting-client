const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type GetOptions = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

export async function getLoginPayload({ params, headers }: GetOptions) {
  const response = await fetch(
    `${API_URL}/auths/login?${new URLSearchParams(params)}`,
    {
      method: "GET",
      headers,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resJson = await response.json();

  const data = await resJson.payload;

  return data;
}

export async function isLoggedIn() {
  const response = await fetch(`${API_URL}/auths/isLoggedIn`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resJson = await response.json();
  const data = await resJson.isLoggedIn;

  return data;
}

type PostOptions = {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export async function logout() {
  const response = await fetch(`${API_URL}/auths/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function login({ params, headers }: PostOptions) {
  const response = await fetch(`${API_URL}/auths/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(params ?? {}),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function getAllStudents(search?: string, tokenStatus?: string) {
  const url = new URL(`${API_URL}/students`);
  if (search) url.searchParams.append("search", search);
  if (tokenStatus) url.searchParams.append("tokenStatus", tokenStatus);

  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resJson = await response.json();

  const data: IStudent[] = await resJson.students;

  return data;
}

export async function createStudent(
  jwt: string,
  name: string,
  nim: string,
  email: string,
  programId: string,
  facultyId: string
) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, nim, email, programId, facultyId }),
  });

  return response;
}

export async function updateStudent(
  jwt: string,
  id: string,
  name: string,
  nim: string,
  email: string,
  programId: string,
  facultyId: string
) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, nim, email, programId, facultyId }),
  });

  return response;
}

export async function deleteStudent(jwt: string, id: string) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response;
}

export async function getAllFaculties() {
  const response = await fetch(`${API_URL}/students/faculties`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resJson = await response.json();

  const data: IFaculty[] = await resJson.faculties;

  return data;
}

export async function getAllPrograms() {
  const response = await fetch(`${API_URL}/students/programs`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resJson = await response.json();

  const data: IProgram[] = await resJson.programs;

  return data;
}

export async function generateSingleToken(jwt: string, id: string) {
  const response = await fetch(`${API_URL}/whitelist/bulk/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response;
}

export async function generateBulkToken(jwt: string) {
  const response = await fetch(`${API_URL}/whitelist/bulk`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response;
}
