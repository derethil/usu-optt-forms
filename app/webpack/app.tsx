import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Route, HashRouter } from "react-router-dom";

import logo from "../static/img/usuHorizontalB64";

import FormHome from "./pages/FormHome";
import DataST from "./pages/data/DataST";
import DataSPR from "./pages/data/DataSP";
import DataBT5 from "./pages/data/DataBT5";
import DataMath from "./pages/data/DataMath";
import Rubric from "./pages/Rubric";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./routing/Navbar";
import NotFound from "./pages/NotFound";
import useTimer from "./hooks/useTimer";

import { useObjLocalStorage } from "./hooks/localStorage";
import { PageContainer, PageHeader, Title } from "./styledComponents/style";
import currentForm, { formOptions } from "./currentForm";
import FormData from "./FormData";
import NotebookCheck from "./pages/data/NotebookCheck";

import { resetFormInfo } from "./slices/formInfoSlice";
import { useAppDispatch } from "./hooks/hooks";
import { resetRubric } from "./slices/rubricSlice";
import { resetFeedback } from "./slices/feedbackSlice";
import { resetNotebookChecks } from "./slices/notebookChecksSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  const [data1, setData1, resetData1] = useObjLocalStorage(
    "data1",
    FormData[currentForm].defaultData
  );
  const [data2, setData2, resetData2] = useObjLocalStorage(
    "data2",
    FormData[currentForm].defaultData
  );

  const timer1 = useTimer("timer1");
  const timer2 = useTimer("timer2");
  const timer3 = useTimer("timer3");

  const resetAll = (): void => {
    dispatch(resetRubric());
    resetData1();
    resetData2();
    timer1.handleReset();
    timer2.handleReset();
    timer3.handleReset();
    dispatch(resetFormInfo());
    dispatch(resetFeedback());
    dispatch(resetNotebookChecks());
  };

  let title;

  const dynamicRoutes = {
    // ------ STUDENT TEACHING ------
    [formOptions.studentTeaching]: [
      <Route path="/data1" key={(title = "Data 1")}>
        <DataST
          data={data1}
          setData={setData1}
          timer={timer1}
          title={title}
          resetCallback={resetData1}
        />
      </Route>,
      <Route path="/data2" key={(title = "Data 2")}>
        <DataST
          data={data2}
          setData={setData2}
          timer={timer2}
          title={title}
          resetCallback={resetData2}
        />
      </Route>,
    ],
    // ------ SEVERE PRACTICUM ------
    [formOptions.severePracticum]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          setData={setData1}
          timer={timer1}
          title={title}
          resetCallback={resetData1}
        />
      </Route>,
    ],
    // ------ BIRTH TO FIVE ------
    [formOptions.bTo5Practicum]: [
      <Route path="/data" key={(title = "Data")}>
        <DataBT5
          data={data1}
          setData={setData1}
          timer={timer1}
          title={title}
          resetCallback={resetData1}
        />
      </Route>,
    ],
    // ------ READING ------
    [formOptions.reading]: [
      <Route path="/decoding" key={(title = "Decoding Data")}>
        <DataSPR
          data={data1}
          setData={setData1}
          timer={timer1}
          title={title}
          resetCallback={resetData1}
        />
      </Route>,
      <Route path="/reading" key={(title = "Story Reading Data")}>
        <DataSPR
          data={data2}
          setData={setData2}
          timer={timer2}
          title={title}
          resetCallback={resetData2}
        />
      </Route>,
    ],
    // ------ MATH ------
    [formOptions.math]: [
      <Route
        path="/new_material"
        key={(title = "New Material - Guided Practice")}
      >
        <DataMath
          data={data1}
          setData={setData1}
          timer={timer3}
          title={title}
          resetCallback={resetData1}
        />
      </Route>,
      <Route path="/notebook_check" key={(title = "Notebook Check")}>
        <NotebookCheck />
      </Route>,
    ],
  };

  return (
    <PageContainer>
      <HashRouter>
        <PageHeader>
          <img alt="logo" width={300} src={logo} />
          <Title>{FormData[currentForm].title} Form</Title>
        </PageHeader>

        <Navbar dynamicRoutes={dynamicRoutes} />

        <Switch>
          <Route exact path="/" key="FormHome">
            <FormHome
              data1={data1}
              data2={data2}
              timer1={timer1}
              timer2={timer2}
              timer3={timer3}
              resetAll={resetAll}
            />
          </Route>

          {...dynamicRoutes[currentForm]}

          <Route path="/rubric" key="Rubric">
            <Rubric timer1={timer1} timer2={timer2} />
          </Route>

          <Route path="/feedback" key="Feedback" component={FeedbackPage} />

          <Route key="NotFound">
            <NotFound />
          </Route>
        </Switch>
      </HashRouter>
    </PageContainer>
  );
};

const RootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
