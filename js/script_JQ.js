function printData(cocktails) {
   
    var drinkMarkupList = [];
    for (let drink of cocktails.drinks) {
        drinkMarkupList.push(`
            <div class="container my-4 py-4 p-sm-4 drink-container js-drink-single-box" data-id="${drink.idDrink}">
              <div class="js-front front-container">
                <h2 class="drink-name">${drink.strDrink}</h2>
                <img class="drink-img" src="${drink.strDrinkThumb}" alt="A glass of ${drink.strDrink}" />
              </div>
            </div>
        `);
    }
    const markup = drinkMarkupList.join("");
    $('#js-drink-container').html(markup);
} 

function printIngredientsData(ingredients, id) {
    var ingredientsMarkupList = [];  
    for(let details of ingredients.drinks) {
        let listItems = '';
        for (let i = 1; i <= 15; i+=1) {
            const ingredient = details['strIngredient' + i];
            const measure = details['strMeasure' + i];
            if (typeof ingredient === 'string') {
                listItems += `<li>${ingredient} (${measure || ''})</li>`;
            }
        }

        ingredientsMarkupList.push(`
            <div data-id="${details.idDrink}" class="js-back">
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                    ${listItems}
                    </ul>
                </div>
                <div>
                    <h3>How to make it</h3>
                    <p>${details.strInstructions}</p>
                </div>
            </div>    
        `);
    };
    
    const detailsMarkup = ingredientsMarkupList.join("");
    $(`.js-drink-single-box[data-id=${id}] .js-front`).hide();
    $(`.js-drink-single-box[data-id=${id}]`).append(detailsMarkup);
    
}


function handleIngredientsClick(e) {
    //console.log(e);
    //debugger;
    let id = $(e.target).data('id');
    
    if ( typeof id === 'undefined' ) {
        id = $(e.target).parent().data('id');
        if ( typeof id === 'undefined' ) {
            id = $(e.target).parent().parent().data('id');
            if (typeof id === 'undefined') {
                id = $(e.target).parent().parent().parent().data('id');
            }
        }
    }

    if (typeof id !== 'undefined') {
        const hasBackSide = $(`.js-drink-single-box[data-id=${id}] .js-back`).length === 1;
        if ( hasBackSide ) {
            $(`.js-drink-single-box[data-id=${id}] .js-back`).toggle('');
            $(`.js-drink-single-box[data-id=${id}] .js-front`).toggle('');
        } else {
            const ingredientsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
            $.get(ingredientsUrl).done(ingredients => printIngredientsData(ingredients, id));
        }
        
    };
}

$('#js-drink-container').click(handleIngredientsClick);

loadDrinks();

function loadDrinks() {
    const ingredient = $('[name = js-ingredients]').val();
    $.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).done(printData);
}
$('[name = js-ingredients]').change(loadDrinks);

