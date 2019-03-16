const { mergeMap } = require('rxjs/operators')

const { ADD_NEXT_NODE, resetContiguousIds, updateLargestContiguousIds } = require('./actions')
const { ofType } = require('./reduxObservable')

const largestContiguousIdsEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(ADD_NEXT_NODE),
		mergeMap(() => ([
			(
				updateLargestContiguousIds(
					state$
					.value
					.contiguousIds
				)
			),
			(
				resetContiguousIds()
			),
		])),
	)
)

module.exports = largestContiguousIdsEpic
