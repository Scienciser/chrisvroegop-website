import "./styles.css"
import * as ReactDOMClient from 'react-dom/client';
import App from "./components/App";
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import TetchrisPage from "./components/TetchrisPage";



const root = ReactDOMClient.createRoot(document.getElementById("root")); // `createRoot` is for client-side rendering, `hydrate` is for server-side rendering.
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tetchris" element={<TetchrisPage />} />
                <Route path="*" element={<p>NOT FOUND</p>}/>
            </Route>
        </Routes>
    </HashRouter >
);