import { Component } from 'react'
import React from  'react'
import ReactDOM from 'react-dom'
import FooterBar from './FooterBar'
import HomePage from './HomePage'
import NavigationBar from "./NavigationBar"
import Detail from "./Detail"
import "antd/dist/antd.css"
import './index.css'
import { Switch,Route,HashRouter } from 'react-router-dom'
import AnalysisPage from "./AnalysisPage"
import {createStore,applyMiddleware,compose} from "redux"
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {pathReducer,changePage,addSearchWord} from "./redux.js"

class Main extends Component{
    render() {
        return( <main>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/analysis' component={AnalysisPage}/>
                <Route path='/detail' component={Detail}/>
            </Switch>
        </main>)
    }
}
const MovieWeb = () => (
    <div>
        <NavigationBar/>
        <Main />
        <FooterBar/>
    </div>
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(pathReducer,composeEnhancers(
    applyMiddleware(thunk))
)
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MovieWeb/>
        </HashRouter>
    </Provider>
        ,document.getElementById('root')
)

