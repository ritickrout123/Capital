import { createServerFn } from "@tanstack/react-start";

interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  responseStatus: string;
}

/**
 * Translate text using MyMemory API (free translation service)
 * Falls back to Google Cloud Translation API if configured
 */
export const translateText = createServerFn({ method: "POST" })
  .inputValidator((data: { text: string; from: "en" | "hi"; to: "en" | "hi" }) => data)
  .handler(async ({ data }) => {
    const { text, from, to } = data;
    
    if (!text || text.trim() === "") {
      return { translatedText: "" };
    }

    // Language codes for MyMemory API
    const langPair = `${from}|${to}`;
    
    try {
      // Try MyMemory API first (free, no key required for basic usage)
      const encodedText = encodeURIComponent(text);
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const result: TranslationResponse = await response.json();
      
      if (result.responseStatus === "200" || result.responseStatus === "403") {
        // 403 can still return valid translation but rate limit warning
        return { translatedText: result.responseData.translatedText };
      }
      
      throw new Error(`Translation failed: ${result.responseStatus}`);
    } catch (error) {
      console.error("Translation error:", error);
      
      // Check if Google Cloud Translation API key is available
      const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
      if (googleApiKey) {
        try {
          const googleUrl = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
          const googleResponse = await fetch(googleUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: text,
              source: from,
              target: to,
              format: "text",
            }),
          });
          
          if (googleResponse.ok) {
            const googleResult = await googleResponse.json();
            return { translatedText: googleResult.data.translations[0].translatedText };
          }
        } catch (googleError) {
          console.error("Google Translate fallback failed:", googleError);
        }
      }
      
      // Return original text if all translation attempts fail
      return { translatedText: text, error: "Translation failed" };
    }
  });
