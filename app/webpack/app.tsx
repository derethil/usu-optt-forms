import React from "react";
import ReactDom from "react-dom";
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
import { ScoresState, Section } from "./types/types";
import { defaultComments, defaultFormInfo } from "./defaults/defaults";
import { PageContainer, PageHeader, Title } from "./styledComponents/style";
import currentForm, { formOptions } from "./currentForm";
import FormData from "./FormData";
import NotebookCheck from "./pages/data/NotebookCheck";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach((section) => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach((row) => {
      const initialScore =
        row.options[0].score === "Yes"
          ? "Yes"
          : String(row.options[row.options.length - 1].score);

      initialState[section.sectionTitle][row.area] = {
        score: initialScore,
        comment: "",
      };
    });
  });
  return initialState;
};

export const App = () => {
  const rubricData = FormData[currentForm].rubric;

  const [formInfo, updateFormInfo, resetFormInfo] = useObjLocalStorage(
    "formInfo",
    defaultFormInfo
  );

  const [scores, updateScores, resetScores] = useObjLocalStorage(
    "scores",
    getInitialState(rubricData)
  );

  const updateScore = (
    section: string,
    row: string,
    newScore: string,
    newComment: string
  ) => {
    updateScores({
      [section]: {
        ...scores[section],
        [row]: {
          score: newScore,
          comment: newComment,
        },
      },
    });
  };

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

  const [comments, updateComments, resetComments] = useObjLocalStorage(
    "comments",
    defaultComments
  );

  const resetAll = (): void => {
    resetScores();
    resetData1();
    resetData2();
    timer1.handleReset();
    timer2.handleReset();
    resetFormInfo();
    resetComments();
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

        <Navbar
          studentTeacher={formInfo.studentTeacher}
          dynamicRoutes={dynamicRoutes}
        />

        <Switch>
          <Route exact path="/" key="FormHome">
            <FormHome
              formInfo={formInfo}
              comments={comments}
              scores={scores}
              data1={data1}
              data2={data2}
              timer1={timer1}
              timer2={timer2}
              resetAll={resetAll}
              updateFormInfo={updateFormInfo}
            />
          </Route>

          {...dynamicRoutes[currentForm]}

          <Route path="/rubric" key="Rubric">
            <Rubric
              scores={scores}
              rubricData={rubricData}
              updateScore={updateScore}
              timer1={timer1}
              timer2={timer2}
            />
          </Route>

          <Route path="/feedback" key="Feedback">
            <FeedbackPage comments={comments} updateComments={updateComments} />
          </Route>

          <Route key="NotFound">
            <NotFound />
          </Route>
        </Switch>
      </HashRouter>
    </PageContainer>
  );
};

const RootComponent = () => {
  return <App />;
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
