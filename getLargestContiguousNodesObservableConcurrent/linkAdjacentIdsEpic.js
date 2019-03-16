const { concat, filter, map, mergeMap } = require('rxjs/operators')
const { from, of } = require('rxjs')

const { addNode, finishedLinkingNode, LINK_ADJACENT_IDS } = require('./actions')
const { ofType } = require('./reduxObservable')

const immediateLinkAdjacentIdsEpic = (
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
					filter((
						adjacentId,
					) => (
						!(
							state$
							.value
							.scannedIds
							.has(adjacentId)
						)
					)),
					map((
						adjacentId,
					) => (
						state$
						.value
						.nodes
						.find(({
							id,
						}) => (
							id === adjacentId
						))
					)),
					map(addNode),
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

module.exports = immediateLinkAdjacentIdsEpic
