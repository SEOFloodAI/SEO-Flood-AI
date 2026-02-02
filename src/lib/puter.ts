// Puter.js Integration for Free AI Capabilities
// This provides free AI agents for various tasks

declare global {
  interface Window {
    puter: any;
  }
}

export interface PuterAIResponse {
  text?: string;
  image?: string;
  audio?: string;
  error?: string;
}

// Initialize puter
export const initPuter = () => {
  if (typeof window !== 'undefined' && window.puter) {
    return window.puter;
  }
  return null;
};

// Free AI Chat/Completion
export const puterChat = async (prompt: string, options?: { model?: string; system?: string }): Promise<string> => {
  try {
    const puter = initPuter();
    if (!puter) {
      throw new Error('Puter.js not loaded');
    }
    
    const response = await puter.ai.chat(prompt, {
      model: options?.model || 'gpt-4o-mini',
      system: options?.system,
    });
    
    return response?.message?.content || response?.text || '';
  } catch (error) {
    console.error('Puter chat error:', error);
    throw error;
  }
};

// Free Image Generation
export const puterGenerateImage = async (prompt: string): Promise<string> => {
  try {
    const puter = initPuter();
    if (!puter) {
      throw new Error('Puter.js not loaded');
    }
    
    const response = await puter.ai.imgGen(prompt);
    return response;
  } catch (error) {
    console.error('Puter image generation error:', error);
    throw error;
  }
};

// Free Text-to-Speech
export const puterTextToSpeech = async (text: string, voice?: string): Promise<string> => {
  try {
    const puter = initPuter();
    if (!puter) {
      throw new Error('Puter.js not loaded');
    }
    
    const response = await puter.ai.txt2Speech(text, voice);
    return response;
  } catch (error) {
    console.error('Puter TTS error:', error);
    throw error;
  }
};

// Free Speech-to-Text
export const puterSpeechToText = async (audioBlob: Blob): Promise<string> => {
  try {
    const puter = initPuter();
    if (!puter) {
      throw new Error('Puter.js not loaded');
    }
    
    const response = await puter.ai.stt(audioBlob);
    return response;
  } catch (error) {
    console.error('Puter STT error:', error);
    throw error;
  }
};

// Website Generation Agent using Puter
export const generateWebsiteWithPuter = async (params: {
  businessName: string;
  industry: string;
  location?: string;
  services?: string[];
  colorScheme?: string;
  style?: string;
}): Promise<string> => {
  const systemPrompt = `You are an expert web developer. Generate complete, production-ready HTML websites with embedded CSS and JavaScript.
The code should be:
- Modern and responsive
- SEO-optimized with proper meta tags
- Include Schema.org structured data
- Have professional design
- Include all necessary sections (hero, services, about, contact, footer)
- Use inline CSS for single-file output
- Include JavaScript for interactivity

Return ONLY the complete HTML code, no explanations.`;

  const userPrompt = `Create a professional website for:
Business Name: ${params.businessName}
Industry: ${params.industry}
${params.location ? `Location: ${params.location}` : ''}
${params.services ? `Services: ${params.services.join(', ')}` : ''}
${params.colorScheme ? `Color Scheme: ${params.colorScheme}` : ''}
${params.style ? `Style: ${params.style}` : ''}

Generate a complete HTML file with embedded CSS and JavaScript.`;

  try {
    const html = await puterChat(userPrompt, { system: systemPrompt });
    return html;
  } catch (error) {
    console.error('Website generation error:', error);
    throw error;
  }
};

// Content Generation Agent
export const generateContentWithPuter = async (params: {
  topic: string;
  type: 'blog' | 'landing' | 'product' | 'about' | 'service';
  wordCount?: number;
  keywords?: string[];
  tone?: 'professional' | 'casual' | 'persuasive' | 'informative';
}): Promise<string> => {
  const systemPrompt = `You are an expert SEO content writer. Generate high-quality, engaging content that:
- Is optimized for search engines
- Includes the target keywords naturally
- Has proper heading structure (H1, H2, H3)
- Is engaging and conversion-focused
- Uses persuasive copywriting techniques

Return ONLY the content, no explanations.`;

  const userPrompt = `Write ${params.type} content about: ${params.topic}
${params.wordCount ? `Target length: ${params.wordCount} words` : ''}
${params.keywords ? `Include these keywords: ${params.keywords.join(', ')}` : ''}
${params.tone ? `Tone: ${params.tone}` : 'Tone: professional'}

Generate the complete content with proper formatting.`;

  try {
    const content = await puterChat(userPrompt, { system: systemPrompt });
    return content;
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
};

// SEO Optimization Agent
export const optimizeSEOWithPuter = async (params: {
  content: string;
  targetKeyword: string;
  location?: string;
}): Promise<{
  optimizedContent: string;
  metaTitle: string;
  metaDescription: string;
  schemaMarkup: object;
}> => {
  const systemPrompt = `You are an SEO expert. Optimize content for search engines while maintaining readability.
Provide output in JSON format with these fields:
- optimizedContent: The SEO-optimized content
- metaTitle: Optimized meta title (50-60 chars)
- metaDescription: Optimized meta description (150-160 chars)
- schemaMarkup: JSON-LD structured data object

Return ONLY valid JSON, no other text.`;

  const userPrompt = `Optimize this content for SEO:
Target Keyword: ${params.targetKeyword}
${params.location ? `Location: ${params.location}` : ''}

Content to optimize:
${params.content}

Return the optimized content with proper heading structure, keyword placement, and all SEO elements.`;

  try {
    const response = await puterChat(userPrompt, { system: systemPrompt });
    const parsed = JSON.parse(response);
    return parsed;
  } catch (error) {
    console.error('SEO optimization error:', error);
    throw error;
  }
};

// Keyword Research Agent
export const researchKeywordsWithPuter = async (params: {
  mainKeyword: string;
  location?: string;
  industry?: string;
}): Promise<string[]> => {
  const systemPrompt = `You are a keyword research expert. Generate a comprehensive list of relevant keywords including:
- Short-tail keywords
- Long-tail keywords
- Location-based variations
- Question-based keywords
- Service-specific keywords

Return ONLY a JSON array of keyword strings, no other text.`;

  const userPrompt = `Generate keywords for:
Main Keyword: ${params.mainKeyword}
${params.location ? `Location: ${params.location}` : ''}
${params.industry ? `Industry: ${params.industry}` : ''}

Provide at least 50 relevant keywords including variations.`;

  try {
    const response = await puterChat(userPrompt, { system: systemPrompt });
    const keywords = JSON.parse(response);
    return Array.isArray(keywords) ? keywords : [];
  } catch (error) {
    console.error('Keyword research error:', error);
    return [];
  }
};

// Video Script Generation Agent
export const generateVideoScriptWithPuter = async (params: {
  topic: string;
  duration: number; // in minutes
  style: 'explainer' | 'promotional' | 'tutorial' | 'testimonial';
  targetAudience?: string;
}): Promise<string> => {
  const systemPrompt = `You are a professional video script writer. Create engaging video scripts with:
- Hook/attention grabber
- Clear structure (intro, body, conclusion)
- Call-to-action
- Visual cues in [brackets]
- Timing indicators

Return the complete script with all elements.`;

  const userPrompt = `Write a ${params.duration}-minute ${params.style} video script about: ${params.topic}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ''}

Include visual cues and timing.`;

  try {
    const script = await puterChat(userPrompt, { system: systemPrompt });
    return script;
  } catch (error) {
    console.error('Video script error:', error);
    throw error;
  }
};

// Animation/Effects Code Generation
export const generateAnimationCodeWithPuter = async (params: {
  element: string;
  effect: 'fade' | 'slide' | 'bounce' | 'pulse' | 'custom';
  duration?: number;
}): Promise<string> => {
  const systemPrompt = `You are a CSS animation expert. Generate clean, modern CSS animations.
Return ONLY the CSS code, no explanations.`;

  const userPrompt = `Generate CSS animation for a ${params.element} element:
Effect: ${params.effect}
${params.duration ? `Duration: ${params.duration}s` : ''}

Provide the complete CSS with keyframes and class.`;

  try {
    const css = await puterChat(userPrompt, { system: systemPrompt });
    return css;
  } catch (error) {
    console.error('Animation generation error:', error);
    throw error;
  }
};

// Check if puter is available
export const isPuterAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.puter;
};

// Load puter.js script
export const loadPuterScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isPuterAvailable()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://puter.com/puter.js/v2';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Puter.js'));
    document.head.appendChild(script);
  });
};
