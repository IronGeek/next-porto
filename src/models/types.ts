type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type { Writeable };
