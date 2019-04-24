import { Component } from 'react'
import {Menu,Layout,Input,Rate}  from 'antd'
import React from  'react'
class Detail extends  Component{
    constructor(props){
        super(props)
        this.state =
        {
            movie:this.props.location.state.movie
        }
    }
    render() {
        const movie = this.state.movie
        return (
            <div>
                <p class="pageTitle">{movie.title}</p>
                <div class = "moviePoster">
                    <span ><img width={250} src={movie.poster} onError="this.src='empty.png'}"/></span>
                    <br />
                </div>
                <div class="introduction">
                    <br/>
                    <p><span>发行时间: </span> <span>{movie.pudate}</span></p>
                    <p>国家：{movie.countries}</p>
                    <p>类型：{movie.genres.join(" / ")}</p>
                    <p>导演：{movie.directors.join(" / ")}</p>
                    <p>主演：{movie.casts.map((item, i) => {  return <span> {item.name} / </span>})}</p>
                </div>
                <div class="ratingGroup">
                    <Rate disabled defaultValue={5}/> {movie.rating.stars[0]}<span>%</span>
                    <br/>
                    <Rate disabled  defaultValue={4}/> {movie.rating.stars[1]}<span>%</span>
                    <br/>
                    <Rate disabled  defaultValue={3}/> {movie.rating.stars[2]}<span>%</span>
                    <br/>
                    <Rate disabled  defaultValue={2}/> {movie.rating.stars[3]}<span>%</span>
                    <br/>
                    <Rate disabled  defaultValue={1}/> {movie.rating.stars[4]}<span>%</span>
                    <br/>
                </div>
                <div>
                    <p>简介：{movie.summary}</p>
                </div>
            </div>
        )
    }
}
export default Detail