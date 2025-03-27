import React from 'react';

import { Typography } from "antd";
import { createCustomPhraseFactory } from "../../../NarrativeTextVis";
import { SUBSPACE_DESCRIPTION_PLUGIN_KEY } from "../../constants";

export const SubspaceDescription = ({ subspaceDescription }: { subspaceDescription: string }) => {
  return (<></>)
  
};

export const subspaceDescriptionPlugin = createCustomPhraseFactory({
  key: SUBSPACE_DESCRIPTION_PLUGIN_KEY,
  overwrite: (node, value) => {
    return <SubspaceDescription subspaceDescription={value} />;
  },
});
