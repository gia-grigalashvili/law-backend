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

describe("Contact API", () => {
  let id: string

  it("should create a contact", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Cookie", `token=${token}`)
      .send({ name: "gia grig", email: "grigala@gmai.com", message: "Hello, world!" })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe("Contact created successfully")
    expect(res.body.contact).toHaveProperty("_id")

    id = res.body.contact._id
  })

  it("should get paginated contacts", async () => {
    const res = await request(app)
      .get("/api/contact?page=1&limit=2")
      .set("Cookie", `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("data")
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body).toHaveProperty("page", 1)
    expect(res.body).toHaveProperty("limit", 2)
    expect(res.body).toHaveProperty("total")
    expect(res.body).toHaveProperty("totalPages")
  })

  it("should delete a contact", async () => {
    const res = await request(app).delete(`/api/contact/${id}`).set("Cookie", `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Contact deleted successfully")
    expect(res.body.contact._id).toBe(id)
  })
})
