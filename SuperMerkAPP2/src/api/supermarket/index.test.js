import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Supermarket } from '.'

const app = () => express(apiRoot, routes)

let supermarket

beforeEach(async () => {
  supermarket = await Supermarket.create({})
})

test('POST /supermarkets 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', product: 'test', latlong: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.product).toEqual('test')
  expect(body.latlong).toEqual('test')
})

test('GET /supermarkets 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /supermarkets/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${supermarket.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(supermarket.id)
})

test('GET /supermarkets/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /supermarkets/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${supermarket.id}`)
    .send({ name: 'test', product: 'test', latlong: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(supermarket.id)
  expect(body.name).toEqual('test')
  expect(body.product).toEqual('test')
  expect(body.latlong).toEqual('test')
})

test('PUT /supermarkets/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', product: 'test', latlong: 'test' })
  expect(status).toBe(404)
})

test('DELETE /supermarkets/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${supermarket.id}`)
  expect(status).toBe(204)
})

test('DELETE /supermarkets/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
