import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Supermarket, { schema } from './model'

const router = new Router()
const { name, product, latlong } = schema.tree

/**
 * @api {post} /supermarkets Create supermarket
 * @apiName CreateSupermarket
 * @apiGroup Supermarket
 * @apiParam name Supermarket's name.
 * @apiParam product Supermarket's product.
 * @apiParam latlong Supermarket's latlong.
 * @apiSuccess {Object} supermarket Supermarket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supermarket not found.
 */
router.post('/',
  body({ name, product, latlong }),
  create)

/**
 * @api {get} /supermarkets Retrieve supermarkets
 * @apiName RetrieveSupermarkets
 * @apiGroup Supermarket
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of supermarkets.
 * @apiSuccess {Object[]} rows List of supermarkets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /supermarkets/:id Retrieve supermarket
 * @apiName RetrieveSupermarket
 * @apiGroup Supermarket
 * @apiSuccess {Object} supermarket Supermarket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supermarket not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /supermarkets/:id Update supermarket
 * @apiName UpdateSupermarket
 * @apiGroup Supermarket
 * @apiParam name Supermarket's name.
 * @apiParam product Supermarket's product.
 * @apiParam latlong Supermarket's latlong.
 * @apiSuccess {Object} supermarket Supermarket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Supermarket not found.
 */
router.put('/:id',
  body({ name, product, latlong }),
  update)

/**
 * @api {delete} /supermarkets/:id Delete supermarket
 * @apiName DeleteSupermarket
 * @apiGroup Supermarket
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Supermarket not found.
 */
router.delete('/:id',
  destroy)

export default router
