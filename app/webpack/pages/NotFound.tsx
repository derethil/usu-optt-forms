import React from "react";
import styled from "styled-components";

import { PageContent } from "../styledComponents/style";

const CenteredTitle = styled.h1`
  margin: 1em auto;
  width: 10em;
`;

const NotFound = () => {
  return (
    <PageContent>
      <CenteredTitle>404 - Not Found</CenteredTitle>
    </PageContent>
  );
};

export default NotFound;
