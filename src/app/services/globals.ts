// 1: lese, 2: skrive, 3: lytte, 4: hjernetrim
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

export let favorites = [3, 1];

export const getGame = (id:number) => GAMES_LIST.filter(e => e.id === id);