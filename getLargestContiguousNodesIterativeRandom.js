const getLargestContiguousNodesIterativeRandom = (
	nodes,
) => {
	let contiguousIds = []
	let largestContiguousIds = []
	let queuedIds = []
	let remainingNodesIndex = 0

	let remainingNodes = (
		nodes
		.slice()
	)

	while (remainingNodesIndex < remainingNodes.length) {
		const [node] = (
			remainingNodes
			.splice(
				remainingNodesIndex,
				1,
			)
		)

		const {
			adjacentIds,
			id,
		} = node

		contiguousIds
		.push(id)

		if (
			adjacentIds
			.length > 0
		) {
			queuedIds
			.push(...adjacentIds)
		}

		if (
			queuedIds
			.length > 0
		) {
			do {
				const queuedId = (
					queuedIds
					.shift()
				)

				remainingNodesIndex = (
					remainingNodes
					.findIndex(({
						id,
					}) => (
						id === queuedId
					))
				)
			}
			while (
				queuedIds.length > 0
				&& remainingNodesIndex === -1
			)
		}

		if (
			queuedIds
			.length === 0
			&& remainingNodesIndex === -1
		) {
			if (
				contiguousIds.length
				> largestContiguousIds.length
			) {
				largestContiguousIds = contiguousIds
			}

			contiguousIds = []
			remainingNodesIndex = 0

			if (
				remainingNodes
				.length === 0
			) {
				break
			}
		}
	}

	return largestContiguousIds
}

module.exports = getLargestContiguousNodesIterativeRandom
