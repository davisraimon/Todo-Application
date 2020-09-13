import React from "react";
import "./App.css";
import Header from "./components/Header";
import FormComponent from "./components/FormComponent";
import EditTodo from "./components/EditTodo";
import Contents from "./components/Contents";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header title="TODO APPLICATION" />
        <Router>
          <Route exact path="/" component={FormComponent} />         
          <Route exact path="/edit/:id" component={EditTodo} />
          <Contents />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
