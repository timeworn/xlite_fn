import React, { useEffect, useState } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Account as AccountView,
  Dashboard as DashboardView,
  Devices as DevicesView,
  DeviceDetail as DeviceDetailView,
  Groups as GroupsView,
  Schedules as SchedulesView,
  NotFound as NotFoundView,
  Reports as ReportsView,
  Settings as SettingsView,
  SignIn as SignInView,
  SignUp as SignUpView
} from './views';
import { AuthService } from 'core/services/auth.service';
import LogoutView from './views/Logout';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
  useEffect(() => {
    AuthService.instance.isLoggedIn$.subscribe(res => setLoggedIn(res));
  }, []);
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={DevicesView}
        exact
        layout={MainLayout}
        path="/devices"
      />
      <RouteWithLayout
        component={DeviceDetailView}
        layout={MainLayout}
        path="/devices/detail"
      />
      <RouteWithLayout
        component={GroupsView}
        exact
        layout={MainLayout}
        path="/groups"
      />
      <RouteWithLayout
        component={SchedulesView}
        exact
        layout={MainLayout}
        path="/schedules"
      />
      <RouteWithLayout
        component={ReportsView}
        exact
        layout={MainLayout}
        path="/reports"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={LogoutView}
        exact
        layout={MainLayout}
        path="/logout"
        isAuth={false}
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
        isAuth={false}
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
        isAuth={false}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
        isAuth={false}
      />
      <Redirect to={'/dashboard'} from={'/'}/>
      <Redirect to="/not-found"/>
    </Switch>
  );
};

export default Routes;
