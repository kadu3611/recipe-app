import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';
import ContextDetailsDrinks from '../context/DetailsDrinks/ContextDetailsDrinks';
import '../DetailsCss/details.css';

function DetailsDrink() {
  const history = useHistory();
  const { arrayId, functionPullId,
    arrayIngredients, arrayPatternFood,
    performedRecipes,
    continueRecipes, doneRecipes,
    inProgressRecipes, clickCopy,
    textCopyLink } = useContext(ContextDetailsDrinks);

  useEffect(() => {
    functionPullId();
    inProgressRecipes();
    doneRecipes();
  }, []);
  const buttonContinue = (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="button-details"
      disabled={ performedRecipes }
      onClick={ () => { history.push('/drinks/'); } }
    >

      Continue Recipe

    </button>
  );

  const buttonStart = (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="button-details"
      disabled={ performedRecipes }
      onClick={ () => {
        history.push(`/drinks/${history.location.pathname.split('/')[2]}/in-progress`);
      } }
    >

      Start Recipe

    </button>
  );

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
              src={ item.strDrinkThumb }
              alt="ilustração"
            />
            <h1
              data-testid="recipe-title"
            >
              {item.strDrink}
            </h1>
            {
              textCopyLink
                ? <p>Link copied!</p>
                : buttonShare
            }
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favoritar
            </button>
            <h3
              data-testid="recipe-category"
            >
              {item.strAlcoholic}
            </h3>
            <div>
              <h4> Ingredients </h4>
              {
                arrayIngredients.map((elemento, numbers) => (
                  <div
                    data-testid={ `${numbers}-ingredient-name-and-measure` }
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
              <h6> Recommended </h6>
              <div
                className="recomended"
              >
                {
                  arrayPatternFood.map((food, amount) => (
                    <div
                      className="card-recomended"
                      data-testid={ `${amount}-recomendation-card` }
                      key={ amount }
                    >
                      <img
                        src={ food.strMealThumb }
                        alt="ilustração"
                        height="200"
                        width="180"
                      />
                      <p
                        className="card-category"
                      >
                        {food.strCategory}

                      </p>
                      <h1
                        data-testid={ `${amount}-recomendation-title` }
                        className="card-name"
                      >
                        {food.strMeal}

                      </h1>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
      {
        continueRecipes ? buttonContinue : buttonStart
      }
    </div>

  );
}

export default DetailsDrink;
