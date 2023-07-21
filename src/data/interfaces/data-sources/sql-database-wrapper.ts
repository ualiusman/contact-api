
export interface SQLDatabaseWrapper{
    query(queryString: string, queryConfigs?: any[]) :Promise<{rows: any[]}>;
}