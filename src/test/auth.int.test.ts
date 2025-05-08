import request from "supertest"
import app from "../server" // ან "../app" თუ app ცალკეა
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

beforeAll(async () => {
  const dbUrl = process.env.MONGO_URL!
  await mongoose.connect(dbUrl)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase() // საჭიროა მხოლოდ test გარემოში
  await mongoose.connection.close()
})

describe("Auth Routes", () => {
  it("should register a new admin", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testadmin@example.com",
      password: "Test1234",
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe("admin registered succes")
  })

  it("should not allow duplicate registration", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testadmin@example.com", // იგივე იმეილი
      password: "Test1234",
    })

    expect(res.statusCode).toBe(400)
    expect(res.body.Message).toBe("admin arleady exists")
  })

  it("should login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testadmin@example.com",
      password: "Test1234",
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("admin logged in successfully")
    expect(res.headers["set-cookie"]).toBeDefined()
  })

  it("should not login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testadmin@example.com",
      password: "WrongPassword",
    })

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe("invalid credentials")
  })

  
})
