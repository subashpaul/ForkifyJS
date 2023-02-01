import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js'
import recipeView from './view/recipeView.js';
import bookmarksView from './view/bookmarksView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();


    // update results ciew to mark selection search result
    resultsView.update(model.getSearchResultsPage())

    //  updating bookmarks view
    bookmarksView.update(model.state.bookmarks)
    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe)

  }
  catch (err) {
    console.error(err);
    recipeView.renderError();
  }
}

const constrolSearchResults = async () => {
  try {
    resultsView.renderSpinner()

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);


    // Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    // renderinitial pagination buttons
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error);
  }
}

const controlPagination = (gotoPage) => {

  // Render new Results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // Render new pagination buttons
  paginationView.render(model.state.search)


}

const controlServings = (newServings) => {
  // update the recipe servings(in state)
  model.updateServings(newServings);

  // Rendering recipe
  recipeView.update(model.state.recipe)

}

const controlAddBookmark = () => {

  // add/remove bookmark
  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id)

  // update recipe view
  recipeView.update(model.state.recipe)

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(constrolSearchResults);
  paginationView.addHandlerClick(controlPagination);

}

init();


const clearBookmarks = () => {
  localStorage.clear('bookmark');
}
// clearBookmarks()