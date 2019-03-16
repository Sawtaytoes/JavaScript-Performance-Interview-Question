const getContiguousIds = ({
	contiguousIds = [],
	node,
	nodes,
}) => (
	node
	.adjacentIds
	.reduce(
		(
			contiguousIds,
			adjacentId,
		) => (
			contiguousIds
			.includes(adjacentId)
			? contiguousIds
			: (
				getContiguousIds({
					contiguousIds,
					node: (
						nodes
						.find(({
							id,
						}) => (
							id
							=== adjacentId
						))
					),
					nodes,
				})
			)
		),
		(
			contiguousIds
			.concat(
				node
				.id
			)
		),
	)
)

const getLargestContiguousNodesRecursive = (
	nodes,
) => (
	nodes
	.reduce(
		(
			prevState,
			node,
		) => {
			if (
				prevState
				.scannedIds
				.includes(node.id)
			) {
				return prevState
			}

			const contiguousIds = (
				getContiguousIds({
					node,
					nodes,
				})
			)

			const {
				largestContiguousIds,
				scannedIds,
			} = prevState

			return {
				largestContiguousIds: (
					contiguousIds.length
					> largestContiguousIds.length
					? contiguousIds
					: largestContiguousIds
				),
				scannedIds: (
					scannedIds
					.concat(contiguousIds)
				),
			}
		},
		{
			largestContiguousIds: [],
			scannedIds: [],
		},
	)
	.largestContiguousIds
)


module.exports = getLargestContiguousNodesRecursive
