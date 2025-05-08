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

describe("Parners API", () => {
  let id: string

  it("should create a Parners item", async () => {
    const res = await request(app).post("/api/partners").set("Cookie", `token=${token}`).send({
      title: "Test Parners",
      subtitle: "Test Subtitle",
      image: "https://via.placeholder.com/150",
    })

    expect(res.status).toBe(201)
    id = res.body._id
  })

  it("should get all Parners items", async () => {
    const res = await request(app).get("/api/partners")
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("should update a Parners item", async () => {
    const res = await request(app).put(`/api/partners/${id}`).set("Cookie", `token=${token}`).send({
      title: "Updated Parners",
      subtitle: "Updated Subtitle",
      image: "https://via.placeholder.com/150",
    })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Updated Parners")
    expect(res.body.subtitle).toBe("Updated Subtitle")
  })

  it("should delete a Parners item", async () => {
    const res = await request(app).delete(`/api/partners/${id}`).set("Cookie", `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Item deleted successfully")
  })
})
