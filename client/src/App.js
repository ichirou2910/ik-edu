import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// -- Helpers
import { auth } from "./firebase/firebase.utils";
import UserContext from "./contexts/user.context";

// --- Components
import HomePage from "./pages/home.page";
import ClassPage from "./pages/class.page";
import Auth from "./pages/auth.page";
import Header from "./components/header.component";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  let routes;

  if (!currentUser) {
    routes = (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/class/:classId">
          <ClassPage />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (currentUser.isAdmin) {
    routes = (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/class/:classId">
          <ClassPage />
        </Route>
        <Route exact path="/auth">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/class/:classId">
          <ClassPage />
        </Route>
        <Route exact path="/auth">
          <Redirect to="/" />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { displayName, email, uid } = userAuth;

        const {
          claims: { admin },
          token,
        } = await auth.currentUser.getIdTokenResult();

        setCurrentUser({
          isAdmin: admin,
          displayName,
          email,
          uid,
          token,
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => authUnsubscribe();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
        <Header />
        <main className="container mt-3">{routes}</main>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
