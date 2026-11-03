<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18" alt="language icon" /> English | [简体中文](./zh-CN/README.zh-CN.md)


<h1 align="center">
<b>@antv/ava-react</b>
</h1>

<div align="center">

React components of AVA.

[![MIT License](https://img.shields.io/github/license/antvis/ava)](/LICENSE) [![Language](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org) [![NPM Package](https://img.shields.io/npm/v/@antv/ava-react.svg)](https://www.npmjs.com/package/@antv/ava-react) [![NPM Downloads](http://img.shields.io/npm/dm/@antv/ava-react.svg)](https://www.npmjs.com/package/@antv/ava-react) 

</div>

## Introduction

[@antv/ava-react](https://www.npmjs.com/package/@antv/ava-react) is a plug-and-play React component library based on the integration of AVA capabilities, which contains three core components:

* `<NarrativeTextVis/>`: Demonstrate data insight interpretation text. In a full-flow presentation of data analysis, using text to describe data phenomena is as critical as giving insightful conclusions.
* `<InsightCard/>`: Present data insights in a combination of graphics and text. It is possible to either receive data directly and perform insights automatically, or to visualize and interpret only the insight result data for presentation.
* `<AutoChart/>`: Automatically recommends and renders the appropriate chart based on the data. It provides users with the ability to implement intelligent visualizations in one line of code, and the component is currently undergoing further upgrades.

## Installation and Usage

Installation can be done via npm or the yarn package manager.

```shell
# npm
$ npm install @antv/ava-react --save

# yarn
$ yarn add @antv/ava-react
```

The following is a practical example of how the three main components of [@antv/ava-react](https://www.npmjs.com/package/@antv/ava-react) can be used:

1. Examples of `<NarrativeTextVis/>`:

    ```ts
    import { NarrativeTextVis } from '@antv/ava-react';
    export default () => {
    // where textSpec is of type NarrativeTextSpec
    return <NarrativeTextVis spec={textSpec} />
    }
    ```

2. Examples of `<InsightCard/>`:

    ```ts
    import { InsightCard } from '@antv/ava-react';
    export default () => {
    // where the insightInfo type refers to the data insight output by the insight module
    return <InsightCard insightInfo={insightInfo} />
    }
    ```

    Charts render with [ECharts](https://echarts.apache.org/) 5. Style them with `chart` (per card) or `<InsightChartProvider>` (app-wide; nested configs merge):

    ```tsx
    import { InsightCard, InsightChartProvider } from '@formant/ava-react';

    <InsightChartProvider
      theme={{ mode: 'dark', palette: ['#5b8def', '#3ddbd9'], roles: { outlier: '#ff4d6d' }, mark: { lineWidth: 1.5 } }}
      echarts={{ animation: false }} // raw ECharts option, deep-merged last; or (option, { spec, theme }) => option
    >
      <InsightCard insightInfo={insightInfo} chart={{ height: 320 }} />
    </InsightChartProvider>
    ```

    Theme precedence: built-in `light`/`dark` < Formant CSS variables on the page (`--color-text-primary`, … see `FORMANT_CSS_VARIABLES`; disable with `cssVariables: false`) < your `theme`. `echartsTheme` passes a registered ECharts theme to `echarts.init`. `toEChartsOption(spec, resolveInsightChartTheme(theme))` gives the plain option without React.

    Date-like x values (`2025-03-19`, `2025-03-19 00:00:00`, ISO) render on an ECharts time axis with compact labels. Control it with `time: { axis: 'auto' | true | false, parse: (value) => epochMs | undefined }`; restyle labels through the override, e.g. `echarts: { xAxis: { axisLabel: { formatter: '{MMM} {d}' } } }`.

    The rest of the card (surface, title, badge, subtitle, summary box, detail bullets, inline values, info tooltip, font) is styled with `theme` tokens. They compile to `--ava-*` CSS variables (`summary.titleColor` → `--ava-summary-title-color`), so they also work from plain CSS; unset tokens keep the default look, and `font` is picked up by the chart too:

    ```tsx
    import { InsightCard, InsightCardThemeProvider } from '@formant/ava-react';

    <InsightCardThemeProvider theme={{ font: 'Inter, sans-serif', badge: { background: '#795bce' } }}>
      <InsightCard
        insightInfo={insightInfo}
        theme={{ summary: { border: '#20a0ff', iconColor: '#f9c36e' }, entity: { color: '#20a0ff', fontWeight: '600' } }}
      />
    </InsightCardThemeProvider>
    ```

    See `InsightCardTheme` for every token.

3. `<AutoChart/>` is being further upgraded, so stay tuned.

```ts
import { NarrativeTextVis } from '@antv/ava-react';
```

## Contribution [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome all contributions. Please read our [Contributing Guide](./CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/antvis/AVA/pulls) or as [GitHub issues](https://github.com/antvis/AVA/issues). Let's build a better AVA together.

More at [Wiki: Development](https://github.com/antvis/AVA/wiki/Development).
