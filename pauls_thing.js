// const playersList = JSON.parse(fs.readFileSync('./data/players.json'));
	// const participatingPlayers = playersList.reduce((players, player) => {
	//   countries.forEach(country => {
	//     if (country.name === player.Nationality) {
	//       players.push(player);
	//     }
	//   });
	//   return players;
	// }, []);
	// const keys = Object.keys(participatingPlayers[0]).map(key =>
	//   key.replace(/ /g, '_')
	// );
	// let newList = [];
	// for (let player in participatingPlayers) {
	//   var newPlayers = {};
	//   for (let key in keys) {
	//     newPlayers[keys[key]] =
	//       participatingPlayers[player][
	//         Object.keys(participatingPlayers[player])[key]
	//       ];
	//   }
	//   newList.push(newPlayers);
	// }
	// let actualKeys = [
	//   'Name',
	//   'Age',
	//   'Photo',
	//   'Nationality',
	//   'Club',
	//   'Overall',
	//   'Potential',
	//   'Value',
	//   'Wage',
	//   'Acceleration',
	//   'Aggression',
	//   'Agility',
	//   'Balance',
	//   'Ball_control',
	//   'Composure',
	//   'Crossing',
	//   'Curve',
	//   'Dribbling',
	//   'Finishing',
	//   'Free_kick_accuracy',
	//   'GK_diving',
	//   'GK_handling',
	//   'GK_kicking',
	//   'GK_positioning',
	//   'GK_reflexes',
	//   'Heading_accuracy',
	//   'Interceptions',
	//   'Jumping',
	//   'Long_passing',
	//   'Long_shots',
	//   'Marking',
	//   'Penalties',
	//   'Positioning',
	//   'Reactions',
	//   'Short_passing',
	//   'Shot_power',
	//   'Sliding_tackle',
	//   'Sprint_speed',
	//   'Stamina',
	//   'Standing_tackle',
	//   'Strength',
	//   'Vision',
	//   'Volleys',
	//   'Preferred_Positions'
	// ];
	// const players = newList.map(res => {
	//   let obj = {};
	//   actualKeys.forEach(key => {
	//     if (res[key]) {
	//       obj[key] = res[key];
	//     }
	//   });
	//   obj['Positions'] = obj.Preferred_Positions;
	//   delete obj.Preferred_Positions;
	//   return obj;
	// });
	// console.log(players);
	// fs.writeFileSync(
	//   './data/scrapedPlayers.json',
	//   JSON.stringify(players, null, 4),
	//   function(err) {}
	// );