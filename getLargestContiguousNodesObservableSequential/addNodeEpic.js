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
			.scannedIds
			.includes(node.id)
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
