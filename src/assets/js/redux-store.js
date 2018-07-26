//redux state 
import appReducer from './store/reducers'
import { createStore } from 'redux'
import initialstate from './initialState.json'
const lodash  = require('lodash/array');

const initialState = (localStorage['redux-store']) ?
	JSON.parse(localStorage['redux-store']) :
	initialstate
    

const store = createStore(appReducer, initialState);
const render = (state)=>{
    return `<div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-header">
        Latest Repositories
      </div>
      <ul class="list-group list-group-flush">
      ${lodash.takeRight(state.allRepositories,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
      </ul>
    </div></div>
    <div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-header">
        Latest Issues
      </div>
      <ul class="list-group list-group-flush">
      ${lodash.takeRight(state.allIssues,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
      </ul>
    </div></div>
    <div class="col-sm-4"><div class="card" style="width: 18rem;">
    <div class="card-header">
        Latest Actions
      </div>
      <ul class="list-group list-group-flush">
      ${lodash.takeRight(state.allCommands,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
      </ul>
    </div></div>`
}

store.subscribe(() => {
  const state = JSON.stringify(store.getState())
  console.log(store.getState());
  localStorage['redux-store'] = state;
  const x = document.getElementById("history");
  x.innerHTML = render(store.getState());
})



module.exports = {store : store,render : render}
