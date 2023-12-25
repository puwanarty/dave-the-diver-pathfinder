// todo: add all ingredients
export const INGREDIENTS = [
	// fish
	{
		id: 'arctic-cod',
		name: 'Arctic Cod',
		type: 'fish',
		ingredients: [
			{
				receipeId: 'arctic-cod-risotto',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'titan-triggerfish',
		name: 'Titan Triggerfish',
		type: 'fish',
		ingredients: [
			{
				receipeId: 'tropical-fish-sushi-set',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'harlequin-hind',
		name: 'Harlequin Hind',
		type: 'fish',
		ingredients: [
			{
				receipeId: 'tropical-fish-sushi-set',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'coral-trout',
		name: 'Coral Trout',
		type: 'fish',
		ingredients: [
			{
				receipeId: 'tropical-fish-sushi-set',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'sailfish',
		name: 'Sailfish',
		type: 'fish',
		ingredients: [
			{
				receipeId: 'boiled-sailfish-and-seaweed',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	// vegetables
	{
		id: 'cherry-tomato',
		name: 'Cherry Tomato',
		type: 'vegetable',
		ingredients: [
			{
				receipeId: 'arctic-cod-risotto',
				numberOfIngredientsPerRecipe: 2,
			},
		],
	},
	{
		id: 'rice',
		name: 'Rice',
		type: 'vegetable',
		ingredients: [
			{
				receipeId: 'arctic-cod-risotto',
				numberOfIngredientsPerRecipe: 2,
			},
			{
				receipeId: 'tropical-fish-sushi-set',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'garlic',
		name: 'Garlic',
		type: 'vegetable',
		ingredients: [
			{
				receipeId: 'arctic-cod-risotto',
				numberOfIngredientsPerRecipe: 2,
			},
		],
	},
	// seaweed
	{
		id: 'southern-bull-kelp',
		name: 'Southern Bull Kelp',
		type: 'seaweed',
		ingredients: [
			{
				receipeId: 'boiled-sailfish-and-seaweed',
				numberOfIngredientsPerRecipe: 2,
			},
		],
	},
	{
		id: 'kajime',
		name: 'Kajime',
		type: 'seaweed',
		ingredients: [
			{
				receipeId: 'boiled-sailfish-and-seaweed',
				numberOfIngredientsPerRecipe: 2,
			},
		],
	},
	// seasoning
	{
		id: 'soy-sauce',
		name: 'Soy Sauce',
		type: 'seasoning',
		ingredients: [
			{
				receipeId: 'boiled-sailfish-and-seaweed',
				numberOfIngredientsPerRecipe: 1,
			},
		],
	},
]

// todo: add all recipes
export const RECIPES = [
	{
		id: 'arctic-cod-risotto',
		name: 'Arctic Cod Risotto',
		image: '/images/recipes/arctic-cod-risotto.webp',
		ingredients: [
			{
				ingredientId: 'arctic-cod',
				numberOfIngredientsPerRecipe: 3,
			},
			{
				ingredientId: 'cherry-tomato',
				numberOfIngredientsPerRecipe: 2,
			},
			{
				ingredientId: 'rice',
				numberOfIngredientsPerRecipe: 2,
			},
			{
				ingredientId: 'garlic',
				numberOfIngredientsPerRecipe: 2,
			},
		],
	},
	{
		id: 'tropical-fish-sushi-set',
		name: 'Tropical Fish Sushi Set',
		image: '/images/recipes/tropical-fish-sushi-set.webp',
		ingredients: [
			{
				ingredientId: 'titan-triggerfish',
				numberOfIngredientsPerRecipe: 3,
			},
			{
				ingredientId: 'harlequin-hind',
				numberOfIngredientsPerRecipe: 3,
			},
			{
				ingredientId: 'coral-trout',
				numberOfIngredientsPerRecipe: 3,
			},
			{
				ingredientId: 'rice',
				numberOfIngredientsPerRecipe: 3,
			},
		],
	},
	{
		id: 'boiled-sailfish-and-seaweed',
		name: 'Boiled Sailfish and Seaweed',
		image: '/images/recipes/boiled-sailfish-and-seaweed.webp',
		ingredients: [
			{
				ingredientId: 'sailfish',
				numberOfIngredientsPerRecipe: 3,
			},
			{
				ingredientId: 'southern-bull-kelp',
				numberOfIngredientsPerRecipe: 2,
			},
			{
				ingredientId: 'kajime',
				numberOfIngredientsPerRecipe: 2,
			},
			{
				ingredientId: 'soy-sauce',
				numberOfIngredientsPerRecipe: 1,
			},
		],
	},
]

export const ENHANCEMENTS = [
	{
		numberOfIngredientsPerRecipe: 1,
		enhancementIngredients: [0, 3, 4, 6, 10, 15, 22, 34, 51, 76],
	},
	{
		numberOfIngredientsPerRecipe: 2,
		enhancementIngredients: [0, 4, 6, 10, 15, 22, 34, 51, 76, 115],
	},
	{
		numberOfIngredientsPerRecipe: 3,
		enhancementIngredients: [0, 6, 9, 13, 20, 30, 45, 68, 102, 153],
	},
	{
		numberOfIngredientsPerRecipe: 5,
		enhancementIngredients: [0, 9, 13, 20, 30, 45, 68, 102, 153, 230],
	},
]
