import React, { useContext, useEffect } from 'react';
import shareImage from '../images/shareIcon.svg';
import favoritImageHeart from '../images/whiteHeartIcon.svg';
import favoritImageBlackHeart from '../images/blackHeartIcon.svg';
import ContextDetailsFood from '../context/ContextDetailsFood';

function InProgressFoods() {
  const { arrayId, functionPullId,
    arrayIngredients, doneRecipes,
    inProgressRecipes,
    clickCopy, textCopyLink,
    favoritBlackHeart, checkHeartBlack,
    clickHeartBlack } = useContext(ContextDetailsFood);

  useEffect(() => {
    functionPullId();
    doneRecipes();
    inProgressRecipes();
    checkHeartBlack();
  }, []);

  const buttonShare = (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ () => { clickCopy(); } }
    >
      <img
        src={ shareImage }
        alt="Compartilhar"
      />
    </button>
  );

  return (
    <div>
      {
        arrayId.map((item, index) => (
          <div
            key={ index }
          >
            <img
              data-testid="recipe-photo"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <h1
              data-testid="recipe-title"
            >
              {item.strMeal}
            </h1>

            {
              textCopyLink
                ? <p>Link copied!</p>
                : buttonShare

            }

            <button
              data-testid="favorite-btn"
              type="button"
              onClick={ () => { clickHeartBlack(); } }
            >
              <img
                src={ favoritBlackHeart ? favoritImageBlackHeart : favoritImageHeart }
                alt="Favorite"
              />
            </button>
            <h3
              data-testid="recipe-category"
            >
              {item.strCategory}
            </h3>
            <div>
              <h4> Ingredients </h4>
              {
                arrayIngredients.map((elemento, numbers) => (
                  <div
                    data-testid={ `${numbers}-ingredient-step` }
                    key={ numbers }
                  >
                    {`- ${elemento.ingredients} - ${elemento.measure}`}
                  </div>
                ))
              }
            </div>
            <div
              data-testid="instructions"
            >
              <h5>Instructions</h5>
              {item.strInstructions}
            </div>
            <div>
              <button data-testid="finish-recipe-btn" type="button">
                Finish Recipe
              </button>
            </div>
          </div>
        ))
      }
    </div>

  );
}

export default InProgressFoods;
