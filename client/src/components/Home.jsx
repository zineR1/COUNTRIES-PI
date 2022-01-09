import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getCountries} from '../actions';
import Card from './Card'

export default function Home(){
const dispatch = useDispatch()
const allCountries = useSelector((state) => state.countries)

useEffect(() => {
    dispatch(getCountries())
},[])

function handleClick(e){
e.preventDefault();
dispatch(getCountries());
}

return(
    <div>
        <Link to='/countries'>Create Activity</Link>
        <h1>QUIERO VIAJAR POR EL MUNDO</h1>
        <button onClick={e => {handleClick(e)}}>
            Volver a Cargar Countries
        </button>
        <div>
            <select>
                <option>Alphabet</option>
                <option value='asc'>A-Z</option>  {/* orden alfabético */}
                <option value='desc'>Z-A</option>
            </select>
            <select>
                <option>Population</option>
                <option value='more'>More</option>        {/* orden población */}
                <option value='less'>Less</option>
            </select>
            <select>
                <option>Activity Type</option>           {/* orden por actividad */}
                <option value=''></option>
                <option value=''></option>
            </select>
            <select>
                <option>Continent</option>               {/* orden por continente */}
                <option value='africa'>Africa</option>
                <option value='america'>America</option>
            </select>
        </div>
    </div>
)
}