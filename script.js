import constructUrl from './utils/urls.js';
import renderHome from './components/home.js';



// Don't touch this function please
const autorun = async () => {
  renderHome();
};

document.addEventListener('DOMContentLoaded', autorun);
