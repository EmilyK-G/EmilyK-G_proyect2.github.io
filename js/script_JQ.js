//THE ORIGINAL
function printData(cocktails) {
   
    var drinkMarkupList = [];
    for (let drink of cocktails.drinks) {
        drinkMarkupList.push(`
            <div class="container my-4 p-4 drink-container js-drink-single-box" data-id="${drink.idDrink}">
            <h2 class="drink-name">${drink.strDrink}</h2>
            <img class="drink-img" src="${drink.strDrinkThumb}" alt="A glass of ${drink.strDrink}" />
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
            <div id="${details.idDrink}">
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
    
    $(`.js-drink-single-box[data-id=${id}]`).html(detailsMarkup);
    
}


function handleIngredientsClick(e) {
    console.log(e);
    //debugger;
    let id = $(e.target).data('id');
    if ( typeof id === 'undefined' ) {
        id = $(e.target).parent().data('id');
    }

    if (typeof id !== 'undefined') {
        const ingredientsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        $.get(ingredientsUrl).done(ingredients => printIngredientsData(ingredients, id));
    };
}

$('#js-drink-container').click(handleIngredientsClick);

loadDrinks();

function loadDrinks() {
    const ingredient = $('[name = js-ingredients]').val();
    $.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).done(printData);
}
$('[name = js-ingredients]').change(loadDrinks);












/*
function printData(cocktails) {
   
    var drinkMarkupList = [];
    for (let drink of cocktails.drinks) {
        drinkMarkupList.push(`
            <div class="container my-4 p-4 drink-container js-drink-single-box" data-id="${drink.idDrink}">
            <h2 class="drink-name">${drink.strDrink}</h2>
            <img class="drink-img" src="${drink.strDrinkThumb}" alt="A glass of ${drink.strDrink}" />
            </div>
        `);
        const drinkBox = $('#js-drink-container');
        const drinkBoxDomNode = drinkBox[0];
        drinkBox.click(function (e){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`).then(res => res.json()).then(data => {
                let div = document.createElement('div');
                let list = document.createElement('ul');
                div.textContent = (`<h2>${data.strDrink}</h2><p>${data.strInstructions}<p>`);
                if (typeof data.drinks[0] === 'object') {
                    const drink = data.drinks[0];
                    for(let x=1; x<16; x++){
                        if (typeof data.drinks[0] === 'object') {
                            let li = document.createElement('li');
                            li.textContent = (`${drink[`strIngredient${x}`]} --> ${drink[`strMeasure${x}`]}`);
                            list.appendChild(li);
                        }
                    }
                }
                div.appendChild(list);
                drinkBoxDomNode.appendChild(div);
            });
            
        });
    } 
    const markup = drinkMarkupList.join("");
    $('#js-drink-container').html(markup);
} 




function loadDrinks() {
    const ingredient = $('[name = js-ingredients]').val();
    $.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).done(printData);
}
$('[name = js-ingredients]').change(loadDrinks);

*/






//JQUERY METHOD (INCOMPLETE)
/*
function printIngredientsData(ingredients) {
    var ingredientsMarkupList = [];  
    for(let details of ingredients.drinks) {
        ingredientsMarkupList.push(`
            <div id="${details.idDrink}">
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                    <li>${details.strIngredient1} --> ${details.strMeasure1}</li>
                    <li>${details.strIngredient2} --> ${details.strMeasure2}</li>
                    <li>${details.strIngredient3} --> ${details.strMeasure3}</li>
                    <li>${details.strIngredient4} --> ${details.strMeasure4}</li>
                    <li>${details.strIngredient5} --> ${details.strMeasure5}</li>
                    <li>${details.strIngredient6} --> ${details.strMeasure6}</li>
                    <li>${details.strIngredient7} --> ${details.strMeasure7}</li>
                    <li>${details.strIngredient8} --> ${details.strMeasure8}</li>
                    <li>${details.strIngredient9} --> ${details.strMeasure9}</li>
                    <li>${details.strIngredient10} --> ${details.strMeasure10}</li>
                    <li>${details.strIngredient11} --> ${details.strMeasure11}</li>
                    <li>${details.strIngredient12} --> ${details.strMeasure12}</li>
                    <li>${details.strIngredient13} --> ${details.strMeasure13}</li>
                    <li>${details.strIngredient14} --> ${details.strMeasure14}</li>
                    <li>${details.strIngredient15} --> ${details.strMeasure15}</li>
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
    
        $('.js-drink-single-box').html(detailsMarkup);
    
}


function handleIngredientsClick(e) {
    console.log(e);
    //debugger;
    let id = $(e.target).data('id');
    if ( typeof id === 'undefined' ) {
        id = $(e.target).parent().data('id');
    }

    if (typeof id !== 'undefined') {
        const ingredientsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        $.get(ingredientsUrl).done(printIngredientsData);
    };
}

$('#js-drink-container').click(handleIngredientsClick);

loadDrinks();
*/






//ANOTHER METHOD USING THE COCKTAIL DETAILS API
/*
function printData(drinks1) {
    
    var drinkMarkupList = [];
    for (let drink of drinks1.drinks) {
        drinkMarkupList.push(`
            <div class="container my-4 p-4 drink-container">
            <h2 class="drink-name">${drink.strDrink}</h2>
            <img class="drink-img" src="${drink.strDrinkThumb}" alt="A glass of ${drink.strDrink}" />
            </div>
        `);
    }


    for (const key in drinks) {
        
    }
    
    


    const markup = drinkMarkupList.join("");
    $('#js-drink-container').html(markup);
}

function loadDrinks() {
    const ingredient = $('[name = js-ingredients]').val();
    $.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).done(printData);
    

}
$('[name = js-ingredients]').change(loadDrinks);
loadDrinks();
*/