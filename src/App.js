import "./App.css";
import SimpleTabs from "./components/SimpleTabs";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BoardDetails from "./components/boards/BoardDetails";
// import StoreContextProvider from "./utils/store";

function App() {
  return (
    // <StoreContextProvider>
    <Router>
      <Route path="/" exact component={SimpleTabs} />
      <Route path="/boards/:id" component={BoardDetails} />
    </Router>
    // </StoreContextProvider>
  );
}

export default App;
