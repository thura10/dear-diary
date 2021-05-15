export interface Recording {
    title?: string;
    dateModified?: Date;
    fileUrl?: string
}

export interface Preferences {
    auth?: boolean;
    passcode?: string;
}