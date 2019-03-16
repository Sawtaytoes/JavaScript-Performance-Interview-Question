const { distinctUntilChanged, ignoreElements, map, mergeMap, scan, tap } = require('rxjs/operators')
const { from } = require('rxjs')

const combineStates = (
	prevState,
	nextState,
) => ({
	...prevState,
	...nextState,
})

const createStateEpic = (
	reducers,
) => (
	action$,
	state$,
) => (
	from(reducers)
	.pipe(
		mergeMap(({
			namespace,
			reducer,
		}) => (
			action$
			.pipe(
				scan(
					reducer,
					undefined,
				),
				distinctUntilChanged(),
				map((
					state,
				) => ({
					[namespace]: state,
				}))
			)
		)),
		scan(combineStates),
		// tap(nextState => (
		// 	console
		// 	.log({nextState})
		// )),
		tap(nextState => (
			state$
			.next(nextState)
		)),
		ignoreElements(),
	)
)

module.exports = createStateEpic
