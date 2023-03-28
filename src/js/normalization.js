import { log } from 'util';

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

export function normalizationPopular(res) {
  currentNewsPage = [];
  let media;
  res.results.map(r => {
    const arrMedia = r.media.map(m => m['media-metadata']);

    for (const arr of arrMedia) {
      media = arr;
    }
    currentNewsPage.push({
      section: r.section,
      title: r.title,
      abstract: r.abstract,
      published_date: r.published_date,
      multimedia: media || [],
      url: r.url,
      id: r.title,
    });
  });
  // console.log(currentNewsPage);
  return currentNewsPage;
}
