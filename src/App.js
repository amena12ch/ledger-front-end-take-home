import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/Posts/PostDetails";
import Albums from "./components/Albums/Albums";
import Todos from "./components/Todos/Todos";
import Home from "./components/Home";
import Photos from "./components/Albums/Photos";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Posts" component={Posts} />
          <Route path="/Post/:id" component={PostDetails} />
          <Route path="/Albums" component={Albums} />
          <Route path="/Album/:id" component={Photos} />
          <Route path="/Todos" component={Todos} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
