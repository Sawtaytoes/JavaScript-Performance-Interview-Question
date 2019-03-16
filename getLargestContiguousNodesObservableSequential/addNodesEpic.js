const { distinctUntilChanged, filter, map, pluck, scan, switchMap, takeUntil, tap } = require('rxjs/operators')
const { merge, of } = require('rxjs')

const { ADD_NEXT_NODE, addNextNode, addStartingNode, NODE_SCANNING_COMPLETE, nodeScanningComplete } = require('./actions')
const { ofType } = require('./reduxObservable')

const countReducer = (
	count,
) => (
	count + 1
)

const addNodesEpic = (
	action$,
	state$,
) => (
	state$
	.pipe(
		pluck('nodes'),
		filter(Boolean),
		filter((
			nodes,
		) => (
			nodes
			.length > 0
		)),
		distinctUntilChanged(),
		switchMap((
			nodes,
		) => (
			merge(
				(
					action$
					.pipe(
						ofType(ADD_NEXT_NODE),
						takeUntil(
							action$
							.pipe(
								ofType(NODE_SCANNING_COMPLETE)
							)
						)
					)
				),
				(
					of(null)
				),
			)
			.pipe(
				scan(
					countReducer,
					-1,
				),
				map((
					count,
				) => (
					nodes[count]
				)),
			)
		)),
		map((
			node,
		) => (
			node
			? (
				node
				.adjacentIds
				.length > 0
				? (
					addStartingNode(
						node,
					)
				)
				: addNextNode()
			)
			: nodeScanningComplete()
		)),
	)
)

module.exports = addNodesEpic
