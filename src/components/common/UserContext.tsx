import React, { createContext } from 'react';

export const UserContext = createContext<{
    id: string;
    name: string;
    role: string;
    email: string;
    authToken: string;
    setUser: Function;
}>({
    id: '',
    name: '',
    role: '',
    email: '',
    authToken: '',
    setUser: () => {},
});
