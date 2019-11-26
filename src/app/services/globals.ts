import databaseVost from "./testdatabase.json";
import database from "./database.json";
import databaseAlbum from "./database_album.json";
import PLAY = Phaser.Sound.Events.PLAY;
import {Local} from "protractor/built/driverProviders";

export let PLAYER_STATS = JSON.parse(localStorage.getItem('PLAYER_STATS')) || {
	level: 1,
	current_xp: 0,
	from_xp: 0,
	target_xp: 50,
	add_target_xp: 50,
	additive_xp: 25,
	sup_group: {
		'lese': {
			level: 1,
			current_xp: 0,
			from_xp: 0,
			target_xp: 50,
			add_target_xp: 50,
			additive_xp: 25
		},
		'skrive': {
			level: 1,
			current_xp: 0,
			from_xp: 0,
			target_xp: 50,
			add_target_xp: 50,
			additive_xp: 25
		},
		'lytte': {
			level: 1,
			current_xp: 0,
			from_xp: 0,
			target_xp: 50,
			add_target_xp: 50,
			additive_xp: 25
		},
		'hjernetrim': {
			level: 1,
			current_xp: 0,
			from_xp: 0,
			target_xp: 50,
			add_target_xp: 50,
			additive_xp: 25
		}
	}
};

export const GAMES_LIST = [{
	id: 1,
	category: 1,
	title: 'Match',
	icon: 'book',
	description: 'I spillet Match må du trykke på det rette ordet i forhold til hva som er på bildet. Her trener du på forståelse av verb.',
	thumbnail: './assets/img/polaroid_thumb.png'
}, {
	id: 2,
	category: 1,
	title: 'Flipper',
	icon: 'book',
	description: 'I spillet Flipper er det om å gjøre å fjerne alle boksene. Trykk på en av firkantene og velg riktig ord eller bilde. Her trener du på forståelse av verb.',
	thumbnail: './assets/img/flippern_thumb.png'
}, {
	id: 3,
	category: 2,
	title: 'Album',
	icon: 'create',
	description: 'I spillet Album så må du sette sammen setningen som passer til bildet. Husk å trykk på ordene i riktig rekkefølge! Her trener du på å bygge korrekte setninger.',
	thumbnail: './assets/img/album_thumb.png'
}];

export const categories = {
	1: {
		type: 'lese',
		icon: 'book'
	},
	2: {
		type: 'skrive',
		icon: 'create'
	},
	3: {
		type: 'lytte',
		icon: 'volume-high'
	},
	4: {
		type: 'hjernetrim',
		icon: 'pulse'
	}
};

export const getGame = (id:number) => GAMES_LIST.filter(e => e.id === id);
export const addXp = (category:string, winRate:number) => {
	if (winRate > 100) winRate = 100;
	else if (winRate < 50) winRate = 50;
	
	[PLAYER_STATS, PLAYER_STATS.sup_group[category]].forEach(stats => {
		stats.current_xp += winRate;

		if (stats.current_xp >= stats.target_xp) {
			let lastTargetXp = stats.target_xp;
			
			stats.level++;
			stats.current_xp -= stats.target_xp;
			stats.target_xp += stats.target_xp + stats.add_target_xp;
			stats.from_xp = lastTargetXp;
			stats.add_target_xp += stats.additive_xp;
		}
	});

	localStorage.setItem('PLAYER_STATS', JSON.stringify(PLAYER_STATS));
};

//TODO: Add this to storage
export let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
export let difficulty = parseFloat(localStorage.getItem('difficulty')) || 1.5;

export const addToFavorites = id => {
	let added;
	
	if (!favorites.includes(id)) {
		added = true;
		favorites.push(id);
	} else {
		added = false;
		favorites = favorites.filter(item => item !== id);
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
	
	return added;
};

export const correctDifficulty = (correctAnswers, rounds, category) => {
	let winRate:number = (correctAnswers/rounds)*100;
  
	console.log('winRate: ' + winRate);
	console.log('old complexity: ' + difficulty);
	
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
	
	if (difficulty < 1) difficulty = 1;
	else if (difficulty > 3) difficulty = 3;
	
	localStorage.setItem('difficulty', difficulty.toString());
	addXp(category, winRate);
};

export const shuffle = array => {
   for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
   }
   
   return array;
};

//TODO: this could probably be a bit cleaner
export const getMatchImage = (category: string, tags: any, complexRate: number, rounds: number) => {
	let listByCategory = shuffle(database.filter(e => e.category === category));
	let complexity;
	let list = [];
	
	for (let i = 0; i < rounds; i++) {
		if (i < Math.round((complexRate % 1) * rounds)) {
			complexity = Math.ceil(complexRate);
		} else {
			complexity = Math.floor(complexRate);
		}
		
		let image = listByCategory.splice(Math.random() * listByCategory.length, 1)[0];
		console.log(`Finding image random image with complexity: ${image.complexity} and alternative with: ${complexity}`);
		
		if (image) {
			let alternatives = [image.alternatives[complexity - 1]];
			image['wrongalt' + complexity].forEach(e => alternatives.push(e));
			
			list.push({
				src: image.src,
				alternatives: shuffle(alternatives),
				answer: image.alternatives[complexity - 1]
			})
		}
	}
	
	return shuffle(list);
};

export const getFlipperImage = (category: string, tags: any, complexRate: number, rounds: number) => {
	let listByCategory = databaseVost;//shuffle(database.filter(e => e.category === category));
	let complexity;
	let list = [];

	for (let i = 0; i < rounds; i++) {
		if (i < Math.round((complexRate % 1) * rounds)) {
			complexity = Math.ceil(complexRate);
		} else {
			complexity = Math.floor(complexRate);
		}

		let image = listByCategory.splice(Math.random() * listByCategory.length, 1)[0];
		console.log(`Finding image random image with complexity: ${image.complexity} and alternative with: ${complexity}`);

		if (image) {
			//let alternatives = [image.alternatives[complexity - 1]];
			//image['wrongalt'].forEach(e => alternatives.push(e));

			list.push({
				src: image.src,
				//alternatives: shuffle(alternatives),
				answer: image.word
			})
		}
	}

	return shuffle(list);
};

export const getAlbumImage = (category: string, tags: any, complexRate: number, rounds: number) => {
	let listByCategory = databaseAlbum;
	let complexity;
	let list = [];

	for (let i = 0; i < rounds; i++) {
		if (i < Math.round((complexRate % 1) * rounds)) {
			complexity = Math.ceil(complexRate);
		} else {
			complexity = Math.floor(complexRate);
		}

		let image = listByCategory.splice(Math.random() * listByCategory.length, 1)[0];
		console.log(`Finding image random image with complexity: ${image.complexity} and alternative with: ${complexity}`);

		if (image) {
			list.push(image);
		}
	}

	return shuffle(list);
};