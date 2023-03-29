export let currentNewsPage = [];

export function normalizeData(res, type) {
  switch (type) {
    case 'categories':
      currentNewsPage = res.results.map(r => ({
        section: r.section || 'Default section',
        title: r.title || 'This article has no title',
        abstract: r.abstract || 'This article has no description',
        published_date: r.published_date,
        multimedia: r.multimedia || [],
        url: r.url,
        id: r.title,
        data_set: 'categories',
      }));
      break;
    case 'search':
      currentNewsPage = res.response.docs.map(r => ({
        section: r.section_name || 'Default section',
        title: r.headline.main || 'This article has no title',
        abstract: r.abstract || 'This article has no description',
        published_date: r.pub_date,
        multimedia: r.multimedia || [],
        url: r.web_url,
        id: r.headline.main,
        data_set: 'search',
      }));
      break;
    case 'calendar':
      currentNewsPage = res.response.docs.map(r => ({
        section: r.section_name || 'Default section',
        title: r.headline.main || 'This article has no title',
        abstract: r.abstract || 'This article has no description',
        published_date: r.pub_date,
        multimedia: r.multimedia || [],
        url: r.web_url,
        id: r.headline.main,
        data_set: 'calendar',
      }));
      break;
    case 'popular':
      currentNewsPage = res.results.map(r => {
        const media = r.media.map(m => m['media-metadata'])[0];
        return {
          section: r.section || 'Default section',
          title: r.title || 'This article has no title',
          abstract: r.abstract || 'This article has no description',
          published_date: r.published_date,
          multimedia: media || [],
          url: r.url,
          id: r.title,
          data_set: 'popular',
        };
      });
      break;
    default:
      console.error(`Invalid data type: ${type}`);
      break;
  }
  return currentNewsPage;
}
