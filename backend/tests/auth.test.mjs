import request from "supertest";
import app from "./setup.js";
import User from "../src/models/User.js";

let cookie;

describe("Auth & User Flow Tests", () => {

  // 1️⃣ Signup Success
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@gmail.com",
        password: "123456",
        role:"user"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@gmail.com");
  });


  // 2️⃣ Prevent Duplicate Signup
  it("should NOT register duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });


  // 3️⃣ Login Success
  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@gmail.com");

    cookie = res.headers["set-cookie"];
  });


  // 4️⃣ /auth/me Protected Route
  it("should return current user", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@gmail.com");
  });


  // 5️⃣ Admin Get Users Route
  it("admin can view users", async () => {

    await User.updateOne({email:"test@gmail.com"},{role:"admin"});

    const res = await request(app)
      .get("/api/admin/users")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.users.length).toBeGreaterThan(0);
  });

});
