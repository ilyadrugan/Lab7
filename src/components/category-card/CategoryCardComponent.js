export class CategoryCardComponent {
  constructor(parent) {
    this.parent = parent;
  }
  getHTML(data) {
    return `
                <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.picture}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.name_eng}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
                </div>
            `;
  }
  addListeners(data, listener) {
    //console.log(data, listener);
    document
      .getElementById(`click-card-${data.id}`)
      .addEventListener("click", listener);
  }

  render(data, listener) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
//console.log(html);
    this.addListeners(data, listener);
  }
}
