import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getFinancialNews, NewsItem } from '../services/newsService';

// Mock data for development and fallback
const mockNews: NewsItem[] = [
  {
    title: "Understanding Mutual Fund Investment Strategies",
    url: "#",
    time_published: new Date().toISOString(),
    summary: "A comprehensive guide to different mutual fund investment strategies and how to choose the right one for your portfolio.",
    source: "Financial Insights",
  },
  {
    title: "Market Analysis: Top Performing Mutual Funds",
    url: "#",
    time_published: new Date().toISOString(),
    summary: "Analysis of the best performing mutual funds in various categories over the last quarter, with insights into their investment approaches.",
    source: "Market Watch",
  },
  {
    title: "SIP vs Lump Sum: Making the Right Choice",
    url: "#",
    time_published: new Date().toISOString(),
    summary: "Detailed comparison between Systematic Investment Plans (SIP) and lump sum investments in mutual funds, helping investors make informed decisions.",
    source: "Investment Guide",
  }
];

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('Fetching news...');
        setLoading(true);
        const newsData = await getFinancialNews();
        console.log('News data received:', newsData);
        
        if (newsData && newsData.length > 0) {
          setNews(newsData);
          setError(null);
        } else {
          console.log('No news data, using mock data');
          setNews(mockNews);
          setError("Using sample data. No real-time news available at the moment.");
        }
      } catch (err) {
        console.error('Error in News component:', err);
        setNews(mockNews);
        setError("Unable to fetch real-time news. Using sample data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading financial news...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        Financial News
      </motion.h1>

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {news.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="block group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
                  {item.title}
                </h2>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                  {format(new Date(item.time_published), 'MMM dd, yyyy')}
                </span>
              </div>
              
              {item.banner_image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={item.banner_image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              
              <p className="text-gray-300 mb-4 line-clamp-3">{item.summary}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-400">{item.source}</span>
                <span className="text-indigo-400 group-hover:translate-x-2 transition-transform duration-300">
                  Read more →
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
