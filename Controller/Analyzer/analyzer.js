import pkg from 'natural';
const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = pkg;
import { removeStopwords } from 'stopword';

export const getSentiments = (texts) => {
    try {
        const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

        const results = texts.map((text, index) => {
            try {
                const tokenizer = new WordTokenizer();
                const words = tokenizer.tokenize(text);

                const filteredWords = removeStopwords(words);

                const stemmedWords = filteredWords.map(word => PorterStemmer.stem(word));

                const sentimentScore = analyzer.getSentiment(stemmedWords);

                const sentimentLabel = sentimentScore > 0 ? 'positive' : sentimentScore < 0 ? 'negative' : 'neutral';

                return {
                    index,
                    text,
                    sentiment: {
                        score: sentimentScore,
                        label: sentimentLabel,
                    },
                };
            } catch (error) {
                console.log(`Error analyzing sentiment for text ${index + 1}: ${error}`);
                return {
                    index,
                    error: 'Error analyzing sentiment',
                };
            }
        });

        return results;
    } catch (error) {
        console.log('Error analyzing sentiments:', error);
        return [{
            error: 'Error analyzing sentiments',
        }];
    }
};
