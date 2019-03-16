const { filter, map, mapTo, scan, tap } = require('rxjs/operators')
const { merge } = require('rxjs')

const { ADD_NODE, addNextNode, FINISHED_LINKING_NODE } = require('./actions')
const { ofType } = require('./reduxObservable')

const countReducer = (
	count,
	value,
) => (
	count
	+ value
)

const addNextNodeEpic = (
	action$,
) => (
	merge(
		(
			action$
			.pipe(
				ofType(ADD_NODE),
				mapTo(1),
			)
		),
		(
			action$
			.pipe(
				ofType(FINISHED_LINKING_NODE),
				mapTo(-1),
			)
		),
	)
	.pipe(
		scan(
			countReducer,
			0,
		),
		filter(numberOfProcessingLinks => (
			numberOfProcessingLinks === 0
		)),
		map(addNextNode),
	)
)

module.exports = addNextNodeEpic
