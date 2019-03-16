const { switchMap } = require('rxjs/operators')

const { ADD_NODE, finishedLinkingNode, linkAdjacentIds, updateScannedIds } = require('./actions')
const { ofType } = require('./reduxObservable')

const addNodeEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(ADD_NODE),
		switchMap(({
			node,
		}) => (
			state$
			.value
			.remainingNodes
			.includes(node)
			? [
				(
					updateScannedIds(
						node
						.id
					)
				),
				(
					linkAdjacentIds(
						node
					)
				),
			]
			: [finishedLinkingNode()]
		)),
	)
)

module.exports = addNodeEpic
