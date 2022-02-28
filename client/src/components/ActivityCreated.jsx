import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { getCountries, postActivity } from '../actions/';
import {useDispatch, useSelector} from "react-redux";
import style from "./ActivityCreated.module.css"
import logo from '../tripper.png'

export default function ActivityCreate(){
const dispatch = useDispatch();
const history = useHistory();
const countrie = useSelector((state) => state.allCountries)
const [errors, setErrors] = useState({})

const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
})
console.log(input.name)

useEffect(() => {
    dispatch(getCountries());
}, [dispatch])

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Name cannot be empty'
    }
    if(!input.difficulty || input.difficulty <= 1){
        errors.difficulty = 'Difficulty must be more than 0'
    }
    if(!input.duration){
        errors.duration= 'Duration cannot be empty'
    }
    if(!input.season || input.season.length !== 1){
        errors.season = 'You must select only 1 season'
        
    }
    return errors;
}

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
        
    })
    setErrors(validate({
        ...input,
        [e.target.value] : e.target.value
    }))

}

function handleSelect(e){
    setInput({
        ...input,
        countries:[...input.countries, e.target.value]
    })
    setErrors(validate({
        ...input,
        [e.target.value] : e.target.value
    }))
    console.log(input.countries)
}

function handleCheck(e){
    if(e.target.checked){
        setInput({
            ...input,
            season: e.target.value
        })
    }
}

function handleSubmit(e){
    e.preventDefault();
    if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
        alert('You must fill all the inputs')
    }
    else{
    dispatch(postActivity(input))
    alert('Activity Created')
    setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })
    }
    setErrors(validate({
        ...input,
        [e.target.value] : e.target.value
    }))
    history.push('/home')
// }
}

function handleDelete(e){
    setInput({
        ...input,
        countries: input.countries.filter(c => c !== e)
    })
    }

return(
    <div className={style.background}>
        <h1>Create Your Favourite Activity</h1>
        <br/>
        <form onSubmit={e => handleSubmit (e)}>
            <div>
                <input className={style.input}
                type="text"
                value= {input.name}
                name="name"
                placeholder="Activity Name"
                onChange={e => handleChange(e)}
                />
                {errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <br/>
            <div>
                <input className={style.input}
                type="number"
                value= {input.difficulty}
                name="difficulty"
                placeholder="Difficulty"
                onChange={e => handleChange(e)}
                />
                {errors.difficulty && (
                    <p>{errors.difficulty}</p>
                )}
            </div>
            <br/>
            <div>
                <input className={style.input}
                type="text"
                value= {input.duration}
                name="duration"
                placeholder="Duration"
                onChange={e => handleChange(e)}
                />
                {errors.duration && (
                    <p>{errors.duration}</p>
                )}
            </div>
            <br/>
            <div>
            <select className={style.btnSelect} onChange={e => handleSelect(e)}>
                <option>Countries</option>
                {countrie.map((el) => (
                     <option key={el.id} value={el.name}>{el.name}</option>  
                ))}
            </select>
            </div>
            <br/>
            <div>                
                <label><input
                type="checkbox"
                name="Autumn"
                value="Autumn"
                onChange={handleCheck}
                />Autumn</label>
                
                <label><input
                type="checkbox"
                name="Spring"
                value="Spring"
                onChange={handleCheck}
                />Spring</label>
                <label><input
                type="checkbox"
                name="Summer"
                value="Summer"
                onChange={handleCheck}
                />Summer</label>
                <label><input
                type="checkbox"
                name="Winter"
                value="Winter"
                onChange={handleCheck}
                />Winter</label>
                {errors.season && (
                    <p>{errors.season}</p>
                )}
            </div>
            <br/>
            <button className={style.btnSubmit} type='submit'>Create Activity</button>
        </form>
         {input.countries.map(el =>
            <div key={el}>
            <p key={el}>{el}</p>
            <button key={countrie.id} onClick={ () => handleDelete(el)}>x</button>
        </div>
         )}
        <Link to="/home">
           <button className={style.back}>Back</button>
        </Link>
    </div>
    
)

}
