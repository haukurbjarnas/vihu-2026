import { describe, it, expect } from "vitest";
import { fetchUser, fetchUsers } from "../src/userService";

describe("userService", () => {
  describe("fetchUser", () => {
    it("should return a user with the correct id", async () => {
      const user = await fetchUser(1);

      expect(user.id).toBe(1);
      expect(user.name).toBe("User 1");
      expect(user.email).toBe("user1@example.com");
    });

    it("should throw an error for invalid user ID", async () => {
      await expect(fetchUser(0)).rejects.toThrow("Invalid user ID");
      await expect(fetchUser(-1)).rejects.toThrow("Invalid user ID");
    });
  });

  describe("fetchUsers", () => {
    it("should return multiple users", async () => {
      const users = await fetchUsers([1, 2, 3]);

      expect(users).toHaveLength(3);
      expect(users[0].id).toBe(1);
      expect(users[2].id).toBe(3);
    });

    it("should return an empty array for empty input", async () => {
      const users = await fetchUsers([]);
      expect(users).toEqual([]);
    });
  });
});
