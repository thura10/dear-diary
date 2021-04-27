export class Entry {
    id?: number;
    name?: string;
    description?: string;
    transcript?: string;
    recording?: string;
    tags?: string[];
    dateAdded: Date;
}

export interface Scenario {
    id?: number;
    name?: string;
    description?: string;
    transcript?: string;
    recording?: string;
    tags?: string[];
    dateAdded: Date;
}
