import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challgenge {
  type: 'eye' | 'body';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number
  levelUp: () => void
  startNewChallenge: () => void;
  resetChallenge: () => void;
  activeChallenge: Challgenge;
  experienceToNextLevel: number
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        resetChallenge,
        activeChallenge,
        experienceToNextLevel
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}