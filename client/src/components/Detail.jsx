import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import style from "./Detail.module.css"

export default function Detail(props){
      const dispatch = useDispatch();

      useEffect(() => {
          dispatch(getDetails(props.match.params.id))
      },[dispatch,props.match.params.id])

      const myCountry = useSelector((state) => state.details)

      return(
        <div className={style.detailgral}>
        <div className={style.container}>
           <div className={style.detailinfo}>
              {myCountry.length > 0 ?
                <div>
                    <h1>{myCountry[0].name}</h1>
                    <img src={myCountry[0].img} alt="img"  width='250px' height='250px'/>
                    <h4>Continent: {myCountry[0].continent}</h4>
                    <h4>Capital: {myCountry[0].capital}</h4>
                    <h4>Subregion: {myCountry[0].subregion}</h4>
                    <h4>Area: {myCountry[0].area}</h4>
                    <h4>Population: {myCountry[0].population}</h4>
                        {myCountry[0].activities.length?
                        <h4>Activities:</h4> 
                    : <h4>There isn't activities available</h4>}
                      {myCountry[0].activities.map(el => {
                        return(
                            <h5 key={el.id}>Name: {el.name} <br/> Difficulty: {el.difficulty} <br/> Duration: {el.duration} <br/> Season: {el.season}</h5>
                        )
                })
                    }
                    </div>
                     : <p>Loading...</p>
              }
              <br/>
              <Link to="/home">
                  <button className={style.back}>Back</button>
              </Link>
          </div>
          </div>
            </div>
      )
}