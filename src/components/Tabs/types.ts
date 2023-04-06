export type TabsType = {
    title: string;
    disabled: boolean;
    key: number;
};

export enum TabsNames {
    Description,
    Authors,
    Reviews,
}

export type TabsProps = {
    tabsList: TabsType[];
    onClick: (key: TabsNames) => void;
    activeTab: number;
};