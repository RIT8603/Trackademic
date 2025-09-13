import { config } from 'dotenv';
config();

import '@/ai/flows/personalize-academic-planner.ts';
import '@/ai/flows/suggest-idle-time-activities.ts';
import '@/ai/flows/detect-unauthorized-activities.ts';
import '@/ai/flows/automate-attendance.ts';