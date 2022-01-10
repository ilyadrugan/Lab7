import { CategoryCardComponent } from "../../components/category-card/CategoryCardComponent.js";
import { CategoryPage } from "../../pages/category/CategoryPage.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }
  getHTML() {
    return `
            <div id="main-page" class="d-flex flex-wrap"><div/>
        `;
  }
  get page() {
    return document.getElementById("main-page");
  }
  async getCategories() {
    return ajax.get(urls.categories());
  }
  async getNews() {
    return ajax.get(urls.news());
  }
  clickCard(e) {
    const cardId = e.target.dataset.id;
    //console.log(newsData);
    const categoryPage = new CategoryPage(this.parent, cardId);
    console.log(cardId);
    console.log(e, cardId, categoryPage);
    categoryPage.render();
  }

  setLastNewsPictureInCategory(newsData, categoriesData) {
    newsData.reverse();
    categoriesData.forEach((category) => {
      category["picture"] =
        "https://www.cbr.ru/legacy/PhotoStore/getimgid/40835.png";
      for (var i = 0; i < newsData.length; i++)
        if (newsData[i].category_id == category.id) {
          category["picture"] = newsData[i].picture_url;
          break;
        }
    });
    // console.log(categoriesData);
    // return categoriesData;
  }

  async render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const data = await this.getCategories();
    const newsData = await this.getNews();

    this.setLastNewsPictureInCategory(newsData.data, data.data);
    console.log(newsData);
    data.data.forEach((item) => {
      const categoryCard = new CategoryCardComponent(this.page);
      categoryCard.render(item, this.clickCard.bind(this));
    });
  }
}
