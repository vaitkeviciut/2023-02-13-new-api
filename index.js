import { navigationElement } from "./header.js";

const pageContent = document.querySelector('#page-content');

pageContent.before(navigationElement())
