import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []
    
    for(let i=1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }
   

    return(
        <nav>
                { pageNumbers &&
                pageNumbers.map(number => ( 
                    <button className={style.paginado} key={number} onClick = {() => paginado(number)}>{number}</button>
                ))}
        </nav>
        
    )
}