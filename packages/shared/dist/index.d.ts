import { z } from 'zod';

declare const playStatusSchema: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"offline">, z.ZodLiteral<"ready">, z.ZodLiteral<"on-hold">, z.ZodLiteral<"voting">, z.ZodLiteral<"voted">]>>;
declare const socketDataSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    value: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    status: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"offline">, z.ZodLiteral<"ready">, z.ZodLiteral<"on-hold">, z.ZodLiteral<"voting">, z.ZodLiteral<"voted">]>>;
}, "strip", z.ZodTypeAny, {
    status: "idle" | "offline" | "ready" | "on-hold" | "voting" | "voted";
    id: string;
    username: string;
    value?: number | null | undefined;
}, {
    id: string;
    username: string;
    value?: number | null | undefined;
    status?: "idle" | "offline" | "ready" | "on-hold" | "voting" | "voted" | undefined;
}>;
type PlayStatusValue = z.infer<typeof playStatusSchema>;
type SocketDataValue = z.infer<typeof socketDataSchema>;
interface ServerToClientEvents {
    pong: () => void;
    'users:all': (users: {
        id: string;
        username: string;
        status: PlayStatusValue;
    }[]) => void;
    'users:votes': (users: {
        id: string;
        username: string;
        value: number;
    }[]) => void;
    'user:status': (data: {
        user: {
            id: string;
            username: string;
            status: PlayStatusValue;
        };
    }) => void;
    /**
     * @deprecated
     */
    users: (users: {
        id: string;
        username: string;
    }[]) => void;
    /**
     * @deprecated
     */
    'user:connected': ({ user, users, }: {
        user: SocketDataValue;
        users: SocketDataValue[];
    }) => void;
}
interface ClientToServerEvents {
    ping: () => void;
    pong: () => void;
    disconnect: () => void;
    'user:status': (status: PlayStatusValue) => void;
    'user:voting': () => void;
    'user:vote': (value: number) => void;
    'user:reset': () => void;
}
interface InterServerEvents {
    ping: () => void;
}

export { ClientToServerEvents, InterServerEvents, PlayStatusValue, ServerToClientEvents, SocketDataValue, playStatusSchema, socketDataSchema };
