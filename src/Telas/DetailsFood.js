import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';
import favoritImageHeart from '../images/whiteHeartIcon.svg';
import favoritImageBlackHeart from '../images/blackHeartIcon.svg';
import ContextDetailsFood from '../context/ContextDetailsFood';
import '../DetailsCss/details.css';

function DetailsFood() {
  const { arrayId, functionPullId,
    arrayIngredients, arrayPatternDrink,
    performedRecipes, // doneRecipes,
    // inProgressRecipes,
    continueRecipes,
    clickCopy, textCopyLink,
    clickHeartBlack, setFavoritBlackHeart,
    favoritBlackHeart } = useContext(ContextDetailsFood);

  const history = useHistory();
  const idHistory = history.location.pathname.split('/')[2];

  function checkHeartBlack() {
    const localFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorit !== null) {
      const ifTrue = localFavorit.some((item) => (item.id === idHistory));
      setFavoritBlackHeart(ifTrue);
    }
  }

  useEffect(() => {
    checkHeartBlack();
    functionPullId();
    // doneRecipes();
    // inProgressRecipes();
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);
  const buttonContinue = (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="button-details"
      disabled={ performedRecipes }
      onClick={ () => { history.push('/foods/'); } }
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
        history.push(`/foods/${history.location.pathname.split('/')[2]}/in-progress`);
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
              src={ item.strMealThumb }
              alt="ilustra????o"
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
              type="button"
              onClick={ () => { clickHeartBlack(); } }
            >
              <img
                data-testid="favorite-btn"
                src={ favoritBlackHeart ? favoritImageBlackHeart : favoritImageHeart }
                alt="Favorit"
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
              <h6>V??deo</h6>
              <iframe
                data-testid="video"
                width="240"
                height="340"
                src={ `https://www.youtube.com/embed/${item.strYoutube.split('=')[1]}` }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h6>
                Recommended
              </h6>
              <div
                className="recomended"
              >
                {
                  arrayPatternDrink.map((drink, amount) => (
                    <div
                      className="card-recomended"
                      data-testid={ `${amount}-recomendation-card` }
                      key={ amount }
                    >
                      <img
                        src={ drink.strDrinkThumb }
                        alt="ilustra????o"
                        height="200"
                        width="180"
                      />
                      <p
                        className="card-category"
                      >
                        {drink.strAlcoholic}

                      </p>
                      <h1
                        data-testid={ `${amount}-recomendation-title` }
                        className="card-name"
                      >
                        {drink.strDrink}

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

export default DetailsFood;
