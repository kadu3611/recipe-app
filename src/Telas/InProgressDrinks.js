import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';
import ContextDetailsDrinks from '../context/DetailsDrinks/ContextDetailsDrinks';
import '../DetailsCss/details.css';
import favoritImageHeart from '../images/whiteHeartIcon.svg';
import favoritImageBlackHeart from '../images/blackHeartIcon.svg';

function InProgressDrinks() {
  const { arrayId, functionPullId,
    arrayIngredients,
    // doneRecipes,
    // inProgressRecipes,
    // clickCopy,
    clickCopyInpRogress,
    textCopyLink, favoritBlackHeart,
    clickHeartBlack, setFavoritBlackHeart,
    alterChecked, setAlterChecked } = useContext(ContextDetailsDrinks);

  const history = useHistory();
  const idHistory = (history.location.pathname.split('/')[2]);

  function addIdLocal() {
    const localS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const objectNew = {
      ...localS,
      cocktails: { ...localS.cocktails, [idHistory]: [] },
    };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(objectNew));
  }

  function submitLocalRecipes(name) {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idName = local.cocktails[idHistory];
    if (alterChecked.some((item) => item === name)) {
      const withdrawArray = alterChecked.filter((elemento) => elemento !== name);
      setAlterChecked(withdrawArray);
    } else {
      setAlterChecked([...alterChecked, name]);
    }
    if (idName.some((item) => item === name)) {
      const arrayName = idName.filter((item) => item !== name);
      const withdrawLocal = {
        ...local,
        cocktails: { ...local.cocktails, [idHistory]: [...arrayName] },
      };
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(withdrawLocal));
    } else {
      const newObject = {
        ...local,
        cocktails: { ...local.cocktails,
          [idHistory]: [...local.cocktails[idHistory], name] },
      };
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(newObject));
    }
  }

  function checkHeartBlack() {
    const localFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorit !== null) {
      const ifTrue = localFavorit.some((item) => (item.id === idHistory));
      setFavoritBlackHeart(ifTrue);
    }
  }

  useEffect(() => {
    functionPullId();
    /* inProgressRecipes(); */
    // doneRecipes();
    checkHeartBlack();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: { [idHistory]: [] },
          meals: {} }));
    } else {
      addIdLocal();
    }
  }, []);

  const buttonShare = (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ () => { clickCopyInpRogress(); } }
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
              alt="ilustra????o"
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
              {item.strAlcoholic}
            </h3>
            <div>
              <h4> Ingredients </h4>
              {
                arrayIngredients.map((elemento, numbers) => (
                  <div
                    data-testid={ `${numbers}-ingredient-step` }
                    key={ numbers }
                  >
                    <input
                      id={ numbers }
                      type="checkbox"
                      defaultChecked={
                        alterChecked.some((name) => name === elemento.ingredients)
                      }
                      name={ ` ${elemento.ingredients} ${elemento.measure}` }
                      value={ ` ${elemento.ingredients} - ${elemento.measure}` }
                      onChange={ () => submitLocalRecipes(elemento.ingredients) }
                    />
                    <label htmlFor={ numbers }>
                      { ` ${elemento.ingredients} - ${elemento.measure}` }

                    </label>
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
              <Link to="/done-recipes">
                <button
                  data-testid="finish-recipe-btn"
                  type="button"
                  className="button-details"
                  disabled={ !(arrayIngredients
                    .every((elemento, name) => (
                      elemento.ingredients === alterChecked[name]))) }
                  // alterChecked
                >
                  {console.log() }
                  Finish Recipe
                </button>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default InProgressDrinks;
