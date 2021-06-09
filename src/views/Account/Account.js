import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import useStoreState from 'assets/js/use-store-state';
import { ActionSetServices, setCurrentUser } from 'store/actions/user';
import { currentUser, selectServices } from 'store/selectors/user';
import { AccountDetails } from './components';
import { Password } from '../Settings/components';
import AccountManagement from 'views/Account/components/AccountManagement';
import { UserService } from 'core/services/user.service';
import { OrganizationsService } from 'core/services/organizations.service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  pwField: {
    marginTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [decideAdmin, setDecideAdmin] = useState(false);
  const [user, setUser] = useStoreState(currentUser, setCurrentUser);
  const [orgServices, setOrgServices] = useStoreState(selectServices, ActionSetServices);

  useEffect(() => {
    const load = async () => {
      try {
        const orgInfo = await OrganizationsService.instance.retriveInfo();
        setDecideAdmin(orgInfo.length === 1);

        if (orgInfo.length === 1) {
          const data = await UserService.instance.retrieveServices();
          console.log(data);
          setOrgServices(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <AccountDetails />
          <Password className={classes.pwField} />
        </Grid>
        {decideAdmin ? <Grid item lg={6} md={6} xl={6} xs={12}>
          <AccountManagement />
        </Grid> : <Grid item lg={6} md={6} xl={6} xs={12}/>}
      </Grid>
    </div>
  );
};

export default Account;
