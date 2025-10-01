declare module 'd3-org-chart' {
  export class Organization {
    constructor();
    container(element: HTMLElement): this;
    data(data: any[]): this;
    nodeWidth(callback: (d: any) => number): this;
    nodeHeight(callback: (d: any) => number): this;
    childrenMargin(callback: (d: any) => number): this;
    compactMarginBetween(callback: (d: any) => number): this;
    compactMarginPair(callback: (d: any) => number): this;
    neightbourMargin(callback: (a: any, b: any) => number): this;
    siblingsMargin(callback: (d: any) => number): this;
    buttonContent(callback: (data: any) => string): this;
    nodeContent(callback: (d: any, i: number, arr: any, state: any) => string): this;
    render(): this;
    fit(): this;
    compact(value: boolean): this;
    setActiveNodeCentered(nodeId: string): this;
    setExpanded(nodeId: string): this;
    setHighlighted(nodeId: string): this;
    clearHighlighting(): this;
    layout(type: string): this;
    compact(value: boolean): this;
    svgWidth(value: number): this;
    svgHeight(value: number): this;
    onNodeClick(callback: (d: any) => void): this;
  }
}
