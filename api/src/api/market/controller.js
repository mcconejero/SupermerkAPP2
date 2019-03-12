import { success, notFound } from '../../services/response/'
import { Market } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Market.create(body)
    .then((market) => market.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Market.count(query)
    .then(count => Market.find(query, select, cursor)
      .then((markets) => ({
        count,
        rows: markets.map((market) => market.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Market.findById(params.id)
    .then(notFound(res))
    .then((market) => market ? market.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Market.findById(params.id)
    .then(notFound(res))
    .then((market) => market ? Object.assign(market, body).save() : null)
    .then((market) => market ? market.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Market.findById(params.id)
    .then(notFound(res))
    .then((market) => market ? market.remove() : null)
    .then(success(res, 204))
    .catch(next)
