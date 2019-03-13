import { success, notFound } from '../../services/response/'
import { Product } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  var productG;
  await Product.create(body)
    .then((product) => {
      productG = product;
      product.view(true)
    })
    .then(success(res, 201))
    .catch(next)

  await Category.findById(productG.category)
    .then(category => {
      
      category.product.push(productG)
      return market.save();

    })
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ params }, res, next) => {
  Category.findById(params.id)
  .populate('products')
  .then(category => {
    return category.products;
    
  })
  .then(success(res, 200))
  .catch(next)
}

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
