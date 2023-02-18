export enum Theme {
    LIGHT,
    DARK,
}

export namespace Theme {
    export function toString(theme: Theme): string {
        return Theme[theme];
    }

    export function fromString(theme: string): Theme {
        return (Theme as any)[theme];
    }
}
