import React, {Component} from "react";
import {Layout} from "antd";
import HeaderBar from "./HeaderBar";
import MovieList from "./MovieList";
import {connect} from 'react-redux'
import {loadMoreWorkAsync,addSearchWord} from "./redux.js"
import {fetchData} from "./redux";
class HomePage extends Component{
    constructor() { //构造函数
        super();
        console.info("index constructor")
        this.state = {
            onSearch:false,
            searchKeyword:'',
            total:0
        }
    }
    componentWillMount(){
        console.info("index componentWillMount")
        //store.subscribe(() => this._updateThemeColor())
    }
    componentDidMount() {
        console.info("index componentDidMount")
    }

    shouldComponentUpdate(nextProps,nextState){
        console.info("index shouldComponentUpdate")
        const isUpdate = ((nextState.onSearch == true) && (nextState.searchKeyword !== this.state.searchKeyword))
        //|| ( this.state.dataList !== nextState.dataList)
        //console.log("nextState.onSearch is",nextState.onSearch,"nextState.dataList is" , nextState.dataList,"thisState.dataList is",this.state.dataList)
        console.log(isUpdate)
        return isUpdate
    }
    handleSubmitSearch(keyword,searchType){
        /*var resultArray = []
        for (var i = 0 ,len = this.state.dataList.length; i < len-1  ; i++) {
            if(searchType =="title") {
                if (this.state.dataList[i].title.indexOf(keyword) >= 0) {
                    resultArray.push(this.state.dataList[i]);
                }
            }else if(searchType == "summary"){
                if (this.state.dataList[i].summary.indexOf(keyword) >= 0) {
                    resultArray.push(this.state.dataList[i]);
                }
            }else if(searchType == "actor"){
                var actor = this.state.dataList[i].casts
                for(var i = 0,len = actor.length;i<len;i++){
                    if(actor[i].name.indexOf(keyword)>=0){
                        resultArray.push(this.state.dataList[i]);
                        break
                    }
                }
            }else if(searchType=="time"){
                var time = this.state.dataList[i].pubdate[0]
                if(time.indexOf(keyword)>=0) {
                    resultArray.push(this.state.dataList[i]);
                }
            }else{
                alert(searchType)
            }
        }*/
        let type = 0
        switch (searchType) {
            case "title":
                type = 0
                break
            case "summary":
                type = 1
                break
            case "actor":
                type = 2
                break
            case "time":
                type = 3
                break
        }
        let basicPath = 'http://localhost:8080/movies/search/keyword/'+keyword+'/type/'+type+'/page/'
        this.props.addSearchWord(basicPath)
        let request = new Request(basicPath+'1', {
                method: 'GET',
            }
        )
        this.props.fetchData(request)
        this.setState({onSearch:true,searchKeyword:keyword})

    }
    render() {
        console.info("index render")
        return (
            <Layout color={"#fff"}>
                <HeaderBar onSubmit={this.handleSubmitSearch.bind(this)}/>
                <MovieList/>
            </Layout>
        )
    }
}
//会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
const mapStateToProps=(state)=>{
    return state
}
//键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出

//是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store
const mapDispatchToProps = {addSearchWord,fetchData}
//建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
//生成一个容器组件，前面的只是UI组件
HomePage = connect(mapStateToProps,mapDispatchToProps)(HomePage)
export default HomePage