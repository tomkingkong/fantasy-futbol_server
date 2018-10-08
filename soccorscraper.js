const Nightmare = require('nightmare')
const nightmare = Nightmare({
	show: true
})
const fs = require('file-system')


nightmare
	.goto('https://en.wikipedia.org/wiki/2018_FIFA_World_Cup_squads')
	.wait(500)
	.evaluate(() => {
		const datas = [...document.querySelectorAll('h3')]

		const results = datas.map(data => {
			let countryName = data.querySelector('.mw-body-content')
			// let price = data.querySelector('.currency-value').innerText
			return {
				countryName
			}
		})
		return results
	})

	.end()
	.then(result => {
		fs.writeFile('./countryNames.js', JSON.stringify(result), function (err) {})
		console.log('worked')
	})
	.catch(error => {
		console.error('Search failed:', error)
	})