const { filter, ignoreElements, tap } = require('rxjs/operators')

const actionLoggerEpic = (
	action$
) => (
	action$
	.pipe(
		filter(action => {
			!action
			|| typeof action !== 'object'
			&& (
				console
				.error("Action must be an `object` type.")
			)

			return action
		}),
		filter(action => {
			!action.type
			&& (
				console
				.error("Action must have a `type` property.")
			)

			return action.type
		}),
		tap(({
			type,
			...payload
		}) => {
			console
			.info(
				type,
				payload,
			)
		}),
		ignoreElements(),
	)
)

module.exports = actionLoggerEpic
