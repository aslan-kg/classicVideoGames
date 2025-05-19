# Style Sheets documentation

## Table on contents
* Introduction
* Script
* Toggle Style

## Introduction 
This is the CSS used in the Classic Video Games explorer project. It changes the colors to the webpage depending on the toggle style input is set to Dark or not useing JavaScript. The CSS can organized the elements created by Javascript Dom into grid section

## Script
```CSS
/*Global styles*/
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
:root{
    --primaryColor: #8991ff;
    --secondaryColor: #80eff5;
    --textColor: #000000;
    --searchBox: #fff;
    --toggleColor: #000;
    --toggleText: #fff;
}
.dark{
    --primaryColor: #1d215b;
    --secondaryColor: #006c71;
    --textColor: #fff;
    --searchBox: #cacaca;
    --toggleColor: #fff;
    --toggleText: #000;
}
/*Heading Styles*/
header{
    padding: 1.5em;
    display: flex;
    background-color: var(--secondaryColor);
    justify-content: space-between;
}
#title{
    display: flex;
}
img{
    width: 4em;
    height: 4em;

}
h1{
    margin-left: 0.4em;
    margin-top: 0.8em;
}
#toggleTheme{
    padding-left: 1em;
    padding-right: 1em;
    margin-right: 1em;
    border: 0.2em solid var(--toggleText);
    border-radius: 1em;
    font-size: 0.9em;
    background-color: var(--toggleColor);
    font-weight: bold;
    max-height: 5.5em;
    color: var(--toggleText);
    
}
#sessionTimer{
    font-size: 1.5em;
    margin-top: 0.4em;
    padding: 1em;
}

/*main section styles*/
main{
    background-color: var(--primaryColor);
    padding: 0;
}

/*Input styles*/
#input{
    display: grid;
    grid-template-rows: 1fr;
    justify-items: center;
    background-color: var(--primaryColor);
    padding: 2em;
}
#searchBox{
    display: block;
    font-size: 1em;
    margin-bottom: 1em;
    padding: 0.5em;
    border-radius: 5px;
    width: 20em;
    border: --textColor 2px solid;
    background-color: var(--searchBox);
    color: black;
}
.searchHistory{
    margin-bottom: 1em;
    color: var(--textColor);
}
#clearSearch{
    background-color: var(--secondaryColor);
    color: var(--textColor);
    font-size: 1em;
    padding: 0.5em;
    border: var(--textColor) solid 2.2px;
    border-radius: 6px;
}

/*Game section styles*/
#gameSection{
    background-color: var(--secondaryColor);
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr 1fr;
    min-height: 30em;
    color: var(--textColor);
    padding: 1em;
}
.gameClass{
    padding: 0.5em;
    background-color: #b0b5ff;
    border: rgb(0, 0, 0) solid 2px;
}
.gameClass img{
    min-height: 9em;
    min-width: 8em;
    margin-bottom: 1em;
}
.game-header{
    margin: 1em;
    padding: 1em;
    display: grid;
    grid-row: 1fr 1fr;
    justify-items: center;
}
/*Footer Styles*/
footer{
    background-color: var(--primaryColor);
    padding: 1em;
    color: var(--textColor);
    height: 4em;
}
```
## Toggle Styles

The JavaScript can communicate with the CSS. It can recive the input of the toggle button or pressing the D key, then change the class list of body element to light of dark. The Javascript can also get the theme from local storage.
```javascript
const themeToggle = document.getElementById('toggleTheme');

//load theme from localStorage
if (localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
}

//Save theme preference to localStorage
themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }
});

//Add keyboard shortcut for dark mode toggle
document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        themeToggle.click();
    }
});    
```
After the Javascript sets up a light or dark variable for the HTML body. The CSS has variables in the ``` :root ``` for default and ``` .dark ``` for dark mode.

```CSS
:root{
    --primaryColor: #8991ff;
    --secondaryColor: #80eff5;
    --textColor: #000000;
    --searchBox: #fff;
    --toggleColor: #000;
    --toggleText: #fff;
}
.dark{
    --primaryColor: #1d215b;
    --secondaryColor: #006c71;
    --textColor: #fff;
    --searchBox: #cacaca;
    --toggleColor: #fff;
    --toggleText: #000;
}
```