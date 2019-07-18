
// JS - ./js/index.js
import './js/'
// SCSS
import './scss/main.scss'

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./svg/', true, /\.svg$/));
