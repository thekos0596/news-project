export let currentNewsPage = [];
export default function normalization(res) {
  currentNewsPage = [];
  res.results.map(res => {
    currentNewsPage.push({
      section: res.section,
      title: res.title,
      abstract: res.abstract,
      published_date: res.published_date,
      multimedia: res.multimedia || [],
      url: res.url,
      id: null,
    });
  });

  return currentNewsPage;
}
