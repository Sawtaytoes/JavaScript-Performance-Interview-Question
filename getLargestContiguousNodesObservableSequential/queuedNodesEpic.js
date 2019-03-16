const { map } = require('rxjs/operators')

const { addNode, addNextNode, FINISHED_LINKING_NODE } = require('./actions')
const { ofType } = require('./reduxObservable')

const queuedNodesEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(FINISHED_LINKING_NODE),
		map(() => (
			state$
			.value
			.queuedNodes[0]
		)),
		map(node => (
			node
			? addNode(node)
			: addNextNode()
		)),
	)
)

module.exports = queuedNodesEpic
