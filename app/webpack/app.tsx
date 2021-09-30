import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import logo from "../static/img/horizontal_logo.png";

import FormHome from "./pages/FormHome";
import DataST from "./pages/data/DataST";
import DataSP from "./pages/data/DataSP";
import Rubric from "./pages/Rubric";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./routing/Navbar";
import NotFound from "./pages/NotFound";
import useTimer from "./hooks/useTimer";

import { useObjLocalStorage } from "./hooks/localStorage";
import { ScoresState, Section } from "./types/types";
import { getRubric, getTitle } from "./utils/formUtils";
import { defaultComments, defaultFormInfo } from "./defaults/defaults";
import { PageContainer, PageHeader, Title } from "./styledComponents/style";
import { getDefaultData } from "./utils/formUtils";
import currentForm, { formOptions } from "./currentForm";
import FormRoute from "./routing/FormRoute";
import DataBT5 from "./pages/data/DataBT5";

const getInitialState = (rubricData: Section[]): ScoresState => {
  let initialState: ScoresState = {};

  rubricData.forEach((section) => {
    initialState[section.sectionTitle] = {};
    section.rows.forEach((row) => {
      initialState[section.sectionTitle][row.area] = {
        score: String(row.options[row.options.length - 1].score),
        comment: "",
      };
    });
  });
  return initialState;
};

export const App = () => {
  const rubricData = getRubric();

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
    getDefaultData()
  );
  const [data2, setData2, resetData2] = useObjLocalStorage(
    "data2",
    getDefaultData()
  );

  const timer1 = useTimer("timer1");
  const timer2 = useTimer("timer2");

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

  const dynamicRoutes = [
    // ------ STUDENT TEACHING ------
    <FormRoute path="/data1" for={formOptions.studentTeaching} key={0}>
      <DataST
        data={data1}
        setData={setData1}
        timer={timer1}
        title="Data 1"
        resetCallback={resetData1}
      />
    </FormRoute>,
    <FormRoute path="/data2" for={formOptions.studentTeaching} key={1}>
      <DataST
        data={data2}
        setData={setData2}
        timer={timer2}
        title="Data 2"
        resetCallback={resetData2}
      />
    </FormRoute>,
    // ------ SEVERE PRACTICUM ------
    <FormRoute path="/data1" for={formOptions.severePracticum} key={2}>
      <DataSP
        data={data1}
        setData={setData1}
        timer={timer1}
        title="Data 2"
        resetCallback={resetData1}
      />
    </FormRoute>,
    // ------ BT5 PRACTICUM ------
    <FormRoute path="/data1" for={formOptions.bTo5Practicum} key={3}>
      <DataBT5
        data={data1}
        setData={setData1}
        timer={timer1}
        title="Data 1"
        resetCallback={resetData1}
      />
    </FormRoute>,
  ];

  return (
    <PageContainer>
      <BrowserRouter>
        <PageHeader>
          <img alt="logo" width={300} src={logo} />
          <Title>{getTitle()}</Title>
        </PageHeader>

        <Navbar studentTeacher={formInfo.studentTeacher} />

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

          {...dynamicRoutes.map((route) =>
            route.props["for"] === currentForm ? route : null
          )}

          <Route path="/rubric" key="Rubric">
            <Rubric
              scores={scores}
              rubricData={rubricData}
              updateScore={updateScore}
            />
          </Route>

          <Route path="/feedback" key="Feedback">
            <FeedbackPage comments={comments} updateComments={updateComments} />
          </Route>

          <Route key="NotFound">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </PageContainer>
  );
};

const RootComponent = () => {
  return <App />;
};

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);
