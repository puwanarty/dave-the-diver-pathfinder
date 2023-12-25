import { ENHANCEMENTS, INGREDIENTS, RECIPES } from '@/constants'
import React, { useEffect } from 'react'

interface UserRecipeLevel {
	id: string
	level: number
}

const ingredientTrackingSections = [
	{
		type: 'fish',
		ingredients: INGREDIENTS.filter((ingredient) => ingredient.type === 'fish'),
	},
	{
		type: 'vegetable',
		ingredients: INGREDIENTS.filter((ingredient) => ingredient.type === 'vegetable'),
		remark: "*Farmable at Otto's Farm. except for 'Truffle'",
	},
	{
		type: 'seaweed',
		ingredients: INGREDIENTS.filter((ingredient) => ingredient.type === 'seaweed'),
		remark: "*Farmable at Gumo's Farm",
	},
	{
		type: 'seasoning',
		ingredients: INGREDIENTS.filter((ingredient) => ingredient.type === 'seasoning'),
		remark: '*Farmable at Dispatch & Cooking Pots',
	},
]

export default function Home() {
	const [dirty, setDirty] = React.useState(false)
	const [userRecipeLevel, setUserRecipeLevel] = React.useState<UserRecipeLevel[]>([])
	const trackingIngredients = (type: 'fish' | 'vegetable' | 'seaweed' | 'seasoning') => {
		const trackingSection = ingredientTrackingSections.find((section) => section.type === type)
		if (!trackingSection) return []

		return trackingSection.ingredients.filter((ingredient) => {
			const numberOfIngredientsPerRecipe = RECIPES.reduce((accumulator, recipe) => {
				const ingredientData = recipe.ingredients.find(({ ingredientId }) => ingredientId === ingredient.id)
				const numberOfIngredientsPerRecipe = ingredientData?.numberOfIngredientsPerRecipe || 0
				const _currentLevel = userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 0
				return accumulator + numberOfIngredientsPerRecipe * _currentLevel
			}, 0)

			return numberOfIngredientsPerRecipe > 0
		})
	}

	const remainingIngredients = (numberOfIngredientsPerRecipe: number, userRecipeLevel: number, targetLevel: number) => {
		const enhancementIngredients = ENHANCEMENTS.find(
			(e) => e.numberOfIngredientsPerRecipe === numberOfIngredientsPerRecipe
		)?.enhancementIngredients
		if (!enhancementIngredients) return 0
		const sumOfEnhancementIngredientsFrom0ToTargetLevel = enhancementIngredients
			.slice(0, targetLevel)
			.reduce((a, b) => a + b, 0)
		const sumOfEnhancementIngredientsFrom0ToCurrentLevel = enhancementIngredients
			.slice(0, userRecipeLevel)
			.reduce((a, b) => a + b, 0)

		if (targetLevel <= userRecipeLevel) return 'N/A'
		return sumOfEnhancementIngredientsFrom0ToTargetLevel - sumOfEnhancementIngredientsFrom0ToCurrentLevel
	}

	const levelUp = (recipeId: string) => {
		const _currentLevel = userRecipeLevel.find(({ id }) => id === recipeId)?.level || 0
		if (_currentLevel >= 10) return
		const _currentLevelIndex = userRecipeLevel.findIndex(({ id }) => id === recipeId)
		if (_currentLevelIndex === -1) {
			setUserRecipeLevel([...userRecipeLevel, { id: recipeId, level: _currentLevel + 1 }])
			return
		}
		const _currentLevelCopy = [...userRecipeLevel]
		_currentLevelCopy[_currentLevelIndex].level = _currentLevel + 1
		setUserRecipeLevel(_currentLevelCopy)
	}

	const levelDown = (recipeId: string) => {
		const _currentLevel = userRecipeLevel.find(({ id }) => id === recipeId)?.level || 0
		if (_currentLevel <= 1) {
			const _currentLevelIndex = userRecipeLevel.findIndex(({ id }) => id === recipeId)
			if (_currentLevelIndex !== -1) {
				const _currentLevelCopy = [...userRecipeLevel]
				_currentLevelCopy.splice(_currentLevelIndex, 1)
				setUserRecipeLevel(_currentLevelCopy)
			}
			return
		}
		const _currentLevelIndex = userRecipeLevel.findIndex(({ id }) => id === recipeId)
		if (_currentLevelIndex === -1) {
			setUserRecipeLevel([...userRecipeLevel, { id: recipeId, level: _currentLevel - 1 }])
			return
		}
		const _currentLevelCopy = [...userRecipeLevel]
		_currentLevelCopy[_currentLevelIndex].level = _currentLevel - 1
		setUserRecipeLevel(_currentLevelCopy)
	}

	const backToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		const _userRecipeLevel = localStorage.getItem('userRecipeLevel')
		if (_userRecipeLevel) {
			setUserRecipeLevel(JSON.parse(_userRecipeLevel))
		}
		setDirty(true)
	}, [])

	useEffect(() => {
		if (dirty) {
			localStorage.setItem('userRecipeLevel', JSON.stringify(userRecipeLevel))
		}
	}, [userRecipeLevel])

	return (
		<div className="flex max-sm:flex-col">
			<button
				className="fixed bottom-4 right-4 cursor-pointer rounded-full bg-gray-100 p-2 shadow-md"
				onClick={backToTop}
			>
				<svg
					className="h-6 w-6 text-gray-400 hover:text-gray-600"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path d="M5 15l7-7 7 7" />
				</svg>
			</button>
			<div className="w-full bg-gray-100 p-2 shadow-md sm:fixed sm:bottom-0 sm:left-0 sm:top-0 sm:min-h-screen sm:w-80 sm:overflow-y-auto">
				<div className="flex flex-col items-center">
					<h3 className="mb-4">TRACKING</h3>
					<span className="mb-4 italic text-gray-400">
						This is all ingredients that you need to collect to max out the recipes that you assigned level to.{' '}
						<span className="text-blue-400">Blue</span> text is the remaining ingredients that you need to collect.
					</span>
					<div className="flex flex-col items-center">
						{ingredientTrackingSections.map((section) => (
							<React.Fragment key={section.type}>
								<h4 className="mb-2">{section.type.toUpperCase()}</h4>
								<table className="w-full table-fixed">
									<thead>
										<tr>
											<th>Ingredient</th>
											<th>Remaining</th>
										</tr>
									</thead>
									<tbody>
										{trackingIngredients(section.type as 'fish' | 'vegetable' | 'seaweed' | 'seasoning').map(
											(ingredient) => {
												const ingredientName = INGREDIENTS.find(({ id }) => id === ingredient.id)?.name
												const remainingIngredientsResult = RECIPES.filter(
													(recipe) => (userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 0) > 0
												).reduce((accumulator, recipe) => {
													const numberOfIngredientsPerRecipe =
														recipe.ingredients.find(({ ingredientId }) => ingredientId === ingredient.id)
															?.numberOfIngredientsPerRecipe || 0
													const _currentLevel = userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 1
													const remainingIngredientsResult = remainingIngredients(
														numberOfIngredientsPerRecipe,
														_currentLevel,
														10
													)
													if (remainingIngredientsResult === 'N/A') return accumulator
													return accumulator + remainingIngredientsResult
												}, 0)
												return (
													remainingIngredientsResult > 0 && (
														<tr key={ingredient.id}>
															<td>{ingredientName}</td>
															<td className="text-blue-400">{remainingIngredientsResult}</td>
														</tr>
													)
												)
											}
										)}
									</tbody>
								</table>
								<span className="mb-4 text-xs text-gray-400">{section.remark}</span>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
			<main className="flex min-h-screen flex-1 justify-center p-4">
				<div className="flex max-w-3xl flex-col items-center">
					<div className="flex flex-col items-center text-center">
						<h1 className="mb-4">DAVE THE DIVER</h1>
						<span className="mb-4 italic text-gray-400">
							*This is not all recipes, this is only high efficiency recipes for now. and I plan to add all recipes in
							the future*
						</span>
						<span className="mb-2 italic text-gray-400">
							Click <span className="text-xl font-bold text-green-400">+</span> button to track a recipe and assign
							level to it.
						</span>
						<span className="mb-4 italic text-gray-400">
							Click <span className="text-xl font-bold text-red-400">-</span> button to untrack a recipe and remove
							level from it.
						</span>
					</div>
					<div className="flex flex-col items-center">
						{RECIPES.map((recipe) => (
							<div key={recipe.id} className="mb-8 flex flex-col items-center">
								<div className="mb-2 w-40 overflow-hidden rounded-lg border border-gray-400 bg-gray-100 p-2">
									{recipe.image ? (
										<img className="h-full w-full object-cover" src={recipe.image} alt={recipe.name} />
									) : (
										<div className="flex h-full w-full items-center justify-center text-gray-400">N/A</div>
									)}
								</div>
								<h4 className="mb-2">{recipe.name}</h4>
								<div className="mb-4 flex items-center justify-center">
									<div className="flex items-center divide-gray-400 overflow-hidden rounded-lg border border-gray-400 p-2">
										<button
											className="w-10 bg-gray-200 text-red-400"
											onClick={() => levelDown(recipe.id)}
											disabled={(userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 0) <= 0}
										>
											-
										</button>
										<p className="w-12 text-center">{userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 0}</p>
										<button
											className="w-10 bg-gray-200 text-green-400"
											onClick={() => levelUp(recipe.id)}
											disabled={(userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 0) >= 10}
										>
											+
										</button>
									</div>
								</div>
								<div className="flex flex-col items-center">
									<table className="w-full table-fixed">
										<thead>
											<tr>
												<th>Ingredient</th>
												<th>Per Recipe</th>
												<th>Lvl 5</th>
												<th>Lvl 10</th>
											</tr>
										</thead>
										<tbody>
											{recipe.ingredients.map((ingredient) => {
												const ingredientName = INGREDIENTS.find(({ id }) => id === ingredient.ingredientId)?.name
												return (
													<tr key={ingredient.ingredientId}>
														<td>{ingredientName}</td>
														<td>{ingredient.numberOfIngredientsPerRecipe}</td>
														<td className="text-blue-400">
															{remainingIngredients(
																ingredient.numberOfIngredientsPerRecipe,
																userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 1,
																5
															)}
														</td>
														<td className="text-blue-400">
															{remainingIngredients(
																ingredient.numberOfIngredientsPerRecipe,
																userRecipeLevel.find(({ id }) => id === recipe.id)?.level || 1,
																10
															)}
														</td>
													</tr>
												)
											})}
										</tbody>
									</table>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
