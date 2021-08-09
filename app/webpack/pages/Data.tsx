import React from "react";
import styled from "styled-components";

import Timer from "../components/Timer";
import CounterButton from "../components/CounterButton";
import { Data, ITimer } from "../types";
import {
  getPraiseRatio,
  getPercent,
  getPraiseSum,
  getCorrectionsSum,
} from "../utils/dataUtils";
import { PageContent } from "../styledComponents/style";
import Card from "../components/Card";
import { Color } from "../styledComponents/colors";

interface DataProps {
  timer: ITimer;
  timerKey: string;
  data: Data;
  setData: (updatedValues: Partial<Data>) => void;
}

const cardContainerStyles: React.CSSProperties = { width: "60em" };

const cardContentStyles: React.CSSProperties = {
  padding: "0em 1em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const ButtonsWrapper = styled.div`
  height: 6em;
  margin-right: 3em;
  display: flex;
  padding: 1em 0em;
`;

const DataWrapper = styled.div`
  width: 14em;
  /* display: flex; */
  /* flex-direction: column; */
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0em;
  border-bottom: 2px solid ${Color.lights.gray};
`;

const DataCell = styled.p`
  margin: 0px;

  :first-child {
    text-align: left;
  }

  :last-child {
    font-weight: 600;
  }
`;

const DataSTO = ({ timer, timerKey, data, setData }: DataProps) => {
  return (
    <PageContent>
      <Card title="Timer" containerStyles={cardContainerStyles}>
        <Timer timer={timer} key={timerKey} />
      </Card>

      <Card
        title="Cues / Directions / Opportunities to Respond"
        containerStyles={cardContainerStyles}
        contentStyles={cardContentStyles}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.greenLight}
            content="Individual"
            value={data.cues.individual}
            onClick={(newValue: number) =>
              setData({ cues: { ...data.cues, individual: newValue } })
            }
          />

          <CounterButton
            color={Color.accents.greenLight}
            content="Group"
            value={data.cues.group}
            onClick={(newValue: number) =>
              setData({ cues: { ...data.cues, group: newValue } })
            }
          />
        </ButtonsWrapper>

        <DataWrapper>
          <DataRow>
            <DataCell>Individual Cues</DataCell>
            <DataCell>{data.cues.individual}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Individual Cues:</DataCell>
            <DataCell>{data.cues.individual}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Total Cues</DataCell>
            <DataCell>{data.cues.individual + data.cues.group}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>OTR Rate</DataCell>
            <DataCell>{}</DataCell>
          </DataRow>
        </DataWrapper>
      </Card>

      <Card
        title="Praise Type"
        containerStyles={cardContainerStyles}
        contentStyles={cardContentStyles}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.yellow}
            content="General"
            value={data.praise.general}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, general: newValue } })
            }
          />

          <CounterButton
            color={Color.accents.yellow}
            content="Academic"
            value={data.praise.academic}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, academic: newValue } })
            }
          />

          <CounterButton
            color={Color.accents.yellow}
            content="Behavioral"
            value={data.praise.behavioral}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, behavioral: newValue } })
            }
          />

          <CounterButton
            color={Color.contextual.danger}
            content="Redirect/Reprimand"
            value={data.praise.reprimand}
            onClick={(newValue: number) =>
              setData({ praise: { ...data.praise, reprimand: newValue } })
            }
          />
        </ButtonsWrapper>

        <DataWrapper>
          <DataRow>
            <DataCell>General Praise</DataCell>
            <DataCell>{data.praise.general}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Academic Praise</DataCell>
            <DataCell>{data.praise.academic}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Behavioral Praise</DataCell>
            <DataCell>{data.praise.reprimand}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Redirect/Repremand</DataCell>
            <DataCell>{data.praise.reprimand}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Prase Ratio</DataCell>
            <DataCell>{getPraiseRatio(data)}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Percent Specific</DataCell>
            <DataCell>
              {getPercent(
                data.praise.academic + data.praise.behavioral,
                getPraiseSum(data)
              )}
            </DataCell>
          </DataRow>
        </DataWrapper>
      </Card>

      <Card
        title="Corrections"
        containerStyles={cardContainerStyles}
        contentStyles={cardContentStyles}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brightLight}
            content="Correct"
            value={data.corrections.correct}
            onClick={(newValue: number) =>
              setData({
                corrections: { ...data.corrections, correct: newValue },
              })
            }
          />

          <CounterButton
            color={Color.accents.brightLight}
            content="Incorrect"
            value={data.corrections.incorrect}
            onClick={(newValue: number) =>
              setData({
                corrections: { ...data.corrections, incorrect: newValue },
              })
            }
          />

          <CounterButton
            color={Color.accents.brightLight}
            content="None"
            value={data.corrections.none}
            onClick={(newValue: number) =>
              setData({ corrections: { ...data.corrections, none: newValue } })
            }
          />
        </ButtonsWrapper>

        <DataWrapper>
          <DataRow>
            <DataCell>Correct</DataCell>
            <DataCell>{data.corrections.correct}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Not Correct</DataCell>
            <DataCell>{data.corrections.incorrect}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>None</DataCell>
            <DataCell>{data.corrections.none}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Total Corrections</DataCell>
            <DataCell>{getCorrectionsSum(data)}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Percent</DataCell>
            <DataCell>
              {getPercent(data.corrections.correct, getCorrectionsSum(data))}
            </DataCell>
          </DataRow>
        </DataWrapper>
      </Card>

      <Card
        title="Momentary Sample Time / Child Engagement"
        containerStyles={cardContainerStyles}
        contentStyles={cardContentStyles}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.contextual.info}
            content="Engaged"
            value={data.engagement.engaged}
            onClick={(newValue: number) =>
              setData({ engagement: { ...data.engagement, engaged: newValue } })
            }
          />

          <CounterButton
            color={Color.contextual.info}
            content="Not Engaged"
            value={data.engagement.notEngaged}
            onClick={(newValue: number) =>
              setData({
                engagement: { ...data.engagement, notEngaged: newValue },
              })
            }
          />
        </ButtonsWrapper>

        <DataWrapper>
          <DataRow>
            <DataCell>Engaged</DataCell>
            <DataCell>{data.engagement.engaged}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Not Engaged</DataCell>
            <DataCell>{data.engagement.notEngaged}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Total</DataCell>
            <DataCell>
              {data.engagement.engaged + data.engagement.notEngaged}
            </DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Percent</DataCell>
            <DataCell>
              {getPercent(
                data.engagement.engaged,
                data.engagement.engaged + data.engagement.notEngaged
              )}
            </DataCell>
          </DataRow>
        </DataWrapper>
      </Card>

      <Card
        title="Scanning and Transitions"
        containerStyles={cardContainerStyles}
        contentStyles={cardContentStyles}
      >
        <ButtonsWrapper>
          <CounterButton
            color={Color.accents.brick}
            content="Scanning"
            value={data.misc.scanningCount}
            onClick={(newValue: number) =>
              setData({ misc: { ...data.misc, scanningCount: newValue } })
            }
          />

          <CounterButton
            color={Color.accents.brick}
            content="Transition"
            value={data.misc.transitionCount}
            onClick={(newValue: number) =>
              setData({ misc: { ...data.misc, transitionCount: newValue } })
            }
          />
        </ButtonsWrapper>

        <DataWrapper>
          <DataRow>
            <DataCell>Number of Transitions</DataCell>
            <DataCell>{data.misc.transitionCount}</DataCell>
          </DataRow>

          <DataRow>
            <DataCell>Occurance of Scanning</DataCell>
            <DataCell>{data.misc.scanningCount}</DataCell>
          </DataRow>
        </DataWrapper>
      </Card>
    </PageContent>
  );
};

export default DataSTO;
