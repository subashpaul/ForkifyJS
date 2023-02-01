import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'
class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errMsg = 'No bookmarks found for your query. Find a nice recipe and bookmark it'
    _message = ''

    addHandlerRender(handler) {
        window.addEventListener('click', handler)
    }

    _generateMarkup() {
        // const id = window.location.hash.slice(1);

        return this._data.map(el => previewView.render(el, false)).join('')

    }
}


export default new BookmarksView();