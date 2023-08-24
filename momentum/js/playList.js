const playList = [
	{
		title: 'Aqua Caelestis',
		src: 'assets/sounds/Aqua Caelestis.mp3',
		duration: '00:39',
	},

	{
		title: 'EnnioMorricone',
		src: 'assets/sounds/Ennio Morricone.mp3',
		duration: '01:37',
	},

	{
		title: 'RiverFlowsInYou',
		src: 'assets/sounds/River Flows In You.mp3',
		duration: '01:37'
	},

	{
		title: 'SummerWind',
		src: 'assets/sounds/Summer Wind.mp3',
		duration: '01:50'
	},

];

export default playList;






function strCount(obj) {
	let count = 0;

	for (var key in obj) {

		if (typeof obj[key] === 'string') count++;

		if (typeof obj[key] == 'object') count += strCount(obj[key]);

	}

	return count;

}