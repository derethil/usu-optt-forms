import React from "react";
import styled from "styled-components";

import Timer from "../components/Timer";
import CounterButton from "../components/CounterButton";
import { Data, ITimer } from "../types";
import * as dataUtils from "../utils/dataUtils";
import { getPercent } from "../utils/utils";
import * as Styles from "../styledComponents/style";
import Card from "../components/Card";
import Color from "../styledComponents/colors";

interface DataProps {
  title: string;
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

const ObservDataWrapper = styled(Styles.DataWrapper)`
  width: 14em;
`;

const DataSTO = ({ timer, timerKey, data, setData, title }: DataProps) => {
  return (
    <Styles.PageContent>
      <Card
        title={title}
        containerStyles={cardContainerStyles}
        titleStyles={{ fontSize: "2rem" }}
      ></Card>

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

        <ObservDataWrapper>
          <Styles.DataRow>
            <Styles.DataCell>Individual Cues</Styles.DataCell>
            <Styles.DataCell>{data.cues.individual}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Individual Cues:</Styles.DataCell>
            <Styles.DataCell>{data.cues.individual}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Total Cues</Styles.DataCell>
            <Styles.DataCell>
              {data.cues.individual + data.cues.group}
            </Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>OTR Rate</Styles.DataCell>
            <Styles.DataCell>
              {dataUtils.getOTRRate(data, timer)}
            </Styles.DataCell>
          </Styles.DataRow>
        </ObservDataWrapper>
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

        <ObservDataWrapper>
          <Styles.DataRow>
            <Styles.DataCell>General Praise</Styles.DataCell>
            <Styles.DataCell>{data.praise.general}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Academic Praise</Styles.DataCell>
            <Styles.DataCell>{data.praise.academic}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Behavioral Praise</Styles.DataCell>
            <Styles.DataCell>{data.praise.reprimand}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Redirect/Repremand</Styles.DataCell>
            <Styles.DataCell>{data.praise.reprimand}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Prase Ratio</Styles.DataCell>
            <Styles.DataCell>{dataUtils.getPraiseRatio(data)}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Percent Specific</Styles.DataCell>
            <Styles.DataCell>
              {getPercent(
                data.praise.academic + data.praise.behavioral,
                dataUtils.getPraiseSum(data)
              )}
            </Styles.DataCell>
          </Styles.DataRow>
        </ObservDataWrapper>
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

        <ObservDataWrapper>
          <Styles.DataRow>
            <Styles.DataCell>Correct</Styles.DataCell>
            <Styles.DataCell>{data.corrections.correct}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Not Correct</Styles.DataCell>
            <Styles.DataCell>{data.corrections.incorrect}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>None</Styles.DataCell>
            <Styles.DataCell>{data.corrections.none}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Total Corrections</Styles.DataCell>
            <Styles.DataCell>
              {dataUtils.getCorrectionsSum(data)}
            </Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Percent</Styles.DataCell>
            <Styles.DataCell>
              {getPercent(
                data.corrections.correct,
                dataUtils.getCorrectionsSum(data)
              )}
            </Styles.DataCell>
          </Styles.DataRow>
        </ObservDataWrapper>
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

        <ObservDataWrapper>
          <Styles.DataRow>
            <Styles.DataCell>Engaged</Styles.DataCell>
            <Styles.DataCell>{data.engagement.engaged}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Not Engaged</Styles.DataCell>
            <Styles.DataCell>{data.engagement.notEngaged}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Total</Styles.DataCell>
            <Styles.DataCell>
              {data.engagement.engaged + data.engagement.notEngaged}
            </Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Percent</Styles.DataCell>
            <Styles.DataCell>
              {getPercent(
                data.engagement.engaged,
                data.engagement.engaged + data.engagement.notEngaged
              )}
            </Styles.DataCell>
          </Styles.DataRow>
        </ObservDataWrapper>
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

        <ObservDataWrapper>
          <Styles.DataRow>
            <Styles.DataCell>Number of Transitions</Styles.DataCell>
            <Styles.DataCell>{data.misc.transitionCount}</Styles.DataCell>
          </Styles.DataRow>

          <Styles.DataRow>
            <Styles.DataCell>Occurance of Scanning</Styles.DataCell>
            <Styles.DataCell>{data.misc.scanningCount}</Styles.DataCell>
          </Styles.DataRow>
        </ObservDataWrapper>
      </Card>
    </Styles.PageContent>
  );
};

export default DataSTO;
