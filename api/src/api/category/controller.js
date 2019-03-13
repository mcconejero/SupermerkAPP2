import { success, notFound } from '../../services/response/'
import { Category } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  var categoryG;
  await Category.create(body)
    .then((category) => {
      categoryG = category;
      category.view(true)
    })
    .then(success(res, 201))
    .catch(next)

  await Market.findById(categoryG.market)
    .then(market => {
      
      market.categories.push(categoryG)
      return market.save();

    })
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ params } , res, next) => {
  Market.findById(params.id)
    .populate('categories')
    .then(market => {
      return market.categories;
    })
    .then(success(res, 200))
    .catch(next)
    }

export const show = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? Object.assign(category, body).save() : null)
    .then((category) => category ? category.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.remove() : null)
    .then(success(res, 204))
    .catch(next)
