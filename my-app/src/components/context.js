import React from 'react'


export const CommentsContext = React.createContext({
    Comments: [{name: 'default', comment: 'empty'}, {name: 'default1', comment: 'empty1'}],
    setComments: () => {},
});

export const ThemeContext = React.createContext({
    theme: 'dark',
    setTheme: () => {},
});

