import React from "react";
import style from "./Card.module.css"

export default function Card({name, img, continent}){
return(
    <div className={style.Card}>
        <h3 className={style.name}>{name}</h3>
        <img className={style.img} src={img} alt='img not found' width='200px' height='250px'/>
        <h5 className={style.continent}>{continent}</h5>
    </div>
)
}