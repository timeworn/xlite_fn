import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import jsPDF from 'jspdf';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  }
}));

function printDocument() {
  const unit = 'px';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'landscape'; // portrait or landscape
  const input = document.getElementById('screenshot');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(orientation, unit, size);
      pdf.addImage(imgData, 'png', 10, 30, 600, 315);
      pdf.save("page.pdf");
    })
  ;
}

function exportPdf() {
  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'landscape'; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  const source = window.document.getElementsByTagName('body')[0];
  console.log(source);
  doc.text(
    source,
    15,
    15,
    { 'width': 180 });

  doc.save('page.pdf');
}

const PageHeader = props => {
  const location = useLocation();
  const { name } = props;
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    printDocument();
  };
  return (
    <div className={classes.top}>
      <Typography variant="h1" component="h2">{name}</Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={handleClick}
      >
        <GetApp/> Print as PDF
      </Button>
    </div>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default PageHeader;
