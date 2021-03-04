function printData(drinks_1) {
    console.log(drinks_1);
    var drinkMarkupList = [];
    for (let drink of drinks_1.drinks) {
        drinkMarkupList.push(`
            <div class="container m-4 p-4 drink-container">
            <h2 class="drink-name">${drink.strDrink}</h2>
            <img class="drink-img" src="${drink.strDrinkThumb}" alt="A glass of ${drink.strDrink}" />
            </div>
        `);
    }
    const markup = drinkMarkupList.join("");
    $('#js-drink-container').html(markup);
}

$.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin").done(printData);

//$('.js-cocktails.container')