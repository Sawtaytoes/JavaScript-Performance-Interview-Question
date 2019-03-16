const ADD_NEXT_NODE = 'ADD_NEXT_NODE'
const ADD_NODE = 'ADD_NODE'
const FINISHED_LINKING_NODE = 'FINISHED_LINKING_NODE'
const INITIALIZE_STATE = 'INITIALIZE_STATE'
const LINK_ADJACENT_IDS = 'LINK_ADJACENT_IDS'
const NODE_SCANNING_COMPLETE = 'NODE_SCANNING_COMPLETE'
const QUEUE_NODE = 'QUEUE_NODE'
const RESET_CONTIGUOUS_IDS = 'RESET_CONTIGUOUS_IDS'
const UPDATE_LARGEST_CONTIGUOUS_IDS = 'UPDATE_LARGEST_CONTIGUOUS_IDS'
const UPDATE_NODES = 'UPDATE_NODES'
const UPDATE_SCANNED_IDS = 'UPDATE_SCANNED_IDS'

const addNextNode = () => ({
	type: ADD_NEXT_NODE,
})

const addNode = (
	node,
) => ({
	node,
	type: ADD_NODE,
})

const addStartingNode = (
	node,
) => ({
	node,
	startingNode: true,
	type: ADD_NODE,
})

const finishedLinkingNode = () => ({
	type: FINISHED_LINKING_NODE,
})

const initializeState = () => ({
	type: INITIALIZE_STATE,
})

const linkAdjacentIds = ({
	adjacentIds,
}) => ({
	adjacentIds,
	type: LINK_ADJACENT_IDS,
})

const nodeScanningComplete = () => ({
	type: NODE_SCANNING_COMPLETE,
})

const queueNode = (
	node,
) => ({
	node,
	type: QUEUE_NODE,
})

const resetContiguousIds = () => ({
	type: RESET_CONTIGUOUS_IDS,
})

const updateLargestContiguousIds = (
	contiguousIds,
) => ({
	idsList: contiguousIds,
	type: UPDATE_LARGEST_CONTIGUOUS_IDS,
})

const updateNodes = (
	nodes,
) => ({
	nodes,
	type: UPDATE_NODES,
})

const updateScannedIds = (
	id,
) => ({
	id,
	type: UPDATE_SCANNED_IDS,
})

module.exports = {
	ADD_NEXT_NODE,
	ADD_NODE,
	addNextNode,
	addNode,
	addStartingNode,
	FINISHED_LINKING_NODE,
	finishedLinkingNode,
	INITIALIZE_STATE,
	initializeState,
	LINK_ADJACENT_IDS,
	linkAdjacentIds,
	NODE_SCANNING_COMPLETE,
	nodeScanningComplete,
	QUEUE_NODE,
	queueNode,
	RESET_CONTIGUOUS_IDS,
	resetContiguousIds,
	UPDATE_LARGEST_CONTIGUOUS_IDS,
	UPDATE_NODES,
	UPDATE_SCANNED_IDS,
	updateLargestContiguousIds,
	updateNodes,
	updateScannedIds,
}
