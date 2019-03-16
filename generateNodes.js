const generateNodes = ({
	numberOfColumns,
	numberOfRows,
}) => (
	Array(
		numberOfColumns
		* numberOfRows
	)
	.fill()
	.map((
		item,
		index,
	) => ({
		colorId: (
			Math
			.floor(
				Math.random() * 3
			)
		),
		id: index,
		x: index % numberOfColumns,
		y: Math.floor(index / numberOfColumns),
	}))
)

module.exports = generateNodes
