var class10Products = [
  { id: "math10-master-notes", name: "Mathematics Master Notes", caption: "Complete algebra, trigonometry and geometry coverage.", price: 799, oldPrice: 999, hot: true, classLevel: 10 },
  { id: "science10-quick-revision", name: "Science Quick Revision", caption: "Physics, Chemistry and Biology condensed summaries.", price: 699, oldPrice: 850, hot: false, classLevel: 10 },
  { id: "english10-writing-guide", name: "English Writing Guide", caption: "Formats, essays, letters and grammar mastery.", price: 599, oldPrice: 750, hot: false, classLevel: 10 },
  { id: "sst10-toolkit", name: "Social Science Toolkit", caption: "History timelines, Civics breakdowns and Geography maps.", price: 749, oldPrice: 920, hot: false, classLevel: 10 },
];

var class11Products = [
  { id: "math11-master-notes", name: "Mathematics Master Notes", caption: "Complete algebra, trigonometry and geometry coverage.", price: 799, oldPrice: 999, hot: true, classLevel: 11 },
  { id: "science11-quick-revision", name: "Science Quick Revision", caption: "Physics, Chemistry and Biology condensed summaries.", price: 699, oldPrice: 850, hot: false, classLevel: 11 },
  { id: "english11-writing-guide", name: "English Writing Guide", caption: "Formats, essays, letters and grammar mastery.", price: 599, oldPrice: 750, hot: false, classLevel: 11 },
  { id: "sst11-toolkit", name: "Social Science Toolkit", caption: "History timelines, Civics breakdowns and Geography maps.", price: 749, oldPrice: 920, hot: false, classLevel: 11 },
];

var allProducts = class10Products.concat(class11Products);

function findProduct(id) {
  return allProducts.find(function (p) { return p.id === id; });
}
