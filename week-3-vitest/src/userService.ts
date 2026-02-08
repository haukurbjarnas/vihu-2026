export interface User {
  id: number;
  name: string;
  email: string;
}

// Simulates fetching a user from a database
export async function fetchUser(id: number): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (id <= 0) {
    throw new Error("Invalid user ID");
  }

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };
}

export async function fetchUsers(ids: number[]): Promise<User[]> {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  return users;
}
