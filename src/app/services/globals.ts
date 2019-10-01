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

export let imagesJson = { 
   "food": [ 
      { 
         "id":0,
         "data":{ 
            "src":"alan-hardman-SU1LFoeEUkk-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "pizza",
               "italy"
            ],
            "complexity":1,
            "alternatives":[ 
               "Pizza",
               "Pepperoni pizza",
               "Italiensk mat"
            ]
         }
      },
      { 
         "id":1,
         "data":{ 
            "src":"alexander-mils-aiIANaSK9DQ-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "pie",
               "dessert"
            ],
            "complexity":2,
            "alternatives":[ 
               "Pai",
               "Dessert",
               "Dekket bord"
            ]
         }
      },
      { 
         "id":2,
         "data":{ 
            "src":"amir-hanna-y73ExyLsveA-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "broccoli",
               "knife",
               "vegetable"
            ],
            "complexity":1,
            "alternatives":[ 
               "Brokkoli",
               "Grønnsak",
               "Kutte"
            ]
         }
      },
      { 
         "id":3,
         "data":{ 
            "src":"anastasiia-vasileva-SLE08nqpEbk-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "shrimp",
               "seafood",
               "lobster",
               "market",
               "octopus"
            ],
            "complexity":2,
            "alternatives":[ 
               "Reker",
               "Sjømat",
               "Blekksprut"
            ]
         }
      },
      { 
         "id":4,
         "data":{ 
            "src":"annie-spratt-bB0EsYazzXY-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "berry",
               "berries",
               "hands",
               "hold"
            ],
            "complexity":2,
            "alternatives":[ 
               "Bær",
               "Bringebær",
               "Han holder bær"
            ]
         }
      },
      { 
         "id":5,
         "data":{ 
            "src":"bao-menglong-TqD7M_uwwdE-unsplash.jpg",
            "categories":[ 
               "food",
               "animals"
            ],
            "tags":[ 
               "monkey",
               "animal",
               "eating",
               "corn"
            ],
            "complexity":3,
            "alternatives":[ 
               "Spise",
               "Apen spiser",
               "Jungeldyr"
            ]
         }
      },
      { 
         "id":6,
         "data":{ 
            "src":"ben-kolde-FFqNATH27EM-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "egg",
               "breakfast",
               "eating",
               "lunch"
            ],
            "complexity":2,
            "alternatives":[ 
               "Egg",
               "Brødskive",
               "Frokost"
            ]
         }
      },
      { 
         "id":7,
         "data":{ 
            "src":"bonnie-kittle-XAsG0EZEsyA-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "fall",
               "autumn",
               "pumpkin",
               "vegetable"
            ],
            "complexity":2,
            "alternatives":[ 
               "Gresskar",
               "Orange frukt",
               "Innhøsting"
            ]
         }
      },
      { 
         "id":8,
         "data":{ 
            "src":"burhan-rexhepi-gAIhUvHv0f0-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "onion",
               "red",
               "vegetable"
            ],
            "complexity":2,
            "alternatives":[ 
               "Løk",
               "Rød løk",
               "Grønnsak i båter"
            ]
         }
      },
      { 
         "id":9,
         "data":{ 
            "src":"caroline-attwood-kC9KUtSiflw-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "salmon",
               "fish",
               "cooking"
            ],
            "complexity":2,
            "alternatives":[ 
               "Laks",
               "Laksefileter",
               "Matlaging"
            ]
         }
      },
      { 
         "id":10,
         "data":{ 
            "src":"charles-ogJNR_jhxS8-unsplash.jpg",
            "categories":[ 
               "food"
            ],
            "tags":[ 
               "vegetable",
               "eggplant",
               "purple"
            ],
            "complexity":1,
            "alternatives":[ 
               "Grønnsak",
               "Aubergine",
               "Lilla grønnsak"
            ]
         }
      }
   ]
}