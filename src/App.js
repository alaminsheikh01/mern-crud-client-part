import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Creates from "./pages/Creates";
import SiglePost from "./pages/SinglePost";
import UpdatePost from "./pages/UpdatePost";
import Login from "./component/Login";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoutes path="/post" exact component={Creates} />
          <Route path="/post/:slug" exact component={SiglePost} />
          <PrivateRoutes
            path="/post/update/:slug"
            exact
            component={UpdatePost}
          />
          <Route path="/login" exact component={Login} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
