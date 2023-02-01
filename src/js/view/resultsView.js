import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMsg = 'No recipe found for your query. Please try again later!'
  _message = ''

  _generateMarkup() {
    // const id = window.location.hash.slice(1);


    return this._data.map(result => previewView.render(result, false)).join('')

  }
}


export default new ResultsView();