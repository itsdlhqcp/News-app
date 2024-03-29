import alanBtn from '@alan-ai/alan-sdk-web';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NewsCards from './NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';

const VoiceScreen =() => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    
    useEffect(() => {
        alanBtn({
            key: '190254eb16a8a0645ea8924c3f109dda2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.');
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            },
        })
    }, [])
  return (
    <div style={{ marginBottom: '3rem' }}>
    <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    <footer style={{ fontSize: '0.8rem' }}>
        © 2023 developed by dlhq. All rights reserved.
      </footer>
    </div>
  );
}

export default VoiceScreen;
