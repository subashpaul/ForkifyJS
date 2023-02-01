import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
    recipe: {},
    search: {
        page: 1,
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
}

export const loadRecipe = async (id) => {
    try {

        const data = await getJSON(`${API_URL}${id}`)

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTIme: recipe.cooking_time,
            ingredients: recipe.ingredients

        }

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;
        // console.log(recipe);
    } catch (error) {
        console.error(`${error} 😅`);
        throw error;
    }
}


export const loadSearchResults = async (query) => {
    try {
        state.search.query = query;
        const { data } = await getJSON(`${API_URL}?search=${query}`)

        state.search.results = data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        state.search.page = 1;
    } catch (error) {
        console.error(`${error} 😅`);
        throw error;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * RES_PER_PAGE
    const end = page * RES_PER_PAGE

    return state.search.results.slice(start, end);
}

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity / state.recipe.servings * newServings;
    });
    state.recipe.servings = +newServings
}
const persistBookmark = () => {
    localStorage.setItem('bookmark', JSON.stringify(state.bookmarks))
}

export const addBookmark = (recipe) => {
    // add bookmarked
    state.bookmarks.push(recipe);

    // mark current recipe as bookmarked
    if (recipe.id === state.recipe.id)
        state.recipe.bookmarked = true;

    persistBookmark()
}

export const deleteBookmark = function (id) {

    // delete the bookmark
    const index = state.bookmarks.findIndex(el => el.id === id)

    state.bookmarks.splice(index, 1);
    console.log(state.recipe.id)
    // mark current recipe as NOT bookmarked
    if (id === state.recipe.id)
        state.recipe.bookmarked = false;

    persistBookmark()

}

const init = () => {
    const storage = localStorage.getItem('bookmark');
    if (storage) {
        state.bookmarks = JSON.parse(storage);
        // console.log(storage)

    }
}
init();