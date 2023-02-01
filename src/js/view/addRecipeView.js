import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');

    addHandlerRender(handler) {
        window.addEventListener('click', handler)
    }

    _generateMarkup() {


    }
}


export default new AddRecipeView();