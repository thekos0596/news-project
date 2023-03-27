export let currentNewsPage = [];
export const currentPage = [];
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
      id: res.title,
    });
  });
  // console.log(currentNewsPage);
  return currentNewsPage;
}
export function normalizationSearch(res) {
  currentNewsPage = [];
  res.response.docs.map(r => {
    currentNewsPage.push({
      section: r.section_name,
      title: r.headline.main,
      abstract: r.abstract,
      published_date: r.pub_date,
      multimedia: r.multimedia || [],
      url: r.web_url,
      id: r.headline.main,
    });
  });
  // console.log(currentNewsPage);
  return currentNewsPage;
}
