import { ITimer } from "../../types/types";

interface DataProps<T> {
  title: string;
  timer: ITimer;
  data: T;
  setData: (updatedValues: Partial<T>) => void;
  resetCallback?: () => void;
}

export default DataProps;
