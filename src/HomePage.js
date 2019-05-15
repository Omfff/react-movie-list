import React, {Component} from "react";
import {Layout} from "antd";
import HeaderBar from "./HeaderBar";
import MovieList from "./MovieList";

class HomePage extends Component{
    constructor() { //构造函数
        super();
        console.info("index constructor")
        this.state = {
            onSearch:false,
            searchKeyword:'',
            totalPage:0,
            basicPath:'http://localhost:8080/movies/page/'
        }

    }
    handleData(strData){
        const str = strData.replace(/[\b\f\r\t]/g, '')
        const strList = str.split('\n')
        var dataList = []
        console.info(strList.length)
        for(var j = 0,len=strList.length-1; j < len; j++) {
            console.log(strList[j])
            //console.log(strList[j].replace(/[\\]/g, ''))
            var temp = ''
            temp = strList[j].replace(/[\\]/g, '')
            console.log(temp)
            try {
                const data = JSON.parse(temp)
                //console.info(j)
                dataList.push(data)
            } catch (e) {
                console.info(j)
            }
        }
        return dataList
    }

    componentWillMount(){
        console.info("index componentWillMount")
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
        this.setState({onSearch:true,searchKeyword:keyword,basicPath:basicPath})

    }
    render() {
        console.info("index render")
        return (
            <Layout color={"#fff"}>
                <HeaderBar onSubmit={this.handleSubmitSearch.bind(this)}/>
                <MovieList  path={this.state.basicPath} />
            </Layout>
        )
    }
}
export default HomePage