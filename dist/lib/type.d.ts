type Arg = string | Array<string | number | bigint | null | undefined | unknown> | unknown | null | undefined | object | number | bigint;
export declare const TypeOf: Readonly<{
    isArray(argument: Arg): boolean;
    isObject(argument: Arg): boolean;
    isNumber(argument: Arg): boolean;
    isInt(argument: Arg): boolean;
    isError(argument: Arg): boolean;
    isString(argument: Arg): boolean;
    isBoolean(argument: Arg): boolean;
    isNull(argument: Arg): boolean;
    isUndefined(argument: Arg): boolean;
    isBigInt(argument: Arg): boolean;
    isEmptyObject(argument: Arg): boolean;
    isEmptyArray<T>(argument: T[]): boolean;
    getType(argument: Arg): string;
}>;
export {};
//# sourceMappingURL=type.d.ts.map