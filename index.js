const addAdjacencies = require('./addAdjacencies')
const generateNodes = require('./generateNodes')
const getLargestContiguousNodesIterativeRandom = require('./getLargestContiguousNodesIterativeRandom')
const getLargestContiguousNodesIterativeSequential = require('./getLargestContiguousNodesIterativeSequential')
const getLargestContiguousNodesObservableConcurrent = require('./getLargestContiguousNodesObservableConcurrent')
const getLargestContiguousNodesObservableIterative = require('./getLargestContiguousNodesObservableIterative')
const getLargestContiguousNodesObservableRandom = require('./getLargestContiguousNodesObservableRandom')
const getLargestContiguousNodesRecursive = require('./getLargestContiguousNodesRecursive')

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
	getLargestContiguousNodesIterativeRandom(
		nodes,
	)
)
console.timeEnd('Iterative')
console.log('length', largestContiguousNodesIterative.length || 1)

console.time('Sequential Iterative')
const largestContiguousNodesSequentialIterative = (
	getLargestContiguousNodesIterativeSequential(
		nodes,
	)
)
console.timeEnd('Sequential Iterative')
console.log('size', largestContiguousNodesSequentialIterative.size || 1)

getLargestContiguousNodesObservableRandom(
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
