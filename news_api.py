import os
import requests
from dotenv import load_dotenv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_URL = "https://newsapi.org/v2/everything"

analyzer = SentimentIntensityAnalyzer()


def get_supplier_news(supplier: str):

    headers = {
        "X-Api-Key": NEWS_API_KEY
    }

    params = {
        "q": supplier,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 10
    }

    response = requests.get(
        NEWS_URL,
        headers=headers,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    articles = []

    positive_news = 0
    negative_news = 0
    neutral_news = 0

    sentiment_scores = []

    for article in data.get("articles", []):

        title = article.get("title") or ""
        description = article.get("description") or ""

        # Combine title + description
        text = title + " " + description

        # Sentiment analysis
        sentiment = analyzer.polarity_scores(text)
        compound = sentiment["compound"]

        sentiment_scores.append(compound)

        # Classify sentiment
        if compound >= 0.05:
            sentiment_label = "positive"
            positive_news += 1

        elif compound <= -0.05:
            sentiment_label = "negative"
            negative_news += 1

        else:
            sentiment_label = "neutral"
            neutral_news += 1

        articles.append({
            "title": title,
            "description": description,
            "source": article.get("source", {}).get("name"),
            "url": article.get("url"),
            "published_at": article.get("publishedAt"),
            "sentiment": sentiment_label,
            "sentiment_score": compound
        })

    # Number of articles actually processed
    news_count = len(articles)

    # Calculate average sentiment
    if news_count > 0:
        average_sentiment = sum(sentiment_scores) / news_count
        negative_ratio = negative_news / news_count
    else:
        average_sentiment = 0
        negative_ratio = 0

    return {
        "supplier": supplier,

        "total_results": data.get("totalResults", 0),

        "news_count": news_count,
        "positive_news": positive_news,
        "negative_news": negative_news,
        "neutral_news": neutral_news,

        "negative_ratio": round(negative_ratio, 3),
        "sentiment_score": round(average_sentiment, 3),

        "articles": articles
    }