import React from 'react';
import {Link} from 'react-router-dom';
import style from "./LandingPage.module.css";
import logo from '../pixlr-bg-result.png'


export default function LandingPage(){
return(
    <div className={style.fondo}>
        {/* <h1 className={style.text}>Welcome Adventurous</h1> */}
        {/* <br/> */}
        <img className={style.img} src={logo}/>
        <br/>
        <Link to='/home'>
            <button className={style.btn}>Welcome ☆</button>
        </Link>
    </div>
)
}