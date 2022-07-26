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
import DataBirthToFive from "./pages/data/DataBirthToFive";
import DataMath from "./pages/data/DataMath";
import Rubric from "./pages/Rubric";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./routing/Navbar";
import NotFound from "./pages/NotFound";

import { PageContainer, PageHeader, Title } from "./styledComponents/style";
import currentForm, { formOptions } from "./currentForm";
import FormData from "./FormData";
import NotebookCheck from "./pages/data/NotebookCheck";

import { useAppDispatch } from "./hooks/hooks";
import { timer1, timer2, timer3 } from "./slices/timersSlice";
import { data1, data2 } from "./slices/dataSlice";
import OPTTChecklist from "./pages/data/OPTTChecklist";
import StudentTeachingRubric, {
  StudentTeachingRubricIndex,
} from "./pages/StudentTeachingRubric";

type FormRoutes = {
  [key in formOptions]: JSX.Element[];
};

export const App = () => {
  const dispatch = useAppDispatch();

  let title;

  const sharedRoutes = [
    <Route path="/rubric" key="Rubric">
      <Rubric timer1={timer1} timer2={timer2} />
    </Route>,
    <Route path="/feedback" key="Feedback" component={FeedbackPage} />,
  ];

  // dynamicRoutes stores the routes their respective components (pages) for each form
  const dynamicRoutes: FormRoutes = {
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
    [formOptions.severeReading]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
          includeIncorrect
        />
      </Route>,
      ...sharedRoutes,
    ],
    [formOptions.severeMathLifeSkills]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
          includeIncorrect
          signalTooltip
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ BIRTH TO FIVE ------
    [formOptions.birthToFive]: [
      <Route path="/data" key={(title = "Data")}>
        <DataBirthToFive
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ READING ------
    [formOptions.mmReading]: [
      <Route path="/decoding" key={(title = "Decoding Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
          includeIncorrect
        />
      </Route>,
      <Route path="/reading" key={(title = "Story Reading Data")}>
        <DataSPR
          data={data2}
          timer={timer2}
          title={title}
          resetCallback={() => dispatch(data2.actions.resetData())}
          includeIncorrect
        />
      </Route>,
      ...sharedRoutes,
    ],
    // ------ MATH ------
    [formOptions.mmMath]: [
      <Route path="/new_material" key={(title = "New Material - Guided Practice")}>
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
    [formOptions.OPTTChecklist]: [
      <Route path="/checklist" key="Checklist">
        <OPTTChecklist />
      </Route>,
    ],
    // ------ SELF EVALUATION ------
    [formOptions.severeSelfEvaluation]: [
      <Route path="/data" key={(title = "Data")}>
        <DataSPR
          data={data1}
          timer={timer1}
          title={title}
          resetCallback={() => dispatch(data1.actions.resetData())}
          guideTooltip
          includeIncorrect
        />
      </Route>,
      ...sharedRoutes,
    ],
    [formOptions.studentTeachingRubric]: [
      <Route path="/behavior" key="Behavior">
        <StudentTeachingRubric index={StudentTeachingRubricIndex.behavior} />
      </Route>,
      <Route path="/collaboration" key="Collaboration">
        <StudentTeachingRubric index={StudentTeachingRubricIndex.collaboration} />
      </Route>,
      <Route path="/iep" key="IEP/IFSP">
        <StudentTeachingRubric index={StudentTeachingRubricIndex.iep} />
      </Route>,
      <Route path="/feedback" key="Feedback" component={FeedbackPage} />,
    ],
    [formOptions.teacherCandidate]: [
      <Route path="/rubric" key="Rubric">
        <Rubric timer1={timer1} timer2={timer2} disableCommentBoxes alternateInfoStyle />
      </Route>,
      <Route path="/feedback" key="Feedback" component={FeedbackPage} />,
    ],
    [formOptions.cooperatingTeacherChecklist]: [
      <Route path="/rubric" key="Rubric">
        <Rubric timer1={timer1} timer2={timer2} />
      </Route>,
    ],
    [formOptions.earlyIntervention]: [
      <Route path="/rubric" key="Rubric">
        <Rubric timer1={timer1} timer2={timer2} />
      </Route>,
    ],
    [formOptions.EICooperatingProviderChecklist]: [...sharedRoutes],
  };

  return (
    <PageContainer>
      {/* HashRouter rather than BrowserRouter allows the offline forms to use routing as well */}
      <HashRouter>
        <PageHeader>
          <img alt="logo" width={300} src={logo} />
          <Title>{FormData[currentForm].title} Form</Title>
        </PageHeader>

        <Navbar dynamicRoutes={dynamicRoutes} />

        <Switch>
          <Route exact path="/" key="FormHome">
            <FormHome />
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

// Entry point to the app
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
