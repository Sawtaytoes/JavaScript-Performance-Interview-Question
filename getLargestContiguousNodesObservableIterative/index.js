const { catchError, delay, tap } = require('rxjs/operators')
const { EMPTY, Subject } = require('rxjs')

// const actionLoggerEpic = require('./actionLoggerEpic')
const addNodeEpic = require('./addNodeEpic')
const addNodesEpic = require('./addNodesEpic')
const createStateEpic = require('./createStateEpic')
const largestContiguousIdsEpic = require('./largestContiguousIdsEpic')
const linkAdjacentIdsEpic = require('./linkAdjacentIdsEpic')
const queuedNodesEpic = require('./queuedNodesEpic')
const reducers = require('./reducers')
const timeTrackerEpic = require('./timeTrackerEpic')
const { action$, createRootEpic } = require('./reduxObservable')
const { addNextNode, initializeState, updateNodes } = require('./actions')

const getLargestContiguousNodesObservableIterative = (
	nodes,
) => {
	const rootEpic = (
		createRootEpic(
			// actionLoggerEpic,
			createStateEpic(reducers),

			addNodeEpic,
			addNodesEpic,
			largestContiguousIdsEpic,
			linkAdjacentIdsEpic,
			queuedNodesEpic,
			timeTrackerEpic,
		)
	)

	const subject = new Subject()

	rootEpic
	.pipe(
		delay(0),
		tap(({
			type,
		}) => (
			type === 'NODE_SCANNING_COMPLETE'
			&& setTimeout(() => subject.next())
		)),
		catchError((
			error,
		) => {
			console
			.error(error)

			return EMPTY
		}),
	)
	.subscribe(action$)

	action$
	.next(
		initializeState()
	)

	action$
	.next(
		updateNodes(
			nodes,
		)
	)

	action$
	.next(
		addNextNode()
	)

	return subject
}

module.exports = getLargestContiguousNodesObservableIterative
