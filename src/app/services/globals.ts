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
}

export const getGame = (id:number) => GAMES_LIST.filter(e => e.id === id);

//TODO: Add this to storage
export let favorites = [3, 1];