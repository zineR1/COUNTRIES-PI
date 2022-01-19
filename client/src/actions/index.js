import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const FILTER_BY_ACTIVITIES = 'FILTER_BY_ACTIVITIES';
export const FILTER_BY_CONTINENTS = 'FILTER_BY_CONTINENTS';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_DETAILS = 'GET_DETAILS';


export function getCountries(){

    return async function(dispatch){
        try{
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }catch(error){
        console.log(error);
    }
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
        }
    }

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function filterByActivities(payload){
    return{
        type: FILTER_BY_ACTIVITIES,
        payload
    }
}

export function filterByContinents(payload){
    return{
        type: FILTER_BY_CONTINENTS,
        payload
    }
}

export function getCountryName(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries?name=' + name);
        return dispatch({
            type: GET_COUNTRY_NAME,
            payload: json.data
        })
        }catch(error){
            console.log(error)
        }
    } 
}

export function postActivity(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/activity', payload)
        return dispatch({
            type: POST_ACTIVITY,
            payload: response
        })
    }
}


export function getDetails(id){
return async function (dispatch){
    try{
        var json = await axios.get('http://localhost:3001/countries/' + id)
        return dispatch({
            type: GET_DETAILS,
            payload: json.data
        })
    }catch(error){
        console.log(error,"GET_DETAILS")
    }
}
}