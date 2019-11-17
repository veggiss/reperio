import databaseVost from "./testdatabase.json";
import database from "./database.json";

export const GAMES_LIST = [{
	id: 1,
	category: 1,
	title: 'Finn ordet',
	icon: 'book',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling',
	thumbnail: './assets/img/thumbnail_match.png'
}, {
	id: 2,
	category: 1,
	title: 'Flipper',
	icon: 'book',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling',
	thumbnail: './assets/img/thumbnail_match.png'
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

//TODO: Add this to storage
export let favorites = [3, 1];
export let difficulty = 1;

export const correctDifficulty = (correctAnswers, rounds) => {
	let winnRate:number = (correctAnswers/rounds)*100;

	console.log('winnRate: ' + winnRate);
	console.log('old complexity: ' + difficulty);
	
	if (winnRate <= 10) {
		difficulty -= 0.3;
	} else if (winnRate > 10 && winnRate <= 25) {
		difficulty -= 0.2;
	} else if (winnRate > 25 && winnRate <= 50) {
		difficulty -= 0.1;
	} else if (winnRate > 50 && winnRate <= 75) {
		difficulty += 0.1;
	} else if (winnRate > 75 && winnRate <= 90) {
		difficulty += 0.2;
	} else if (winnRate > 90) {
		difficulty += 0.3;
	}
	
	if (difficulty < 1) difficulty = 1;
	else if (difficulty > 3) difficulty = 3;
	
	console.log('new complexity: ' + difficulty);
	
	localStorage.setItem('difficulty', difficulty.toString());
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