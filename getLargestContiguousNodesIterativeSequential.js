const getLargestContiguousNodesIterativeSequential = (
	nodes,
) => (
	nodes
	.reduce(
		(
			contiguousIdsList,
			{
				adjacentIds,
				id,
			},
		) => {
			const linkedContiguousIds = (
				contiguousIdsList
				.reduce(
					(
						linkedContiguousIds,
						contiguousIds,
					) => (
						contiguousIds
						.has(id)
						? (
							linkedContiguousIds
							.add(contiguousIds)
						)
						: linkedContiguousIds
					),
					new Set(),
				)
			)

			return (
				linkedContiguousIds
				.size > 0
				? (
					contiguousIdsList
					.filter((
						contiguousIds,
					) => (
						!(
							linkedContiguousIds
							.has(contiguousIds)
						)
					))
					.concat(
						Array
						.from(linkedContiguousIds)
						.reduce(
							(
								linkedContiguousIds,
								contiguousIds,
							) => (
								new Set([
									...linkedContiguousIds,
									...contiguousIds,
								])
							),
							new Set(adjacentIds),
						)
					)
				)
				: (
					contiguousIdsList
					.concat(
						new Set([
							...adjacentIds,
							id,
						])
					)
				)
			)
		},
		[new Set()],
	)
	.reduce((
		largestContiguousIds = [],
		contiguousIds,
	) => (
		contiguousIds.size
		> largestContiguousIds.size
		? contiguousIds
		: largestContiguousIds
	))
)

module.exports = getLargestContiguousNodesIterativeSequential


// reduce, add ID to array. If you're nearby any ids that are already listed, then add your ID to that array.
// It might be that ID 1 and ID 234 are linked. Those won't be brought together until there's an item that exists in more than one contiguousIdsList. This will require `filter` instead of `find` which slows down our overall lookups :/. It could be that we have one item in 3 or even 4 lists as well so `filter` is more important.
