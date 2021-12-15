import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { Switch, Route, HashRouter } from "react-router-dom";

import logo from "../static/img/usuHorizontalB64";

import FormHome from "./pages/FormHome";
import DataST from "./pages/data/DataST";
import DataSPR from "./pages/data/DataSPR";
import DataBT5 from "./pages/data/DataBT5";
import DataMath from "./pages/data/DataMath";
import Rubric from "./pages/Rubric";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./routing/Navbar";
import NotFound from "./pages/NotFound";

import { PageContainer, PageHeader, Title } from "./styledComponents/style";
import currentForm, { formOptions } from "./currentForm";
import FormData from "./FormData";
import NotebookCheck from "./pages/data/NotebookCheck";

import { resetFormInfo } from "./slices/formInfoSlice";
import { useAppDispatch } from "./hooks/hooks";
import { resetRubric } from "./slices/rubricSlice";
import { resetFeedback } from "./slices/feedbackSlice";
import { resetNotebookChecks } from "./slices/notebookChecksSlice";
import { timer1, timer2, timer3 } from "./slices/timersSlice";
import { data1, data2 } from "./slices/dataSlice";
import PracticumChecklist from "./pages/data/PracticumChecklist";
import { resetChecklist } from "./slices/checklistSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  const resetAll = (): void => {
    dispatch(resetRubric());
    dispatch(data1.actions.resetData());
    dispatch(data2.actions.resetData());
    dispatch(timer1.actions.reset());
    dispatch(timer2.actions.reset());
    dispatch(timer3.actions.reset());
    dispatch(resetFormInfo());
    dispatch(resetFeedback());
    dispatch(resetNotebookChecks());
    dispatch(resetChecklist());
  };

  let title;

  const sharedRoutes = [
    <Route path="/rubric" key="Rubric">
      <Rubric timer1={timer1} timer2={timer2} />
    </Route>,
    <Route path="/feedback" key="Feedback" component={FeedbackPage} />,
  ];

  const dynamicRoutes = {
    // ------ STUDENT TEACHING ------
    [formOptions.studentTeaching]: [
      <Route path="/data1" key={(title = "Data 1")}>
        <DataST
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      <Route path="/data2" key={(title = "Data 2")}>
        <DataST
          data={data2}
          timer={timer2}
          title={title}
          resetCallback={() => dispatch(data2.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ SEVERE PRACTICUM ------
    [formOptions.severePracticum]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ BIRTH TO FIVE ------
    [formOptions.bTo5Practicum]: [
      <Route path="/data" key={(title = "Data")}>
        <DataBT5
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ READING ------
    [formOptions.reading]: [
      <Route path="/decoding" key={(title = "Decoding Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      <Route path="/reading" key={(title = "Story Reading Data")}>
        <DataSPR
          data={data2}
          timer={timer2}
          title={title}
          resetCallback={() => dispatch(data2.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ MATH ------
    [formOptions.math]: [
      <Route
        path="/new_material"
        key={(title = "New Material - Guided Practice")}
      >
        <DataMath
          data={data1}
          timer={timer3}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      <Route path="/notebook_check" key={(title = "Notebook Check")}>
        <NotebookCheck />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ PRACTICUM CHECKLIST ------
    [formOptions.practicumChecklist]: [
      <Route path="/checklist" key="Checklist">
        <PracticumChecklist />
      </Route>,
    ],
    // ------ SELF EVALUATION ------
    [formOptions.selfEvaluation]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
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
            <FormHome resetAll={resetAll} />
          </Route>

          {...dynamicRoutes[currentForm]}

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
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
