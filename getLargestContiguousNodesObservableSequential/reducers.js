const { ADD_NODE, INITIALIZE_STATE, QUEUE_NODE, RESET_CONTIGUOUS_IDS, UPDATE_LARGEST_CONTIGUOUS_IDS, UPDATE_NODES, UPDATE_SCANNED_IDS } = require('./actions')

const idListReducer = (
	idList = [],
	{ id },
) => (
	id !== undefined
	? (
		idList
		.concat(id)
	)
	: idList
)

const nodeListReducer = (
	nodeList = [],
	{ node },
) => (
	node
	? (
		nodeList
		.concat(node)
	)
	: nodeList
)

const queueRemovalReducer = (
	queueItems = [],
	{ node },
) => (
	queueItems
	.filter((
		queueItem,
	) => (
		queueItem !== node
	))
)

const largestIdsListReducer = (
	largestIdsList = [],
	{ idsList = [] },
) => (
	largestIdsList.length
	> idsList.length
	? largestIdsList
	: idsList
)

const nodesReducer = (
	prevState,
	{ nodes = [] },
) => (
	nodes
)

const createActionReducer = ({
	actionType,
	reducer,
}) => (
	prevState,
	action,
) => (
	actionType
	.includes(
		action
		.type
	)
	? (
		reducer(
			prevState,
			action,
		)
	)
	: (
		action.type === INITIALIZE_STATE
		? reducer(undefined, {})
		: prevState
	)
)

const createQueueRemovalReducer = ({
	actionType,
	reducer,
}) => (
	prevState,
	action,
) => (
	action.type === actionType
	? (
		queueRemovalReducer(
			prevState,
			action,
		)
	)
	: (
		reducer(
			prevState,
			action,
		)
	)
)

const createResetReducer = ({
	actionType,
	reducer,
}) => (
	prevState,
	action,
) => (
	action.type === actionType
	? reducer(undefined, {})
	: (
		reducer(
			prevState,
			action,
		)
	)
)

const reducers = [
	{
		namespace: 'contiguousIds',
		reducer: (
			createResetReducer({
				actionType: RESET_CONTIGUOUS_IDS,
				reducer: (
					createActionReducer({
						actionType: UPDATE_SCANNED_IDS,
						reducer: idListReducer,
					})
				),
			})
		),
	},
	{
		namespace: 'largestContiguousIds',
		reducer: (
			createActionReducer({
				actionType: UPDATE_LARGEST_CONTIGUOUS_IDS,
				reducer: largestIdsListReducer,
			})
		),
	},
	{
		namespace: 'nodes',
		reducer: (
			createActionReducer({
				actionType: UPDATE_NODES,
				reducer: nodesReducer,
			})
		),
	},
	{
		namespace: 'scannedIds',
		reducer: (
			createActionReducer({
				actionType: UPDATE_SCANNED_IDS,
				reducer: idListReducer,
			})
		),
	},
	{
		namespace: 'queuedNodes',
		reducer: (
			createQueueRemovalReducer({
				actionType: ADD_NODE,
				reducer: (
					createActionReducer({
						actionType: QUEUE_NODE,
						reducer: nodeListReducer,
					})
				),
			})
		),
	},
]

module.exports = reducers
