export type TabsType = {
    disabled: boolean;
    key: number;
};

export enum TabsNames {
    Description,
    Authors,
    Reviews,
}

export type TabsProps = {
    onClick: (key: TabsNames) => void;
    activeTab: number;
};