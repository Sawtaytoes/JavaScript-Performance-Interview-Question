const colors = require('./colors')

const addAdjacencies = (
	nodes,
) => (
	nodes
	.map(({
		colorId,
		id,
		x,
		y,
	}) => ({
		adjacentIds: (
			nodes
			.filter(({
				x: adjacentX,
				y: adjacentY,
			}) => (
				adjacentX === x + 1
				&& adjacentY === y
				|| (
					adjacentX === x - 1
					&& adjacentY === y
				)
				|| (
					adjacentX === x
					&& adjacentY === y + 1
				)
				|| (
					adjacentX === x
					&& adjacentY === y - 1
				)
			))
			.filter(({
				colorId: adjacentColorId,
			}) => (
				adjacentColorId
				=== colorId
			))
			.map(({
				id,
			}) => (
				id
			))
		),
		color: colors[colorId],
		id,
	}))
	.filter(({
		adjacentIds,
	}) => (
		adjacentIds
		.length > 0
	))
)

module.exports = addAdjacencies
