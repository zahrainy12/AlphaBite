import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeInfo = () => {
    const [item, setItem] = useState(null);
    const [vId, setVId] = useState("");
    const { MealId } = useParams();

    useEffect(() => {
        if (MealId !== "") {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
                .then(res => res.json())
                .then(data => {
                    setItem(data.meals[0]);
                });
        }
    }, [MealId]);

    useEffect(() => {
        if (item) {
            const url = item.strYoutube;
            const str = url.split("=");
            setVId(str[str.length - 1]);
        }
    }, [item]);

    return (
        <>
            {!item ? "" : (
                <>
                    <div className="content">
                        <img src={item.strMealThumb} alt={item.strMeal} />
                        <div className="inner-content">
                            <h1>{item.strMeal}</h1>
                            <h2>{item.strArea} Food</h2>
                            <h3>Category: {item.strCategory}</h3>
                        </div>
                    </div>
                    <div className="recipe-details">
                        <h2>Ingredients</h2>
                        <p>{item.strIngredient1}: {item.strMeasure1}</p>
                        <p>{item.strIngredient2}: {item.strMeasure2}</p>
                        <p>{item.strIngredient3}: {item.strMeasure3}</p>
                        <p>{item.strIngredient5}: {item.strMeasure4}</p>
                        <p>{item.strIngredient6}: {item.strMeasure5}</p>
                        <p>{item.strIngredient7}: {item.strMeasure6}</p>
                        <p>{item.strIngredient8}: {item.strMeasure7}</p>
                    </div>
                    <div className="instructions">
                        <h2>Instructions</h2> <br />
                        <p>{item.strInstructions}</p>
                    </div>
                    <div className="video">
                        <iframe 
                            src={`https://www.youtube.com/embed/${vId}`} 
                            title={`Recipe video for ${item.strMeal}`} 
                            width="560" 
                            height="315" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </>
            )}
        </>
    );
}

export default RecipeInfo;

