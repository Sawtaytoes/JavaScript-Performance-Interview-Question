const addAdjacencies = require('./addAdjacencies')
const generateNodes = require('./generateNodes')
const getLargestContiguousNodesIterative = require('./getLargestContiguousNodesIterative')
const getLargestContiguousNodesObservableConcurrent = require('./getLargestContiguousNodesObservableConcurrent')
const getLargestContiguousNodesObservableIterative = require('./getLargestContiguousNodesObservableIterative')
const getLargestContiguousNodesObservableSequential = require('./getLargestContiguousNodesObservableSequential')
const getLargestContiguousNodesRecursive = require('./getLargestContiguousNodesRecursive')
const getLargestContiguousNodesSequentialIterative = require('./getLargestContiguousNodesSequentialIterative')

const nodes = (
	addAdjacencies(
		generateNodes({
			numberOfColumns: 100,
			numberOfRows: 100,
		})
	)
)

// console.log(nodes)

console.time('Recursive')
const largestContiguousNodesRecursive = (
	getLargestContiguousNodesRecursive(
		nodes,
	)
)
console.timeEnd('Recursive')
console.log('length', largestContiguousNodesRecursive.length || 1)

console.time('Iterative')
const largestContiguousNodesIterative = (
	getLargestContiguousNodesIterative(
		nodes,
	)
)
console.timeEnd('Iterative')
console.log('length', largestContiguousNodesIterative.length || 1)

console.time('Sequential Iterative')
const largestContiguousNodesSequentialIterative = (
	getLargestContiguousNodesSequentialIterative(
		nodes,
	)
)
console.timeEnd('Sequential Iterative')
console.log('size', largestContiguousNodesSequentialIterative.size || 1)

getLargestContiguousNodesObservableSequential(
	nodes,
)
.subscribe(() => {
	getLargestContiguousNodesObservableIterative(
		nodes,
	)
	.subscribe(() => {
		getLargestContiguousNodesObservableConcurrent(
			nodes,
		)
	})
})
