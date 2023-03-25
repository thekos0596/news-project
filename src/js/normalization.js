export const currentNewsPage = [];

export function normalization(res) {
  res.results.map(res => {
    currentNewsPage.push({
      section: res.section,
      title: res.title,
      abstract: res.abstract,
      published_date: res.published_date,
      multimedia: res.multimedia || [],
      url: res.url,
    });
  });
  console.log(currentNewsPage);
  return currentNewsPage;
}
