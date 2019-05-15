import { Component } from 'react'
import React from  'react'
import ReactDOM from 'react-dom'
import FooterBar from './FooterBar'
import HomePage from './HomePage'
import NavigationBar from "./NavigationBar"
import Detail from "./Detail"
import "antd/dist/antd.css"
import './index.css'
import { Layout } from 'antd'
import { Link,Switch,Route,HashRouter } from 'react-router-dom'
import AnalysisPage from "./AnalysisPage"

const{Header,Footer,Content}=Layout
const data_str = '{"_id":"1296824","rating":{"rating_people":"17640","average":"7.8","stars":["22.2","48.9","26.9","1.8","0.2"]},"genres":["剧情","爱情"],"season_count":"","pubdate":["1943-12-24(英国)"],"countries":["美国"],"lens_id":6983,"casts":[{"id":"1048149","name":"奥逊·威尔斯"},{"id":"1027882","name":"琼·芳登"},{"id":"1016694","name":"玛格丽特·奥布赖恩"},{"id":"1092323","name":"佩吉·安·加纳"},{"id":"1028307","name":"约翰·萨顿"},{"id":"1041625","name":"萨拉·奥尔古德"},{"id":"1067393","name":"亨利·丹尼尔"}],"title":"简爱 Jane Eyre","directors":[{"id":"1160301","name":"罗伯特·斯蒂文森"}],"poster":"https://img3.doubanio.com/view/subject/l/public/s2899424.jpg","summary":"孤儿简·爱从小寄居在舅母家，受尽舅妈极其表弟的折磨，后被送往由布洛克赫斯特先生所开的教会学校。在学校里，简·爱仍遭歧视，但她认识了同学海伦，第一次感受到友情的温暖。海伦却因违抗布洛克赫斯特先生遭受惩罚染病去世。孤独的简·爱（琼·芳登JoanFontaine饰）成年后离开学校来到桑菲尔德，给爱德华先生的私生女阿黛勒当家庭教师。一个夜晚，她在郊外巧遇了远行归家的爱德华先生（奥逊·威尔斯OrsonWelles饰）。经过一系列交流后两人的感情迅速升温，陷入了恋爱中。就在他们两人准备成婚之际，一个真相却打断了他们的幸福。远离了爱德华的简·爱回家探望了濒死的舅妈，同时收到了爱德华遭受噩耗的消息，最后这两个彼此深爱的不幸之人能否终成眷属呢？\\n本片根据十九世纪英国女作家夏洛蒂·勃兰特的著名作品《简·爱》改编，由四十年代的好莱坞影星琼·芳登与奥逊·威尔斯主演。...","languages":["英语"],"duration":"97","episodes":"","writers":[{"id":"search","name":"Charlotte Brontë"},{"id":"search","name":"Aldous Huxley"},{"id":"search","name":"Henry Koster"},{"id":"1160301","name":"罗伯特·斯蒂文森"},{"id":"1050012","name":"约翰·豪斯曼"}],"imdb":"tt0036969","year":"1943","site":"","douban_site":"","aka":["简·爱"]}'
const data = JSON.parse(data_str)

//getChildContext () {
//         return { store }
//     }
class Main extends Component{
    getChildContext () {
        return { store }
    }
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


function createStore (reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
}

const pathReducer = (state, action) => {
    if (!state) return {
        basicPath:'http://localhost:8080/movies/page/'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor }
        default:
            return state
    }
}

const store = createStore(pathReducer)
ReactDOM.render(
    <HashRouter>
        <MovieWeb/>
    </HashRouter>
        ,document.getElementById('root')
)

