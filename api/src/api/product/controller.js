import { success, notFound } from '../../services/response/'
import { Product } from '.'
import { Category } from '../category'

var id;
export const create = async ({ bodymen: { body } }, res, next) => {
  await Product.create({...body, categoryId: body.categoryId })
      .then((product) => {
          id = product.view(true).id;
          return product.view(true);
      })
      .then(success(res, 201))
      .catch(next)

  await Category.findByIdAndUpdate(body.categoryId, { $addToSet: { product: id } }, { new: true })
    .then(success(res, 200))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.count(query)
    .then(count => Product.find(query, select, cursor)
      .then((products) => ({
        count,
        rows: products.map((product) => product.view(true))
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)
