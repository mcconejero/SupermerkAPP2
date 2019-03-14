import { success, notFound } from '../../services/response/'
import { Category } from '.'
import { Market } from '../market'

var id;
export const create = async ({ bodymen: { body } }, res, next) => {
  await Category.create({...body, marketId: body.marketId })
      .then((category) => {
          id = category.view(true).id;
          return category.view(true);
      })
      .then(success(res, 201))
      .catch(next)


  await Market.findByIdAndUpdate(body.marketId, { $addToSet: { categoryId: id } }, { new: true })
      .then(success(res, 200))
      .catch(next)
}

export const index = ({ params, querymen: { query, select, cursor } }, res, next) => {
  Category
  .find(query, select, cursor)
  .populate('marketId', 'name')
  .then((result) => ({
      count: result.length,
      rows: result
  }))
  .then(success(res))
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
