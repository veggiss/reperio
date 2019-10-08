import database from "./database.json";

export const GAMES_LIST = [{
	id: 1,
	category: 1,
	title: 'Match - bilde',
	icon: 'book',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
}, {
	id: 6,
	category: 1,
	title: 'Ord fall',
	icon: 'book',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
}, {
	id: 2,
	category: 1,
	title: 'Ord rulett',
	icon: 'book',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
}, {
	id: 3,
	category: 2,
	title: 'Fyll inn x',
	icon: 'create',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
}, {
	id: 4,
	category: 3,
	title: 'Match - lyd',
	icon: 'volume-high',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
}, {
	id: 5,
	category: 4,
	title: 'Match - farge',
	icon: 'pulse',
	description: 'Dette er en forklaring på innholdet i spillet og sikkert andre ting tingeling'
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

const legalComplexity = n => n >= 1 && n <= 3;

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
			console.log(complexity)
		} else {
			complexity = Math.floor(complexRate);
			console.log(complexity)
		}
		
		let image = listByCategory.find((e, i, arr) => {
			if (e.complexity === complexity) {
				return arr.splice(i, 1);
			}
		});
		
		if (image) {
			let alternatives = [image.alternatives[Math.round(complexRate) - 1]];
			let alternativeList = [...listByCategory];
			
			for (let idx = 0; idx < 3; idx++) {
				let obj = alternativeList.splice(Math.floor(Math.random() * alternativeList.length), 1)[0];
				
				if (obj) {
					alternatives.push(obj["alternatives"][Math.round(complexRate) - 1]);
				}
			}
			
			if (alternatives.length === 4) {
				list.push({
					src: image.src,
					alternatives: shuffle(alternatives),
					answer: image.alternatives[Math.round(complexRate) - 1]
				})
			}
		}
	}
	
	console.log(list);
	
	return shuffle(list);
};