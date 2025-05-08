import request from "supertest"
import app from "../server"
import mongoose from "mongoose"
import { createTestAdmin } from "./utils/createTestAdmin"

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe("bunner API", () => {
  let id: string

  it("should create a bunner item", async () => {
    const res = await request(app).post("/api/bunner").set("Cookie", `token=${token}`).send({
      title: "Test bunner",
      subtitle: "Test Subtitle",
      image: "https://via.placeholder.com/150",
      link1: "https://www.google.com",
    })

    expect(res.status).toBe(201)
    id = res.body._id
  })

  it("should get all bunner items", async () => {
    const res = await request(app).get("/api/bunner")
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("should update a bunner item", async () => {
    const res = await request(app).put(`/api/bunner/${id}`).set("Cookie", `token=${token}`).send({
      title: "Updated bunner",
      subtitle: "Updated Subtitle",
      image: "https://via.placeholder.com/150",
      link1: "https://www.google.com",
    })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Updated bunner")
    expect(res.body.subtitle).toBe("Updated Subtitle")
  })

  it("should delete a bunner item", async () => {
    const res = await request(app).delete(`/api/bunner/${id}`).set("Cookie", `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Item deleted successfully")
  })
})
