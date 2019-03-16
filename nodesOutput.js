const addAdjacencies = require('./addAdjacencies')
const generateNodes = require('./generateNodes')

const nodes = (
	addAdjacencies(
		generateNodes({
			numberOfColumns: 2,
			numberOfRows: 2,
		})
	)
)

console.log(nodes)
