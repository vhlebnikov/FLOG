import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import AdStore from "./store/AdStore";
import FilterStore from "./store/FilterStore";

import "rsuite/dist/rsuite.min.css";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        ad: new AdStore(),
        filter: new FilterStore()
    }}>
        <App />
    </Context.Provider>
);

