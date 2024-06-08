import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem";
import ReacipeIndex from "./RecipeIndex";

const Meal = () => {
    const [url,setUrl]=useState("https:/www.themealdb.com/api/json/v1/1/search.php?f=a");
    const [item,setItem]=useState();
    const [show,setShow]=useState(false);
    const [search,setSearch]=useState();

    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=> {
            setItem(data.meals);
            setShow(true);
        })
     },[url])

     const searchRecipe=(evt)=>{
        if(evt.key==="Enter"){
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        }
   }

     const setIndex=(alpha)=>{
        setUrl(`https:/www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
    } 

return (
    <>
        <div className="main">
            <div className="heading">
                <h1>AlphaBite</h1>
                <h4>Flavor Adventures from A to Z</h4>
            </div>
            <div className="searchBox">
                <input type="search" className="search-bar" onChange={e=> setSearch(e.target.value)} onKeyPress={searchRecipe}/>
                <span className="search-icon">&#128269;</span>
            </div>
            <div className="container">
                {
                    show ?<MealItem data={item} /> :"Not Found"
                }
            </div>
            <p>Exploring based on the alphabet.</p>
            <div className="indexContainer">
                 <ReacipeIndex alphaIndex={(alpha)=>setIndex(alpha)}/>
            </div>
        </div>
    </>
)
}
export default Meal;  