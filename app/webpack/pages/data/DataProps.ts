import { ITimer, ITimerActions } from "../../slices/timersSlice";

interface DataProps<T> {
  title: string;
  timer: ITimer;
  timerActions: ITimerActions;
  data: T;
  setData: (updatedValues: Partial<T>) => void;
  resetCallback?: () => void;
}

export default DataProps;
