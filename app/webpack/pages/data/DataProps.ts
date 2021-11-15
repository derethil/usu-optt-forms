import { IDataSlice } from "../../slices/dataSlice";
import { ITimer } from "../../slices/timersSlice";

interface DataProps<T> {
  title: string;
  timer: ITimer;
  data: IDataSlice;
  resetCallback?: () => void;
}

export default DataProps;
