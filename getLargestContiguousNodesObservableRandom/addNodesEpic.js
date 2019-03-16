const { distinctUntilChanged, filter, map, pluck, switchMap, takeUntil } = require('rxjs/operators')

const { ADD_NEXT_NODE, addNextNode, addStartingNode, NODE_SCANNING_COMPLETE, nodeScanningComplete } = require('./actions')
const { ofType } = require('./reduxObservable')

const addNodesEpic = (
	action$,
	state$,
) => (
	state$
	.pipe(
		pluck('remainingNodes'),
		filter(Boolean),
		distinctUntilChanged(),
		switchMap((
			remainingNodes,
		) => (
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
			.pipe(
				map(() => (
					remainingNodes[0]
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
