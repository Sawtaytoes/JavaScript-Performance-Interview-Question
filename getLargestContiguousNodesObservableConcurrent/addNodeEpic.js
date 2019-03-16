const { mergeMap } = require('rxjs/operators')

const { ADD_NODE, finishedLinkingNode, linkAdjacentIds, updateScannedIds } = require('./actions')
const { ofType } = require('./reduxObservable')

const addNodeEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(ADD_NODE),
		mergeMap(({
			node,
		}) => (
			state$
			.value
			.scannedIds
			.has(node.id)
			? [finishedLinkingNode()]
			: [
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
		)),
	)
)

module.exports = addNodeEpic
