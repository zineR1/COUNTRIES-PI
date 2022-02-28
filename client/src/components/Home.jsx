import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Paginado from './Paginado';
import {getCountries, orderByName, orderByPopulation, filterByActivities, filterByContinents} from '../actions';
import Card from './Card'
import SearchBar from './SearchBar';
import style from './Home.module.css';
import logo from '../tripper.png'

export default function Home(){

const dispatch = useDispatch()
const allCountries = useSelector((state) => state.countries)
const allCountries2 = useSelector((state) => state.allCountries)
const continentCountries = allCountries2.map(el => el.continent)
const continentOrder = continentCountries.filter((item,index) => {
     return continentCountries.indexOf(item) === index;
    })

const continentSort = continentOrder.sort(function(a,b){
    if(a > b){
        return 1
    }
    if(b > a){
        return -1
    }
    return 0
})

const [,setOrden] = useState('')
const [,setOrden2] = useState('')
const [currentPage, setCurrentPage] = useState(1) // PÁGINA INICIAL
const [firstPage] = useState(9)
const [countriesPerPage] = useState(10)

const indexOfLastCountry = currentPage * countriesPerPage //12
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //0
const indexOfLastCountry1 = currentPage * firstPage
const indexOfFirstCountry1 = indexOfLastCountry1 - firstPage
const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry) 
const currentCountries1 = allCountries.slice(indexOfFirstCountry1, indexOfLastCountry1) 


    const paginado =  (pageNumber) => {
        setCurrentPage(pageNumber)
    }




useEffect(() => {
    dispatch(getCountries())
},[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getCountries());
}

function handleSort(e){
e.preventDefault();
dispatch(orderByName(e.target.value))
setCurrentPage(1);
setOrden(`Ordenado ${e.target.value}`)
    }

function handleSort2(e){
e.preventDefault();
dispatch(orderByPopulation(e.target.value))
setCurrentPage(1);
setOrden2(`Ordenado ${e.target.value}`)
    }    

function handleFilterTypes(e){
    dispatch(filterByActivities(e.target.value))
}

function handleFilterContinent(e){
    dispatch(filterByContinents(e.target.value))
}
    
return(
    <div className={style.main1}>
    <div className={style.Background}>
         <div className={style.LogoDiv}>
             <div>
        <Link to='/activity'  key={allCountries.id}>
            <button className={style.createActBtn}>⁙  New Activity</button>
        </Link>
             </div>
        <a onClick={e => {handleClick(e)}}>
        <img className={style.Logo} src={logo} alt="img"/>
        </a>
        </div>
        <div className={style.header}>
        <br/>
        <SearchBar/>
        <div className={style.filters}>
            <select className={style.botonfilter} onClick={e => {handleSort(e)}}>
                <option>Order By Name</option>
                <option value='asc'>A-Z</option>  {/* orden alfabético */}
                <option value='desc'>Z-A</option>
            </select>
            <select className={style.botonfilter} onClick={e => {handleSort2(e)}}>
                <option >Order By Population</option>
                <option value='more'>More</option>        {/* orden población */}
                <option value='less'>Less</option>
            </select>
                
            <select className={style.botonfilter} onChange = {e => {handleFilterTypes(e)}}>
                <option>Activity Type</option>          {/* orden por actividad */}
                {
                 allCountries2.map(el => el.activities.map(e => (

                 <option value={e.name} key={e.id}>{e.name}</option>
                 )))
            }
                    </select>
            <select className={style.botonfilter} onChange = {e => {handleFilterContinent(e)}}>
                <option>Continents</option>               {/* orden por continente */}
                {
                 continentSort.map(el => 
                 <option value={el} key={el}>{el}</option>
                )
            }
            </select>
            </div>
            </div>
            <div className={style.grid}>
            {currentPage === 1? currentCountries1.map(c => {
                return(
               <Link className={style.btnName} to={"/details/" + c.id}  key={c.id}>
                <Card className={style.grid} name={c.name} img={c.img} continent={c.continent} key={c.id}/>
                </Link>
             )
            }): currentCountries.map(c => {
                return(
                    <Link to ={"/details/" + c.id}  key={c.id}>
                        <Card name={c.name} img={c.img} continent={c.continent} key={c.id}/>
                    </Link>
                )
            })
            }
        </div>
        <div className={style.paginado}>
        <Paginado
           countriesPerPage = {countriesPerPage}
           allCountries = {allCountries.length}
           paginado = {paginado}
           />
           </div>
           <br/>
    </div>
    </div>
)
}
