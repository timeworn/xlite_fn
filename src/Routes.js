import React, { useEffect, useState } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Account as AccountView,
  Dashboard as DashboardView,
  DeviceDetail as DeviceDetailView,
  Devices as DevicesView,
  Groups as GroupsView,
  NotFound as NotFoundView,
  Reports as ReportsView,
  Schedules as SchedulesView,
  Settings as SettingsView,
  SignIn as SignInView,
  SignUp as SignUpView
} from './views';

import ScheduleCreate from './views/Schedules/ScheduleCreate';
import ScheduleDetail from 'views/Schedules/ScheduleDetail';
import { AuthService } from 'core/services/auth.service';
import LogoutView from './views/Logout';
import { useDispatch } from 'react-redux';
import { OrganizationsService } from 'core/services/organizations.service';
import { ActionSetDecideAdmin } from 'store/actions/user';

const Routes = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
  const [decideAdmin, setDecideAdmin] = useState(false);
  useEffect(() => {
    OrganizationsService.instance.retriveInfo().then(info => {
      if (info.length === 1) {
        setDecideAdmin(true);
      }
    });
    AuthService.instance.isLoggedIn$.subscribe(res => setLoggedIn(res));
  }, []);

  useEffect(() => {
    if (decideAdmin) {
      dispatch(ActionSetDecideAdmin(true));
    }
  }, [decideAdmin]);

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
        component={ScheduleCreate}
        exact
        layout={MainLayout}
        path="/schedules/create"
      />
      <RouteWithLayout
        component={ScheduleDetail}
        exact
        layout={MainLayout}
        path="/schedules/detail"
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
      <Redirect to={'/dashboard'} from={'/'} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
