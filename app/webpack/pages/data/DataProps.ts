import { ITimer } from "../../slices/timersSlice";

interface DataProps<T> {
  title: string;
  timer: ITimer;
  data: T;
  setData: (updatedValues: Partial<T>) => void;
  resetCallback?: () => void;
}

export default DataProps;
