export let currentNewsPage = [];

export default function normalization(res) {
  // currentNewsPage = [];
  res.results.map(r => {
    currentNewsPage.push({
      section: r.section || 'Default section',
      title: r.title || 'This article has no title',
      abstract: r.abstract || 'This article has no description',
      published_date: r.published_date,
      multimedia: r.multimedia || [],
      url: r.url,
      id: r.title,
      data_set: 'categories',
    });
  });

  return currentNewsPage;
}

export function normalizationCategories(res) {
  // currentNewsPage = [];
  res.results.map(r => {
    currentNewsPage.push({
      section: r.section || 'Default section',
      title: r.title || 'This article has no title',
      abstract: r.abstract || 'This article has no description',
      published_date: r.published_date,
      multimedia: r.multimedia || [],
      url: r.url,
      id: r.title,
      data_set: 'categories',
    });
  });

  return currentNewsPage;
}

export function normalizationSearch(res) {
  // currentNewsPage = [];
  res.response.docs.map(r => {
    currentNewsPage.push({
      section: r.section_name || 'Default section',
      title: r.headline.main || 'This article has no title',
      abstract: r.abstract || 'This article has no description',
      published_date: r.pub_date,
      multimedia: r.multimedia || [],
      url: r.web_url,
      id: r.headline.main,
      data_set: 'search',
    });
  });

  return currentNewsPage;
}

export function normalizationPopular(res) {
  // currentNewsPage = [];
  let media;
  res.results.map(r => {
    const arrMedia = r.media.map(m => m['media-metadata']);

    for (const arr of arrMedia) {
      media = arr;
    }
    currentNewsPage.push({
      section: r.section || 'Default section',
      title: r.title || 'This article has no title',
      abstract: r.abstract || 'This article has no description',
      published_date: r.published_date,
      multimedia: media || [],
      url: r.url,
      id: r.title,
      data_set: 'popular',
    });
  });

  return currentNewsPage;
}
