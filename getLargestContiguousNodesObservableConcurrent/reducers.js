const { ADD_NODE, INITIALIZE_STATE, QUEUE_NODE, RESET_CONTIGUOUS_IDS, UPDATE_LARGEST_CONTIGUOUS_IDS, UPDATE_NODES, UPDATE_SCANNED_IDS } = require('./actions')

const idListReducer = (
	idList = new Set(),
	{ id },
) => (
	id !== undefined
	? (
		idList
		.add(id)
	)
	: idList
)

const largestIdsListReducer = (
	largestIdsList = new Set(),
	{ idsList = new Set() },
) => (
	largestIdsList.size
	> idsList.size
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
]

module.exports = reducers
