const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Activity, Country} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountriesInfo = async () => { 
    try{
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const countryData = apiUrl.data.map(el => {
        return{
            id: el.cca3,
            name:el.name.common,
            img:el.flags[1],
            continent: el.continents[0],
            capital: el.capital? el.capital[0]: "This Capital doesn't exist",
            subregion: el.subregion? el.subregion: "This Subregion doesn't exist" ,
            area: el.area,
            population: el.population
        }
    })
    countryData.forEach(el => {
                 Country.findOrCreate({
                     where: {
                              id: el.id,
                              name: el.name,
                              img: el.img,
                              continent: el.continent,
                              capital: el.capital,
                              subregion: el.subregion,
                              area: el.area,
                              population: el.population
                            }
                      })
            })
        const allcount = await Country.findAll({
            include: Activity
        });
        // const allCountAct = await allcounthnjfhmfhmfhmfhmf
        return allcount
    }
    catch(error){
        console.log("GETAPIINFO", error)
    }
    }

router.get('/countries', async (req,res) => {
    try{
    const name = req.query.name
    const dbInfo = await getCountriesInfo();
    let infoRutaPrincipal = dbInfo.map(el => {
        return {
            id: el.id,
            name: el.name,
            img: el.img,
            continent: el.continent,
            population: el.population,
            activities:el.activities
        }
    })
    if(name){
        let countryName = await infoRutaPrincipal.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase())) 
        countryName? 
        res.send(countryName):
        res.status(404).send("This Country doesn't exist")
    }else{
        res.send(infoRutaPrincipal)
    }
}
catch(error){
    console.log("COUNTRIES", error)
}
});
    
router.post('/activity', async (req,res) => {
   try{
    let country = req.body.country
    let activitiesCreated = await Activity.create ({
     name: req.body.name,
     difficulty: req.body.difficulty,
     duration: req.body.duration,
     season: req.body.season
    })
    let countryDb = await Country.findOne({            
        where: {name: country}
    })
    activitiesCreated.addCountry(countryDb)
    res.send(activitiesCreated)
}
catch(error){
    console.log("POST", error)
}
}) 

router.get('/countries/:id', async (req,res) => {
    try{
    const id = req.params.id
    const countriesId = await Country.findAll({
        where:{id: id},
        include: Activity
    });
    // if(id){
    //     let countryId = countriesId.filter(el => el.id == id)
        countriesId.length?
        res.status(200).send(countriesId):
        res.status(404).send("This country doesn't exist");
    // }
}
catch(error){
    console.log("ID", error)
}
})

module.exports = router;
