import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import ContextFood from './ContextFood';

function ProviderFood({ children }) {
  // MagicNumbers
  const TWELVE = 12;
  const FIVE = 5;
  const [categoryApiFood, setCategoryApiFood] = useState([]);
  const [arrayPatternFood, setArrayPatternFood] = useState([]);
  const [nameLink, setNameLink] = useState('');
  const [pathFood, setPathFood] = useState('/foods');
  const [filterSearch, setFilterSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(false);

  /* const ActualLocation = () => {
    const actualPath = useLocation();
    setPathFood(actualPath);
  };
 */
  async function apiFood() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setArrayPatternFood(data.meals.slice(0, TWELVE));
    } catch (e) {
      console.log(e);
    }
    setNameLink('');
  }
  useEffect(() => {
    apiFood();
  }, []);
  useEffect(() => {
    const apiCategory = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategoryApiFood(data.meals.slice(0, FIVE));
      } catch (e) {
        console.log(e);
      }
    };
    apiCategory();
  }, []);

  async function handlebuttonFood(name) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await response.json();
      setArrayPatternFood(data.meals.slice(0, TWELVE));
    } catch (e) {
      console.log(e);
    }

    if (nameLink === name) {
      apiFood();
    }
    setNameLink(name);
  }

  function handleChange({ target }) {
    setFilterSearch(target.value);
  }

  function handleSearch({ target }) {
    setSearch(target.value);
  }

  async function searchByFirstLetter(firstletter) {
    try {
      if (select === true) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstletter}`);
        const data = await response.json();
        setFilteredResults(data.drinks);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstletter}`);
        const data = await response.json();
        setFilteredResults(data.meals);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function searchByName(name) {
    try {
      if (select === true) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        setFilteredResults(data.drinks);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        setFilteredResults(data.meals);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function searchByIngredient(ingredient) {
    try {
      if (select === true) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        setFilteredResults(data.drinks);
        console.log(data.drinks);
      } else {
        console.log('entrou errado');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        setFilteredResults(data.meals);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleFilterSearch() {
    if (filterSearch === 'First Letter' && search.length === 1) {
      searchByFirstLetter(search);
    } else if (filterSearch === 'First Letter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (filterSearch === 'Ingredient') {
      searchByIngredient(search);
    } else if (filterSearch === 'Name') {
      searchByName(search);
    } else {
      console.log('erro');
    }
  }
  async function allFunction() {
    apiFood();
  }

  const contextType = {
    categoryApiFood,
    arrayPatternFood,
    pathFood,
    filterSearch,
    filteredResults,
    select,
    setPathFood,
    handlebuttonFood,
    allFunction,
    handleChange,
    handleFilterSearch,
    handleSearch,
    setSelect,
  };

  return (
    <ContextFood.Provider value={ contextType }>
      { children }
    </ContextFood.Provider>
  );
}

ProviderFood.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderFood;
