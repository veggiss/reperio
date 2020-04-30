import db_finn_ordet from "./finn-ordet.json";
import db_ord_deling from "./ord-deling.json";
import db_sant_usant from "./sant-usant.json";
import db_finn_bildet from "./finn-bildet.json";

export let PLAYER_STATS = JSON.parse(localStorage.getItem('PLAYER_STATS')) || {
	level: 1,
	current_xp: 0,
	from_xp: 0,
	target_xp: 200,
	add_target_xp: 50,
	stats: {
		verb: 1.5,
		adjektiv: 1.5,
		substantiv: 1.5,
		benevning: 1.5,
		semantikk: 1.5,
		hurtighet: 1.5,
		auditiv: 1.5
	}
};

export const STATS_LIST = {
	verb: {
		text: 'Verb',
		hex: '#CDB2AB',
		color: 'quinary',
		icon: 'book-outline'
	},
	adjektiv: {
		text: 'Adjektiv',
		hex: '#CDB2AB',
		color: 'quinary',
		icon: 'book-outline'
	},
	substantiv: {
		text: 'Substantiv',
		hex: '#CDB2AB',
		color: 'quinary',
		icon: 'book-outline'
	},
	benevning: {
		text: 'Benevning',
		hex: '#EA526F',
		color: 'secondary',
		icon: 'image-outline'
	},
	semantikk: {
		text: 'Semantikk',
		hex: '#a559f9',
		color: 'quaternary',
		icon: 'share-social-outline'
	},
	hurtighet: {
		text: 'Hurtighet',
		hex: '#FF8A5B',
		color: 'tertiary',
		icon: 'flash-outline'
	},
	auditiv: {
		text: 'Auditiv Forståelse',
		hex: '#f9db64',
		color: 'favorite',
		icon: 'ear-outline'
	}
};

export const STATS_AVERAGE = {
	lese: ['verb', 'adjektiv', 'substantiv'],
	forsoelse: ['semantikk', 'benevning', 'auditiv', 'hurtighet']
};

export const GAMES_LIST = [{
	id: 1,
	category: 1,
	title: 'Finn Ordet',
	icon: 'book',
	soundKey: 'finn_ordet',
	soundSrc: '../../../../assets/audio/finn_ordet.mp3',
	description: 'I dette spillet skal du se på bildet. Les så alle tekstboksene og trykk på alternativet som passer til bildet. Du har 30 sekunder på å svare på hver oppgave.',
	purpose: 'Å undersøke en persons leksikalske semantikk, altså forståelse av ord, ved hjelp av sammensetning av skrevet ord og visuelt bilde.',
	thumbnail: './assets/img/finn-ordet-thumb.png'
}, {
	id: 2,
	category: 2,
	title: 'Par-Ord',
	icon: 'share-social',
	soundKey: 'par_ord',
	soundSrc: '../../../../assets/audio/par_ord.mp3',
	description: 'I dette spillet ser du tekstbokser, på venstre og høyre side. Noen av disse ordene passer sammen som synonymer. Trykk på de ordene du tror er riktige. Du har 30 sekunder på å svare på hver oppgave. Husk, flere alternativer kan være riktige.',
	purpose: 'Å undersøke en persons forståelse av semantiske relasjoner mellom parord.',
	thumbnail: './assets/img/ord-par-thumb.png'
}, {
	id: 3,
	category: 1,
	title: 'Sant & Usant',
	icon: 'share-social',
	soundKey: 'sant_usant',
	soundSrc: '../../../../assets/audio/sant_usant.mp3',
	description: 'I dette spillet skal se du nøye på bildet og lese tilhørende tekst. Er du enig at teksten passer bildet. Trykker du tommel opp. Er du uenig trykker du tommel ned.',
	purpose: 'Å undersøke en persons forståelse av setningssemantikk ved bruk av setninger og bilder.',
	thumbnail: './assets/img/sant-usant-thumb.png'
}, {
	id: 4,
	category: 1,
	title: 'Finn Bildet',
	icon: 'ear',
	soundKey: 'finn_bildet',
	soundSrc: '../../../../assets/audio/finn_bildet.mp3',
	description: 'I dette spillet skal du trykke på lytte-knappen. Lytt så til ordene som blir sagt. Se på alle bildene og trykk på bilde som passer utsagnet. Du har 30 sekunder på å svare på hver oppgave.',
	purpose: 'Å undersøke en persons auditiv forståelse ved hjelp av sammensetning av talt ord og bilde.',
	thumbnail: './assets/img/finn-bildet-thumb.png'
}];

export const GAME_HISTORY = JSON.parse(localStorage.getItem('GAME_HISTORY')) || {
	1: [],
	2: [],
	3: [],
	4: []
};

export const HIGHSCORES = JSON.parse(localStorage.getItem('highscores')) || {
	1: [0, 0, 0],
	2: [0, 0, 0],
	3: [0, 0, 0],
	4: [0, 0, 0]
};

export const DIFFICULTY = JSON.parse(localStorage.getItem('DIFFICULTY')) || {
	1: 1.0,
	2: 1.0,
	3: 1.0,
	4: 1.0
};

export const getUserGuid = () => localStorage.getItem('USER_GUID');

export const setUserGuid = key => localStorage.setItem('USER_GUID', key);

export const getReperioRate = () => {
	let stats = Object.values(PLAYER_STATS.stats);
	let sum = <number> stats.reduce((a: number, b: number) => a + b);
	
	return Math.round(convertToSingleDecimal(sum / stats.length) * 10) / 10;
};

export const convertToPercent = (high: number, low: number, value: number) => {
	return value ? Math.round(((value - low) / (high - low)) * 100) : 0;
};

export const getDifficultyPercent = (id:number) => {
	return convertToPercent(3, 1, DIFFICULTY[id]);
};

export const getStatPercent = (stat:string) => {
	return convertToPercent(3, 1, PLAYER_STATS.stats[stat]);
};

export const getAveragePercent = (stats) => {
	let list = stats.map(stat => getStatPercent(stat));	
	return Math.round(list.reduce((n, v) => n + v) / stats.length);
};

export const getGame = (id:number) => GAMES_LIST.filter(e => e.id === id);

export const getTimeBonus = (timeStamp, maxTimeTaken) => {
	let timeTaken = (Date.now() - timeStamp) / 1000;
	return Math.round(timeTaken < maxTimeTaken ? maxTimeTaken - timeTaken : 0);
};

export const getStatPoint = difficulty => {
	return difficulty / 30;
};

export const addRoundStats = (statsPoints, stat, difficulty, answeredCorrect) => {
	if (Object.keys(STATS_LIST).includes(stat)) {
		if (!statsPoints[stat]) statsPoints[stat] = 0;
		
		if (stat == 'hurtighet') {
			statsPoints[stat] += getTimeStat(difficulty);
		} else {
			if (answeredCorrect) statsPoints[stat] += getStatPoint(difficulty);
			else statsPoints[stat] -= getStatPoint(difficulty);
		}
	} else {
		console.log("Could not add round stat! Stat: '" + stat + "', is not a valid stat.");
	}
};

export const getTimeStat = time => {
	let timeStat = 0;
	
	if (time > 28) {
		timeStat = getStatPoint(3);
	} else if (time > 26) {
		timeStat = getStatPoint(2);
	} else if (time > 24) {
		timeStat = getStatPoint(1);
	} else if (time > 18) {
		timeStat = -(getStatPoint(1));
	} else if (time > 16) {
		timeStat = -(getStatPoint(2));
	} else if (time > 14) {
		timeStat = -(getStatPoint(3));
	}
	
	return timeStat;
};

export const addPlayerStats = (stat, value) => {
	if (value > 0.3) value = 0.3;
	else if (value < -0.3) value = -0.3;

	PLAYER_STATS.stats[stat] += convertToSingleDecimal(value);
	
	if (PLAYER_STATS.stats[stat] > 3) PLAYER_STATS.stats[stat] = 3;
	else if (PLAYER_STATS.stats[stat] < 1) PLAYER_STATS.stats[stat] = 1;
};

export const addXp = (category:string, points:number) => {
	let leveledUp = {
		main: false,
		category: false,
		categoryType: category
	};
	
	PLAYER_STATS.current_xp += points;
		
	if (PLAYER_STATS.current_xp >= PLAYER_STATS.target_xp) {
		let lastTargetXp = PLAYER_STATS.target_xp;

		PLAYER_STATS.level++;
		PLAYER_STATS.current_xp -= PLAYER_STATS.target_xp;
		PLAYER_STATS.target_xp += PLAYER_STATS.add_target_xp;
		PLAYER_STATS.from_xp = lastTargetXp;
	}

	localStorage.setItem('PLAYER_STATS', JSON.stringify(PLAYER_STATS));
	
	return leveledUp;
};

export const addGameHistory = (data) => {
	if (GAME_HISTORY[data.id]) {
		if (GAME_HISTORY[data.id].length > 100) GAME_HISTORY[data.id].shift();

		GAME_HISTORY[data.id].push({
			date: Date.now(),
			data: data
		});

		localStorage.setItem('GAME_HISTORY', JSON.stringify(GAME_HISTORY));
	} else {
		console.log("Can't add game history, '" + data.id + "' is an invalid gameid");
	}
};

export const addToHighscores = (score, id) => {	
	if (HIGHSCORES[id]) {
		for (let i = 0; i < HIGHSCORES[id].length; i++) {
			if (score > HIGHSCORES[id][i]) {
				let oldHighscores = [...HIGHSCORES[id]];
				
				for (let j = i + 1; j < HIGHSCORES[id].length; j++) {
					HIGHSCORES[id][j] = oldHighscores[j - 1];
				}

				HIGHSCORES[id][i] = score;
				localStorage.setItem('highscores', JSON.stringify(HIGHSCORES));
				
				return i;
			}
		}
	} else {
		console.log("Highscores: Invalid ID");
	}
};

export const correctDifficulty = (correctAnswers, rounds, category, points, gameId) => {
	let difficulty = DIFFICULTY[gameId];
	
	if (difficulty) {
		let winRate:number = (correctAnswers/rounds) * 100;
		
		if (winRate <= 10) {
			difficulty -= 0.3;
		} else if (winRate > 10 && winRate <= 25) {
			difficulty -= 0.2;
		} else if (winRate > 25 && winRate <= 50) {
			difficulty -= 0.1;
		} else if (winRate > 50 && winRate <= 75) {
			difficulty += 0.1;
		} else if (winRate > 75 && winRate <= 90) {
			difficulty += 0.2;
		} else if (winRate > 90) {
			difficulty += 0.3;
		}
		
		if (difficulty < 1) difficulty = 1.0;
		else if (difficulty > 3) difficulty = 3.0;

		DIFFICULTY[gameId] = convertToSingleDecimal(difficulty);
		localStorage.setItem('DIFFICULTY', JSON.stringify(DIFFICULTY));
		return addXp(category, points);
	}
};

export const convertToSingleDecimal = value => {
	return (Math.round(value * 10) / 10);
};

export const shuffle = array => {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

export const getRoundData = (db: any, complexRate: number, rounds: number, sortingFunc: Function) => {
	let database = [...db];
	let complexity;
	let list = [];

	for (let i = 0; i < rounds; i++) {
		if (i < Math.round((complexRate % 1) * rounds)) {
			complexity = Math.ceil(complexRate);
		} else {
			complexity = Math.floor(complexRate);
		}

		let data = sortingFunc(database, complexity, i);
		
		if (data) list.push(data);
	}

	return shuffle(list);
};

export const getFinnBildetData = (complexRate: number, rounds: number) => {
	let list = [];

	getRoundData(db_finn_bildet, complexRate, rounds, (database, complexity) => {
		let sorted = database.filter(e => e.complexity === complexity);
		let answer = sorted[Math.floor(Math.random() * sorted.length)];
		let alternatives = [];
		
		if (answer) {
			database.splice(database.indexOf(answer), 1);
			
			alternatives.push({
				src: answer.category + '/' + answer.src,
				text: answer.answer,
				answer: true
			});
		}
		
		for (let i = 0; i < 3; i++) {
			let data = database[Math.floor(Math.random() * sorted.length)];

			if (data) {
				database.splice(database.indexOf(data), 1);
				
				alternatives.push({
					src: data.category + '/' + data.src,
					text: data.answer,
					answer: false
				});
			}
		}
		
		if (answer) {
			return {
				answer: answer.answer,
				stats: answer.stats,
				audioSrc: answer.audio,
				difficulty: answer.complexity,
				alternatives: shuffle(alternatives)
			}
		}
	}).forEach(data => list.push(data));

	return shuffle(list);
};

export const getFinnOrdetData = (complexRate: number, rounds: number) => {
	let list = [];

	getRoundData(db_finn_ordet, complexRate, rounds, (database, complexity) => {
		let sorted = database.filter(e => e.complexity === complexity);
		let data = sorted[Math.floor(Math.random() * sorted.length)];

		if (data) {
			database.splice(database.indexOf(data), 1);
			return data;
		}
	}).forEach(data => {
		list.push({
			difficulty: data.complexity,
			stats: data.stats,
			src: data.category + '/' + data.src,
			alternatives: shuffle([data.answer, ...(shuffle(data.alternatives)).slice(0, 3)]),
			answer: data.answer
		})
	});
	
	return shuffle(list);
};

export const getOrddelingData = (complexRate: number, rounds: number) => {
	let list = [];

	getRoundData(db_ord_deling, complexRate, rounds, (database, complexity) => {
		let wrongPairLeft = database[Math.floor(Math.random() * database.length)];
		database.splice(database.indexOf(wrongPairLeft), 1);

		let wrongPairRight = database[Math.floor(Math.random() * database.length)];
		database.splice(database.indexOf(wrongPairRight), 1);

		let sortedByTypes = [database.filter(e => e.type === 'HB'), database.filter(e => e.type === 'MB'), database.filter(e => e.type === 'LB')];

		let data = {
			difficulty: complexity,
			correctPairs: [],
			alternatives: {
				left: [wrongPairLeft.answer[Math.round(Math.random())]],
				right: [wrongPairRight.answer[Math.round(Math.random())]]
			}
		};

		for (let i = 0; i < complexity; i++) {
			let sortedByType = sortedByTypes[i];
			let item = sortedByType[Math.floor(Math.random() * sortedByType.length)];

			if (item) {
				database.splice(database.indexOf(item), 1);
				let pair = shuffle(item.answer);

				data.correctPairs.push(pair[0] + '-' + pair[1]);
				data.alternatives.left.push(pair[0]);
				data.alternatives.right.push(pair[1]);
			}
		}

		data.alternatives.left = shuffle(data.alternatives.left);
		data.alternatives.right = shuffle(data.alternatives.right);

		return data;
	}).forEach(data => list.push(data));

	return shuffle(list);
};

export const getSantUsantData = (complexRate: number, rounds: number) => {
	let list = [];

	getRoundData(db_sant_usant, complexRate, rounds, (database, complexity, round) => {
		let sorted = database.filter(e => e.complexity === complexity && e.answer == (round > Math.round(rounds / 2) ? 1 : 0));
		let data = sorted[Math.floor(Math.random() * sorted.length)];

		if (data) {
			database.splice(database.indexOf(data), 1);
			return data;
		}
	}).forEach(data => {
		list.push({
			difficulty: data.complexity,
			stats: data.stats,
			src: data.category + '/' + data.src,
			question: data.question,
			answer: data.answer
		})
	});

	return shuffle(list);
};

export const tween = (element, animationName, delay, direction, callback) => {
	element.classList.add('animated', animationName, delay);
	
	function handleAnimationEnd() {
		element.classList.remove('animated', animationName, delay);
		element.removeEventListener('animationend', handleAnimationEnd);
	
		if (typeof callback === 'function') callback();
	}
	
	element.addEventListener('animationend', handleAnimationEnd);
};

export const loadImage = url => {
	return new Promise((resolve, reject) => {
		let img = new Image();

		img.addEventListener('load', e => resolve(img));
		img.addEventListener('error', () => {
			reject(new Error(`Failed to load image's URL: ${url}`));
		});

		img.src = url;
	});
};

export const loadImages = roundData => {
	return new Promise((resolve, reject) => {
		let imagesLoaded = 0;

		for (const round of roundData) {
			loadImage(`./assets/img/games/images/${round.src}`).then(res => {
				round.image = res;

				imagesLoaded++;
				if (imagesLoaded == roundData.length) resolve();
			}).catch(() => reject("Error loading images"));
		}
	});
};