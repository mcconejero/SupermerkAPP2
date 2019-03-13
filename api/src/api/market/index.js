import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Market, { schema } from './model'

const router = new Router()
const { name, category, latlong } = schema.tree

/**
 * @api {post} /markets Create market
 * @apiName CreateMarket
 * @apiGroup Market
 * @apiParam name Market's name.
 * @apiParam product Market's product.
 * @apiParam latlong Market's latlong.
 * @apiSuccess {Object} market Market's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Market not found.
 */
router.post('/',
  body({ name, category, latlong }),
  create)

/**
 * @api {get} /markets Retrieve markets
 * @apiName RetrieveMarkets
 * @apiGroup Market
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of markets.
 * @apiSuccess {Object[]} rows List of markets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /markets/:id Retrieve market
 * @apiName RetrieveMarket
 * @apiGroup Market
 * @apiSuccess {Object} market Market's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Market not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /markets/:id Update market
 * @apiName UpdateMarket
 * @apiGroup Market
 * @apiParam name Market's name.
 * @apiParam product Market's product.
 * @apiParam latlong Market's latlong.
 * @apiSuccess {Object} market Market's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Market not found.
 */
router.put('/:id',
  body({ name, category, latlong }),
  update)

/**
 * @api {delete} /markets/:id Delete market
 * @apiName DeleteMarket
 * @apiGroup Market
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Market not found.
 */
router.delete('/:id',
  destroy)

export default router
