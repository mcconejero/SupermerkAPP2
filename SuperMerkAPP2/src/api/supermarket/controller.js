import { success, notFound } from '../../services/response/'
import { Supermarket } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Supermarket.create(body)
    .then((supermarket) => supermarket.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Supermarket.count(query)
    .then(count => Supermarket.find(query, select, cursor)
      .then((supermarkets) => ({
        count,
        rows: supermarkets.map((supermarket) => supermarket.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Supermarket.findById(params.id)
    .then(notFound(res))
    .then((supermarket) => supermarket ? supermarket.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Supermarket.findById(params.id)
    .then(notFound(res))
    .then((supermarket) => supermarket ? Object.assign(supermarket, body).save() : null)
    .then((supermarket) => supermarket ? supermarket.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Supermarket.findById(params.id)
    .then(notFound(res))
    .then((supermarket) => supermarket ? supermarket.remove() : null)
    .then(success(res, 204))
    .catch(next)
