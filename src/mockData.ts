export interface AppItem {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  launch_count: number;
}

export const MOCK_APPS: AppItem[] = [
  {
    id: '1',
    name: 'ChatGPT Plus',
    category: 'Writing',
    description: 'Advanced conversational AI for writing, coding, and creative problem solving with GPT-4.',
    url: 'https://chat.openai.com',
    launch_count: 12450,
  },
  {
    id: '2',
    name: 'Gemini Pro',
    category: 'Research',
    description: "Google's most capable AI model built for multimodal tasks and complex reasoning.",
    url: 'https://gemini.google.com',
    launch_count: 8720,
  },
  {
    id: '3',
    name: 'Perplexity',
    category: 'Research',
    description: 'An AI-powered search engine that provides real-time answers with cited sources.',
    url: 'https://perplexity.ai',
    launch_count: 6410,
  },
  {
    id: '4',
    name: 'GitHub Copilot',
    category: 'Coding',
    description: 'An AI pair programmer that helps you write code faster with less work.',
    url: 'https://github.com/features/copilot',
    launch_count: 15200,
  },
  {
    id: '5',
    name: 'Midjourney',
    category: 'Image',
    description: 'A generative AI service that creates high-quality artistic images from text prompts.',
    url: 'https://midjourney.com',
    launch_count: 9800,
  },
  {
    id: '6',
    name: 'Claude 3',
    category: 'Writing',
    description: 'Anthropic\'s next-generation AI with advanced reasoning and high-speed processing.',
    url: 'https://claude.ai',
    launch_count: 11300,
  },
  {
    id: '7',
    name: 'DALL-E 3',
    category: 'Image',
    description: 'A powerful image generation model that understands nuanced text descriptions perfectly.',
    url: 'https://openai.com/dall-e-3',
    launch_count: 7500,
  },
  {
    id: '8',
    name: 'Cursor',
    category: 'Coding',
    description: 'The AI-first code editor designed to make pair programming seamless and efficient.',
    url: 'https://cursor.sh',
    launch_count: 5400,
  },
  {
    id: '9',
    name: 'Suno AI',
    category: 'Audio',
    description: 'Create realistic songs and music from simple text descriptions in seconds.',
    url: 'https://suno.com',
    launch_count: 4200,
  },
  {
    id: '10',
    name: 'ElevenLabs',
    category: 'Audio',
    description: 'The most realistic AI text-to-speech and voice cloning software available today.',
    url: 'https://elevenlabs.io',
    launch_count: 3800,
  }
];

