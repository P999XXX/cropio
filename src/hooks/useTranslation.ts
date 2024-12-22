import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTranslation = (text: string) => {
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      const targetLang = localStorage.getItem('preferredLanguage') || 'en';
      
      // Don't translate if the target language is English
      if (targetLang === 'en') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate', {
          body: { text, targetLang },
        });

        if (error) throw error;

        if (data?.data?.translations?.[0]?.translatedText) {
          setTranslatedText(data.data.translations[0].translatedText);
        }
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(text); // Fallback to original text
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text]);

  return { translatedText, isLoading };
};