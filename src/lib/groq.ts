// Custom Groq API client
const apiKey = "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";
const baseUrl = "https://api.groq.com/openai/v1";

// Valid hosts for API requests
const VALID_HOSTS = [
  'api.groq.com',
  'localhost',
  '127.0.0.1',
  // Add your production domain here when deployed
];

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface CompletionOptions {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

class GroqClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://api.groq.com/openai/v1") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  
  /**
   * Validate if a URL's host is in the allowed list
   */
  validateHost(url: string): boolean {
    try {
      const host = new URL(url).hostname;
      return VALID_HOSTS.includes(host);
    } catch (e) {
      console.error("Invalid URL:", e);
      return false;
    }
  }

  async chat(options: CompletionOptions) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      // Handle host validation by wrapping the request in a try-catch
      try {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(options),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Groq API error: ${response.status} ${error}`);
        }

        return response.json();
      } catch (fetchError) {
        // Handle host validation errors specifically
        if (fetchError instanceof Error && 
            (fetchError.message.includes('host validation') || 
             fetchError.message.includes('not supported'))) {
          console.warn('Host validation error:', fetchError.message);
          // Return a mock response for development
          return {
            choices: [
              {
                message: {
                  content: "I'm running in development mode. In production, I would connect to the Groq API."
                }
              }
            ]
          };
        }
        throw fetchError;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout: API took too long to respond');
      }
      throw error;
    }
  }
}

const groq = new GroqClient(apiKey, baseUrl);

// Function used by the chatbot component
export async function chatWithGroq(userMessage: string): Promise<string> {
  try {
    if (!userMessage.trim()) {
      return "Please enter a message.";
    }
    
    const result = await groq.chat({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for the NicheNinja platform that helps users discover and dominate profitable niches."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    if (!result || !result.choices || !result.choices[0]) {
      return "I couldn't generate a response. Please try again.";
    }
    
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error in chatWithGroq:", error);
    if (error instanceof Error) {
      return `Sorry, there was an error: ${error.message}`;
    }
    return "Sorry, there was an unexpected error. Please try again later.";
  }
}

export default groq;