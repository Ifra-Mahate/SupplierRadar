
import os
import requests
from dotenv import load_dotenv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_URL = "https://newsapi.org/v2/everything"

analyzer = SentimentIntensityAnalyzer()


# =========================================================
# NEGATIVE RISK KEYWORDS
# =========================================================

RISK_KEYWORDS = [
    "strike",
    "flood",
    "fire",
    "shutdown",
    "protest",
    "delay",
    "crisis",
    "ban",
    "earthquake"
]


# =========================================================
# GET SUPPLIER NEWS
# =========================================================

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

    keyword_risk_news = 0
    keyword_matches = {}

    sentiment_scores = []

    # Initialize keyword counters
    for keyword in RISK_KEYWORDS:
        keyword_matches[keyword] = 0

    # =====================================================
    # PROCESS ARTICLES
    # =====================================================

    for article in data.get("articles", []):

        title = article.get("title") or ""
        description = article.get("description") or ""

        # Combine title + description
        text = title + " " + description

        text_lower = text.lower()

        # -------------------------------------------------
        # KEYWORD CHECK
        # -------------------------------------------------

        matched_keywords = []

        for keyword in RISK_KEYWORDS:

            if keyword in text_lower:
                matched_keywords.append(keyword)
                keyword_matches[keyword] += 1

        if matched_keywords:
            keyword_risk_news += 1

        # -------------------------------------------------
        # SENTIMENT ANALYSIS
        # -------------------------------------------------

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

        # -------------------------------------------------
        # SAVE ARTICLE DATA
        # -------------------------------------------------

        articles.append({
            "title": title,
            "description": description,
            "source": article.get("source", {}).get("name"),
            "url": article.get("url"),
            "published_at": article.get("publishedAt"),
            "sentiment": sentiment_label,
            "sentiment_score": compound,
            "matched_keywords": matched_keywords
        })

    # =====================================================
    # CALCULATE NEWS DATA
    # =====================================================

    news_count = len(articles)

    if news_count > 0:

        average_sentiment = (
            sum(sentiment_scores) / news_count
        )

        negative_ratio = negative_news / news_count

        keyword_risk_ratio = (
            keyword_risk_news / news_count
        )

    else:

        average_sentiment = 0
        negative_ratio = 0
        keyword_risk_ratio = 0

    return {
        "supplier": supplier,

        "total_results": data.get(
            "totalResults",
            0
        ),

        "news_count": news_count,

        "positive_news": positive_news,

        "negative_news": negative_news,

        "neutral_news": neutral_news,

        "keyword_risk_news": keyword_risk_news,

        "keyword_risk_ratio": round(
            keyword_risk_ratio,
            3
        ),

        "keyword_matches": keyword_matches,

        "negative_ratio": round(
            negative_ratio,
            3
        ),

        "sentiment_score": round(
            average_sentiment,
            3
        ),

        "articles": articles
    }


# =========================================================
# NEWS RISK SCORE
# =========================================================

def get_supplier_risk_score(supplier: str):

    news_data = get_supplier_news(supplier)

    negative_ratio = news_data["negative_ratio"]

    keyword_risk_ratio = news_data[
        "keyword_risk_ratio"
    ]

    # -----------------------------------------------------
    # Combine sentiment risk + keyword risk
    # -----------------------------------------------------

    sentiment_risk = negative_ratio * 100

    keyword_risk = keyword_risk_ratio * 100

    # Give more importance to negative news
    risk_percentage = (
        sentiment_risk * 0.6
        + keyword_risk * 0.4
    )

    risk_percentage = round(
        risk_percentage,
        2
    )

    # -----------------------------------------------------
    # Risk Level
    # -----------------------------------------------------

    if risk_percentage <= 20:

        risk_level = "Low"

    elif risk_percentage <= 50:

        risk_level = "Medium"

    else:

        risk_level = "High"

    return {

        "supplier": supplier,

        "news_count":
            news_data["news_count"],

        "negative_news":
            news_data["negative_news"],

        "keyword_risk_news":
            news_data["keyword_risk_news"],

        "negative_ratio":
            news_data["negative_ratio"],

        "keyword_risk_ratio":
            news_data["keyword_risk_ratio"],

        "keyword_matches":
            news_data["keyword_matches"],

        "sentiment_score":
            news_data["sentiment_score"],

        "risk_percentage":
            risk_percentage,

        "risk_level":
            risk_level
    }


# =========================================================
# TEST
# =========================================================

if __name__ == "__main__":

    print("\n==============================")
    print("NEWS API TEST")
    print("==============================")

    result = get_supplier_risk_score(
        "Tata Steel"
    )

    print(
        "Supplier:",
        result["supplier"]
    )

    print(
        "News Count:",
        result["news_count"]
    )

    print(
        "Negative News:",
        result["negative_news"]
    )

    print(
        "Keyword Risk News:",
        result["keyword_risk_news"]
    )

    print(
        "Negative Ratio:",
        result["negative_ratio"]
    )

    print(
        "Keyword Risk Ratio:",
        result["keyword_risk_ratio"]
    )

    print(
        "Keyword Matches:",
        result["keyword_matches"]
    )

    print(
        "Sentiment Score:",
        result["sentiment_score"]
    )

    print(
        "Risk Percentage:",
        result["risk_percentage"]
    )

    print(
        "Risk Level:",
        result["risk_level"]
    )
