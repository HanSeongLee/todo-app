export enum TodoTabs {
    ALL,
    ACTIVE,
    COMPLETED,
}

export interface TabList {
    tabs: string[];
    activeTabIndex: number;
    onChangeTab: (index: number) => void;
}
