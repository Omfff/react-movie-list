//const action

export const backToHomePage=()=>{
    return{
        type:'HOME',
        basicPath:'http://localhost:8080/movies/page/',
        pageNum:1
    }

}
export const addSearchWord=(path)=>{
    return {
        type: 'SEARCH',
        basicPath: path
    }
}
export const changePage=(pageNum)=>{
    return {
        type:'PAGE',
        pageNum:pageNum
    }
}
export const fetchData = (request)  =>{
    return dispatch=> {
        fetch(request)//'./films.json')
            .then(response => response.json())
            .then(data => dispatch({
                        type: 'GET_DATA',
                        itemList: handleJson(data.list),
                        total: data.total
                }
                )
            )
    }
}
/*export const  fetchData=(request)=>{
    console.log(request)
    fetch(request)//'./films.json')
        .then(response => response.json())
        .then(data =>{
            return {
                type :'GET_DATA',
                itemList: handleJson(data.list),
                total: data.total
            }
        }
        )
}*/
export const handleJson=(jsonList)=>{
    for(let item of jsonList){
        item["rating"] = JSON.parse(item.rating)
        item["genres"] = JSON.parse(item.genres)
        item["countries"] = JSON.parse(item.countries)
        item["casts"] = JSON.parse(item.casts)
        item["directors"] = JSON.parse(item.directors)
        item["pubdate"] = JSON.parse(item.pubdate)
    }

    return jsonList
}
export const pathReducer = (state, action) => {
    if (!state) return {
        basicPath:'http://localhost:8080/movies/page/',
        pageNum:1,
        itemList:{},
        total:0
    }
    switch (action.type) {
        case 'HOME':
            return{...state,basicPath:action.basicPath,pageNum:action.pageNum}
            break
        case 'SEARCH':
            return { ...state,basicPath: action.basicPath,pageNum:1}//
            break;
        case 'PAGE':
            return {...state,pageNum:action.pageNum}
            break;
        case 'GET_DATA':
            return {...state,itemList:action.itemList,total:action.total}
        default:
            return state
    }
}