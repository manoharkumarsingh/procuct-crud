import React from 'react';
import { BrowserRouter, Route,Switch} from "react-router-dom";
import ProductDetail from '../containers/active-product';
import Addproduct from '../containers/add-product';
import notFound from './notFound';
import Navbar from './navbar';
import {NotificationContainer} from 'react-notifications';

import App from '../App';

const Router = () => (
    <BrowserRouter>
    <div>
      <Route component={Navbar}></Route>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/productdeatils/:id" component={ProductDetail}></Route>
        <Route path="/addproduct" component={Addproduct}></Route>
        <Route path='*' exact={true} component={notFound}></Route>
      </Switch>
      <NotificationContainer></NotificationContainer>
      </div>
    </BrowserRouter>
);
export default Router;

