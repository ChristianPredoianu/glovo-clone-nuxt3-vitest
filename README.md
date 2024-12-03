   # Food Recipe App Vue 3 + Vite 

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) 
 
 <!-- PROJECT LOGO -->   
<br />
<p align="center">
  <a href="https://github.com/ChristianPredoianu/food-app-vue">
    <img src="src/assets/food.jpg" alt="Logo" width="300" height="200">
  </a> 
 
  <h3 align="center">Food Recipe App</h3>
   
  <p align="center">
    <a href="https://github.com/ChristianPredoianu/food-app-vue"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://foodrecipeappvue.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/ChristianPredoianu/food-app-vue/issues">Report Bug</a>
  </p>
</p>

  

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


NOTE: PLEASE NOTE THAT THE EDAMAM FREE API ONLY ALLOWS 10 THROTTLING CALLS/MIN HENCE THE 429 Error – Too Many Requests AFTER 10 CALLS/MIN!
<br>
A food recipe app for looking up recipes, see details about a recipe, search for a recipe, sign up, sign in to add favorite recipes to admin page.

### Built With

* [Vue.js 3 (script setup)](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Vue Router](https://router.vuejs.org/)
* [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Sass](https://sass-lang.com/)
* [Firebase](https://firebase.google.com/)
* [Localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ChristianPredoianu/food-app-vue.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ``` 
3. Serve with hot reload at localhost
   ```sh
    npm run dev
   ``` 
5. Build for production 
   ```sh
    npm run build
   
   ```

<!-- USAGE EXAMPLES -->
## Usage

The user is given some default recipes from the Edamam recipe Api when the home page loads. The user can either search for recipes
in the navigation or the search box. When clicking the filter button a modal shows up where the user can filter recipes and also view details about the recipe, like nutrients, tags and other relevant information.
When the user reaches the bottom of the page, additional recipes are loaded (infinite scroll) with some limitations (scrolling 3 times max)
because of limit from the Edamam recipe API free plan. You can add recipes to your favorites. If the user tries to add a recipe without
being authenticated the user is redirected to the sign in page. If the user is not a member he/she can become one by filling out a form 
that uses validation to give information to the user what inputs are incorrect/correct. After being authenticated (Firebase auth) the user 
can add or remove favorite recipes to the admin page. The app uses Firebase realtime database to store a users favorite recipes.

To try out the app just sign up with a username, email and password. The email doesn't have to be a real one as long as it follows the format of an email.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Christian Predoianu - [@linkedin](https://se.linkedin.com/in/christian-predoianu-369218157) - christianpredoianu@yahoo.com

Project Link: [https://github.com/ChristianPredoianu/food-app-vue](https://github.com/ChristianPredoianu/food-app-vue)



<!-- ACKNOWLEDGEMENTS --> 
## Acknowledgements
* [Edamam Recipe Api](https://developer.edamam.com/edamam-recipe-api)
* [Google Fonts](https://fonts.google.com/)
* [Font-Awesome](https://fontawesome.com/)






