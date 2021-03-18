const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
const output = document.querySelector('#js-drink-container');

fetch(url).then(res => res.json()).then( cocktails => {
    cocktails.drinks.forEach(val => {
        out.innerHTML += `<div>${val.strDrink}</div>
        <br/>
        <img src="${val.strDrinkThumb}" alt="Drink image" />`;
    });
})    

fetch(url).then(res => res.json()).then(getId => getId.drinks.forEach(val => {
        var idValue = val.idDrink;
        console.log(idValue);
        const urlId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idValue}`;
        })).then(instructions => {
            console.log(instructions);
            if (typeof instructions === 'undefined') {
                return;
            }
            var instructionsMarkupList = [];
        for(let drink of instructions.drinks) {
            instructionsMarkupList.push(`
            <h2>Instructions</h2>
              <div>
                <ul>
                  <li>${drink.strIngredient1}</li>
                  <li>${drink.strIngredient2}</li>
                  <li>${drink.strIngredient3}</li>
                </ul>
              </div>
            <div>${drink.strInstructions}</div>
            `);
            };
            const markup = instructionsMarkupList.join("");
            $('#js-drink-container').html(markup);
        })