import React from 'react';

import {  uniq } from 'lodash';

import { Toolbar } from '../Toolbar';
import { ALGORITHM_NAME_MAP, ALGORITHM_NAME_MAP_ZH, INSIGHT_CARD_PREFIX_CLS } from '../constants';

import type { InsightCardProps, InsightCardInfo } from '../types';
import { Badge, Card, CardDescription, CardHeader, CardTitle, Highlight, HeaderContainer, TitleContainer, TooltipContainer, TooltipContent, TooltipIcon } from './customStyled';

export type TitleProps = Pick<InsightCardProps, 'headerTools' | 'title' | 'visualizationOptions' |  'period'  > &
  Pick<InsightCardInfo, 'measures' | 'dimensions' | 'patterns' | 'subspace'>;
export const Title: React.FC<TitleProps> = ({ title, patterns, measures, headerTools, visualizationOptions, dimensions, subspace }) => {
  const prefixCls = INSIGHT_CARD_PREFIX_CLS;
  const insightTypes = uniq(patterns?.map((pattern) => pattern.type) ?? []);
  const measureNames = uniq(measures?.map((measure) => measure.fieldName)).join(',');
  const algorithmNameMap = visualizationOptions?.lang === 'zh-CN' ? ALGORITHM_NAME_MAP_ZH : ALGORITHM_NAME_MAP;
  const analysisName = insightTypes.map((algorithm) => algorithmNameMap[algorithm]).join(',') ?? '';


  const newTitle  = ( <Card>
    <CardHeader>
      <HeaderContainer>
        <TitleContainer>
          <CardTitle>
            {title ? `${title}- ${measureNames}`: {measureNames}}
            <Badge> {analysisName}</Badge>
          </CardTitle>
          <CardDescription> 
           {subspace && subspace.length > 0 && subspace.map(_ => <><Highlight> {_.dimension}: </Highlight> <Highlight> {_.value} </Highlight></> )}   
          </CardDescription>
        </TitleContainer>
        <TooltipContainer>
          <TooltipIcon />
          <TooltipContent>
            <p>This chart displays that {analysisName} was detected.</p>
          </TooltipContent>
        </TooltipContainer>
      </HeaderContainer>
    </CardHeader>
      </Card>
  )

  return (
    <div className={`${prefixCls}-title`}>
      {newTitle}
      {!!headerTools?.length && (
        <div className={`${prefixCls}-title-tools`}>
          <Toolbar tools={headerTools} />
        </div>
      )}
    </div>
  );
};
