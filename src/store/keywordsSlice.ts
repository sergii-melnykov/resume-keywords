import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KeywordsState {
  keywords: string[];
}

const web = [
  'Staff Full Stack Engineer',
  'Staff Software Engineer',
  'JavaScript',
  'TypeScript',
  'Python',
  'Go',
  'Golang',
  'React',
  'Next.js',
  'Redux',
  'Storybook',
  'Tailwind',
  'Material UI',
  'System Design',
  'Event Driven Design',
  'Message Queue',
  'FastAPI',
  'asyncio',
  'Jest',
  'WebSockets',
  'Node.js',
  'Express',
  'PyTorch',
  'REST API',
  'AWS',
  'GCP',
  'S3',
  'EC2',
  'RDS',
  'AWS CodePipeline',
  'Google Pub/Sub',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'MongoDB',
  'API Gateway',
  'Decoupling monolithic apps to distributed asynchronous services',
  'OpenAPI',
  'Swagger',
  'Elasticsearch',
  'Docker',
  'Kubernetes',
  'AWS Pipeline',
  'Microservices',
  'Cloud Monitoring',
  'Distributed Systems',
  'Kafka',
  'Linux',
  'Git',
  'Leadership',
  'Cross-functional teamwork',
  'Communication',
  'Problem solving',
  'Decision making',
  'Mentorship',
  'Time management',
  'Adaptability',
  'Continuous learning',
];

const ai = [
  'AI solutions',
  'Building AI agents',
  'Agent frameworks',
  'Agentic workflow',
  'Generative AI agents',
  'Orchestration',
  'LLM',
  'Llama',
  'Claude',
  'OpenAI',
  'fine-tuning',
  'GenAI models',
  'Prompt engineering',
  'Context engineering',
  'RAG',
  'Vectorization and graphs',
  'Embeddings',
  'Vector databases',
  'Retrieval strategies',
  'Query optimization',
  'Pragmatic experimentation',
  'Observability stack',
  'Real-time',
  'Data lake',
  'Apache Iceberg',
  'Apache Hudi',
  'Regression suites',
  'Task-success metrics',
  'Data visualization',
  '3D data visualization',
  'High-performance computing',
  'MCP',
  'LangChain',
  'LlamaIndex',
  'Amazon Bedrock',
  'LangGraph',
  'ETL orchestration',
  'ML flow',
];

const defaultKeywords = [...web, ...ai];

const initialState: KeywordsState = {
  keywords: defaultKeywords,
};

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    addKeyword: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.trim().toLowerCase();
      if (keyword && !state.keywords.includes(keyword)) {
        state.keywords.push(keyword);
      }
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      state.keywords = state.keywords.filter((k) => k !== action.payload);
    },
    setKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
    clearKeywords: (state) => {
      state.keywords = [];
    },
    setDefaults: (state) => {
      state.keywords = defaultKeywords;
    },
  },
});

export const {
  addKeyword,
  removeKeyword,
  setKeywords,
  clearKeywords,
  setDefaults,
} = keywordsSlice.actions;

export default keywordsSlice.reducer;
