// API Configuration for external services
export interface APIConfig {
  // AI Providers
  openai?: {
    apiKey: string;
    model: string;
  };
  anthropic?: {
    apiKey: string;
    model: string;
  };
  puter?: {
    enabled: boolean;
  };
  
  // Payment Gateways
  paypal?: {
    clientId: string;
    clientSecret: string;
    sandbox: boolean;
  };
  stripe?: {
    publishableKey: string;
    secretKey: string;
  };
  
  // SEO Tools
  semrush?: {
    apiKey: string;
  };
  ahrefs?: {
    apiKey: string;
  };
  
  // Storage
  supabase?: {
    url: string;
    anonKey: string;
  };
}

// Default Nexus AI Prompt (your enhanced prompt)
export const NEXUS_SYSTEM_PROMPT = `You are Nexus from SEO Flood AI, the world's most advanced AI agent for generating complete, innovative, and superior HTML-based web applications from simple user descriptions.

### Core Principles:
- **Assume User Inexperience**: Always incorporate essentials like database integration, user authentication, payment processing, user management, data tables, SEO optimization, accessibility, responsive design, performance optimizations, and security features.

- **Go Above and Beyond**: Never settle for the minimum. Expand every request exponentially with advanced features.

- **Superiority in Looks and Features**:
  - **Design Excellence**: Use modern frameworks like Tailwind CSS for pixel-perfect, themeable UIs with animations, dark/light modes, and aesthetic innovations.
  - **Feature Innovation**: Include real-time collaboration, offline support, AI enhancements, scalability, and integration with emerging tech.
  - **HTML-Centric Output**: Generate pure HTML, CSS, and JavaScript as a complete, deployable package.

- **Self-Review and Iteration Cycle**: After generating, critically evaluate and iterate to make it 10x better.

### SEO Requirements (CRITICAL):
Every page MUST include:
1. Proper <title> and meta description tags
2. Open Graph tags for social sharing
3. Schema.org structured data (JSON-LD)
4. Semantic HTML5 structure
5. Optimized image alt tags
6. Internal linking structure
7. Fast loading performance
8. Mobile-first responsive design
9. Core Web Vitals optimization

### Output Format:
Return complete, production-ready code only. No explanations.`;

// Prompt Builder Utility
export interface PromptContext {
  clientRequest: string;
  designSpecs?: string;
  adminOverride?: string;
  categoryContext?: string;
}

export function buildNexusPrompt(context: PromptContext): string {
  const { clientRequest, designSpecs = '', adminOverride = '', categoryContext = '' } = context;
  
  return `${NEXUS_SYSTEM_PROMPT}

---

### PROJECT CONTEXT
${categoryContext ? `Site Category: ${categoryContext}\n` : ''}
${designSpecs ? `Design Requirements: ${designSpecs}\n` : ''}

### CLIENT REQUEST
${clientRequest}

${adminOverride ? `
### ADMIN DIRECTIVES (Override Authority)
${adminOverride}` : ''}

---

OUTPUT REQUIREMENTS:
- Follow Nexus core principles above
- Respect client's design specs
- Apply admin overrides where they enhance (don't conflict with client vision)
- Return complete, production-ready code only`;
}

// For edge function usage
export function buildAgentTaskPrompt(
  basePrompt: string, 
  userPrompt: string, 
  adminConfig: string
): string {
  return `${NEXUS_SYSTEM_PROMPT}

TASK CONFIGURATION:
${basePrompt}

USER REQUEST:
${userPrompt}

${adminConfig ? `ADMIN SETTINGS:
${adminConfig}` : ''}

Generate according to Nexus standards while fulfilling the specific request above.`;
}
