const { concat, filter, map, mergeMap } = require('rxjs/operators')
const { from, of } = require('rxjs')

const { finishedLinkingNode, LINK_ADJACENT_IDS, queueNode } = require('./actions')
const { ofType } = require('./reduxObservable')

const linkAdjacentIdsEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(LINK_ADJACENT_IDS),
		mergeMap(({
			adjacentIds,
		}) => (
			adjacentIds
			? (
				from(adjacentIds)
				.pipe(
					map((
						adjacentId,
					) => (
						state$
						.value
						.remainingNodes
						.find(({
							id,
						}) => (
							id === adjacentId
						))
					)),
					filter(Boolean),
					map(queueNode),
					concat(
						of(finishedLinkingNode())
					),
				)
			)
			: (
				of(finishedLinkingNode())
			)
		)),
	)
)

module.exports = linkAdjacentIdsEpic
