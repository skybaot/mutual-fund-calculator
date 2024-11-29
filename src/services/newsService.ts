import axios from 'axios';

const API_KEY = 'Mc0het73qMs95FQLfzlE6Gl6qnDFO9x8JHjuuPLp';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  banner_image?: string;
  source: string;
}

export const getFinancialNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: 'NEWS_SENTIMENT',
        topics: 'financial_markets,mutual_funds',
        apikey: API_KEY,
      },
    });

    if (response.data.feed && Array.isArray(response.data.feed)) {
      return response.data.feed.map((item: any) => ({
        title: item.title,
        url: item.url,
        time_published: item.time_published,
        summary: item.summary,
        banner_image: item.banner_image,
        source: item.source,
      }));
    }

    console.error('Invalid response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
