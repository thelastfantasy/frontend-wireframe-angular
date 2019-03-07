export class population {
    message: null;
    result: {
        boundaryYear: number,
        data: populationByLabel[]
    };
};

export class populationByLabel {
    label: string;
    data: everyYearPopulation[];
}

export class everyYearPopulation {
    /** 都道府県コード */
    year: number;
    /** 都道府県名 */
    value: string;
    /** 割合 */
    rate?: number;
};
