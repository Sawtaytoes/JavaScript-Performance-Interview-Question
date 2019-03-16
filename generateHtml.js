const colors = require('./colors')
const generateNodes = require('./generateNodes')

const size = 100

console
.log(`
	<div>
		${
			generateNodes({
				numberOfColumns: 10,
				numberOfRows: 12,
			})
			.map(({ colorId, x, y }) => (`
				<div style="
					background-color: ${colors[colorId]};
					height: ${(size / 1.5) - 1}px;
					left: ${x * size}px;
					position: absolute;
					top: ${y * (size / 1.5)}px;
					width: ${size - 1}px;
				">
				</div>
			`))
			.reduce((
				combined,
				elementString,
			) => (
				combined
				.concat(elementString)
			))
		}
	</div>
`)
