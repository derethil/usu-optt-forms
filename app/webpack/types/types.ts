export interface Section {
  sectionTitle: string;
  tooltip?: string;
  rows: [
    {
      area: string;
      tooltip?: string;
      options: [
        {
          content: string;
          score: number | string;
        }
      ];
    }
  ];
}

export interface ScoresState {
  [key: string]: {
    [key: string]: {
      score: string;
      comment: string;
    };
  };
}

export interface ITimer {
  time: number;
  isActive: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handleResume: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

export interface IFormInfo {
  studentTeacher: string;
  cooperatingTeacher: string;
  supervisor: string;
  date: Date;
  nextDate: Date;
  observation: number;
  other: string;
  program: string;
}
