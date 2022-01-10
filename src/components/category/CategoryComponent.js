export class CategoryComponent {
  constructor(parent, news) {
    this.parent = parent;
    this.news = news;
  }

  getHTML(data) {
    return `
                <div class="card mb-3" style="width: 840px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.picture_url}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-4">
                        ${data.date_time}
                    </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <details class="card-text"><summary>Подробнее</summary>${data.description}</details>
                            </div>
                        </div>
                    </div>
                </div>
            `;
  }

  render(data) {
    const dt = new Date(data.date_time);
    console.log(dt);
    var d = dt.getDate();
    var m = dt.getMonth() + 1;
    var y = dt.getFullYear();
    var h = dt.getHours();
    var min = dt.getMinutes();
    d = d > 9 ? d : "0" + d;
    m = m > 9 ? m : "0" + m;
    h = h > 9 ? h : "0" + h;
    min = min > 9 ? min : "0" + min;
    const strDate = d + "-" + m + "-" + y + " " + h + ":" + min;
    data.date_time = strDate;
    const html = this.getHTML(data);

    this.parent.insertAdjacentHTML("beforeend", html);
  }
}
