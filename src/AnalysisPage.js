import { Component } from 'react'
import React from  'react'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {Divider} from "antd";
class AnalysisPage extends Component {
    constructor() { //构造函数
        super();
        console.info("constructor")
        this.state = {
            dataList: {},
        }
    }

    handleData(strData) {
        const str = strData.replace(/[\b\f\r\t]/g, '')
        const strList = str.split('\n')
        var dataList = []
        console.info(strList.length)
        for (var j = 0, len = strList.length - 1; j < len; j++) {
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

    getData() {
        console.info("getData")
        fetch('./films.json')
            .then(res => res.text())
            .then(res => this.setState({dataList: this.handleData(res)}))
    }

    componentWillMount() {
        console.info("analysis page componentWillMount")
        let request = new Request('https://47.107.167.12:8080/api/movies/analysis', {
                method: 'GET',
            }
        )
        fetch(request)//'./films.json')
            .then(response => response.json())
            .then(data =>this.setState({dataList:this.handleJson(data)}))
    }
    handleJson(json){
        let countryDatas=[];
        let typeDatas=[];
        let yearDatas=[];
        let countryItem = json.countries
        let yearItem = json.years
        let typeItem = json.types
        for (var key in countryItem){
            let item = {}
            item["country"] = key
            item["num"] = countryItem[key]
            countryDatas.push(item)
        }
        for(var key in yearItem){
            var item = {}
            item["year"] = key
            item["population"] = yearItem[key]
            yearDatas.push(item)
        }
        for (var key in typeItem){
            var item = {}
            item["type"] = key
            item["num"] = typeItem[key]
            typeDatas.push(item)
        }
        return {country:countryDatas.sort(this.sortByField),year:yearDatas,type:typeDatas}
    }
    sortByField(x, y) {
        return x.num - y.num
    }
    analyseData() {
        var countryDatas=[];
        var countryItem = {};
        var typeDatas=[]
        var typeItem = {}
        var yearDatas=[]
        var yearItem={}
        yearItem["1970之前"] =0
        yearItem["70年代"] = 0
        yearItem["80年代"] = 0
        yearItem["90年代"] = 0
        yearItem["00年代"] = 0
        yearItem["2010年之后"] = 0

        for (var j = 0, len = this.state.dataList.length; j < len; j++) {
            for(var i = 0, length = this.state.dataList[j].genres.length; i < length; i++){
                if(typeItem.hasOwnProperty(this.state.dataList[j].genres[i])){
                    typeItem[this.state.dataList[j].genres[i]] +=1
                }else{
                    typeItem[this.state.dataList[j].genres[i]] = 1
                }
            }
            for(var i = 0, length = this.state.dataList[j].countries.length; i < length; i++){
                if(countryItem.hasOwnProperty(this.state.dataList[j].countries[i])){
                    countryItem[this.state.dataList[j].countries[i]] +=1
                }else{
                    countryItem[this.state.dataList[j].countries[i]] = 1
                }
            }
            if(this.state.dataList[j].pubdate[0]!=null && this.state.dataList[j].pubdate[0].length>2){
                const year = this.state.dataList[j].pubdate[0].substring(0,4)
                if(year<1970){
                    yearItem["1970之前"] += 1
                }else if(year<1980){
                    yearItem["70年代"] += 1
                }else if(year < 1990){
                    yearItem["80年代"] += 1
                }else if(year < 2000){
                    yearItem["90年代"] += 1
                }else if(year<2010){
                    yearItem["00年代"] += 1
                }else{
                    yearItem["2010年之后"] += 1
                }
            }
        }
        var others = {}
        others["country"] = "其他"
        others["num"] = 0
        for (var key in countryItem){
            if(countryItem[key]>3) {
                var item = {}
                item["country"] = key
                item["num"] = countryItem[key]
                countryDatas.push(item)
            }else {
                others["num"] +=countryItem[key]
            }
        }
        countryDatas.push(others)


        for(var key in yearItem){
            var item = {}
            item["year"] = key
            item["population"] = yearItem[key]
            yearDatas.push(item)
        }


        for (var key in typeItem){
            var item = {}
            item["type"] = key
            item["num"] = typeItem[key]
            typeDatas.push(item)
        }
        return {country:countryDatas.sort(this.sortByField),year:yearDatas,type:typeDatas}
    }
    isEmptyJson(obj) {
        if (JSON.stringify(obj) == '{}') {
            return true;
        } else {
            return false;
        }
    }
    render() {
        if (!this.isEmptyJson(this.state.dataList)) {
            console.log(this.state.dataList)
            const data = this.state.dataList//this.analyseData()
            const country = data.country
            const year = data.year
            const type = data.type
            return (
                <div>
                    <Divider><h1 align="center">国家分布</h1></Divider>
                    <Basic class="Basic" data={country}/>
                    <Divider><h1 align="center">年份分布</h1></Divider>
                    <Donutrose class="Donutrose" data={year}/>
                    <Divider><h1 align="center">类型分布</h1></Divider>
                    <Basiccolumn data={type}/>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}


class Basic extends React.Component {
    render() {
        const countryCols = {
            country: { alias: '国家' },
            num: { alias: '数量' }
        };
        const data = this.props.data
        console.log(data)
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.source(data).transform({
            type: "sort",
            callback(a, b) {
                // 排序依据，和原生js的排序callback一致
                return true ;
            }
        });
        return (
            <div class="Basic">
                <Chart height={800}    data={dv} forceFit>
                    <Coord transpose />
                    <Axis
                        name="country"
                        label={{
                            offset: 12
                        }}
                    />
                    <Axis name="num" />
                    <Tooltip />
                    <Geom type="interval" position="country*num" color="country" />
                </Chart>
            </div>
        );
    }
}
class Donutrose extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div>
                <Chart height={400} data={data} forceFit>
                    <Coord type="polar" innerRadius={0.2} />
                    <Tooltip />
                    <Legend
                        position="right"
                        offsetY={-50}
                        offsetX={-300}
                    />
                    <Geom
                        type="interval"
                        color="year"
                        position="year*population"
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
class Basiccolumn extends React.Component {
    render() {
        const data = this.props.data
        const cols = {
            sales: {
                tickInterval: 20
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="type" />
                    <Axis name="num" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="interval" position="type*num" />
                </Chart>
            </div>
        );
    }
}
export default AnalysisPage
