import { CategoryComponent } from "../../components/category/CategoryComponent.js";
import { BackButtonComponent } from "../../components/button/BackButtonComponent.js";
import { MainPage } from "../../pages/main/MainPage.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

export class CategoryPage {
  constructor(parent, id, news) {
    this.parent = parent;
    this.id = id;
    this.news = news;
  }

  async getData() {
    return ajax.get(urls.news())
  }

  get page() {
    return document.getElementById("category-page");
  }

  getHTML() {
    return `
                <div id="category-page">
                </div>
            `;
  }
  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }
  async render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    const backButton = new BackButtonComponent(this.page);
    backButton.render(this.clickBack.bind(this));
    const data = await this.getData();
    data.data.reverse();
    console.log(data)
    data.data.forEach((item) => {
      if  (item.category_id ==this.id){
      const category = new CategoryComponent(this.page, item);
      category.render(item);
      }
    });
    
  }
}
