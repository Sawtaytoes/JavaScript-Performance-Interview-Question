const { filter, mergeMap } = require('rxjs/operators')
const { BehaviorSubject, from, pipe, Subject } = require('rxjs')

const action$ = new Subject()
const state$ = new BehaviorSubject({})

const createRootEpic = (
	...epics
) => (
	from(epics)
	.pipe(
		mergeMap(epic => (
			epic(
				action$,
				state$,
			)
		)),
	)
)

const ofType = (
	...requiredTypes
) => (
	pipe(
		filter(Boolean),
		filter(action => (
			action
			.type
		)),
		filter(({ type }) => (
			requiredTypes
			.includes(type)
		)),
	)
)

module.exports = {
	action$,
	createRootEpic,
	ofType,
	state$,
}
