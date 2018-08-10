import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.css';

const Burger = ( {ingredients} ) => {


  /* Max's way of making array of ingredients
     returns nested array */

  // const ingredientList = Object.keys(ingredients)
  //   .map(ig => {
  //     return [...Array(ingredients[ig])].map((_, i) => {
  //       return <Ingredient key={ig+i} type={ig} />
  //     });
  //   });

  let ingredientList = [];

  for(let item in ingredients) {
    for(let i = 0; i < ingredients[item]; i++) {
      ingredientList.push(
        <Ingredient type={item} key={`${item}-${i+1}`} />
      );
    }
  }

  if(ingredientList.length === 0) {
    ingredientList = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <Ingredient type='bread-top' />
      {ingredientList}
      <Ingredient type='bread-bottom' />
    </div>
  );
}


export default Burger;
