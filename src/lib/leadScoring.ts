// Lead scoring utility functions

export interface IntentSignals {
  pricing: boolean;
  timeline: boolean;
  urgency: boolean;
  specificService: boolean;
}

export interface LeadScoringInput {
  source: string;
  messageCount: number;
  hasUrl: boolean;
  receivedFeedback: boolean;
  intentSignals: IntentSignals;
}

export type QualificationStatus = 'hot' | 'warm' | 'cool' | 'cold';

export function calculateLeadScore(input: LeadScoringInput): number {
  let score = 0;

  // Source scoring
  switch (input.source) {
    case 'project_plan_modal':
      score += 30;
      break;
    case 'chatbot':
      score += input.hasUrl ? 25 : 15;
      break;
    case 'hero_modal':
      score += 10;
      break;
    default:
      // Use-case pages or other sources
      if (input.source.includes('_page')) {
        score += 20;
      } else {
        score += 5;
      }
  }

  // Engagement depth (message count)
  if (input.messageCount >= 11) {
    score += 35;
  } else if (input.messageCount >= 7) {
    score += 25;
  } else if (input.messageCount >= 4) {
    score += 15;
  } else if (input.messageCount >= 2) {
    score += 5;
  }

  // Intent signals
  if (input.intentSignals.pricing) score += 15;
  if (input.intentSignals.timeline) score += 15;
  if (input.intentSignals.specificService) score += 10;
  if (input.intentSignals.urgency) score += 10;

  // Website analysis bonus
  if (input.hasUrl) score += 10;
  if (input.receivedFeedback) score += 10;

  return score;
}

export function getQualificationStatus(score: number): QualificationStatus {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  if (score >= 20) return 'cool';
  return 'cold';
}

export function getScoreBadgeColor(status: QualificationStatus): string {
  switch (status) {
    case 'hot':
      return 'bg-red-500/20 text-red-400';
    case 'warm':
      return 'bg-orange-500/20 text-orange-400';
    case 'cool':
      return 'bg-blue-500/20 text-blue-400';
    case 'cold':
      return 'bg-gray-500/20 text-gray-400';
  }
}

export function getScoreEmoji(status: QualificationStatus): string {
  switch (status) {
    case 'hot':
      return '🔥';
    case 'warm':
      return '🟡';
    case 'cool':
      return '🔵';
    case 'cold':
      return '⚪';
  }
}
