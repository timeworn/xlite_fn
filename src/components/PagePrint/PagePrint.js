import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function PagePrint(props) {
  const { id } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false);
    }
  };

  const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        id="dashboard"
        src="/dashboard"
        style={{ display: 'none' }}
        title="Receipt"
      />
      <iframe
        id="devices"
        src="/devices"
        style={{ display: 'none' }}
        title="Receipt"
      />
      <iframe
        id="groups"
        src="/groups"
        style={{ display: 'none' }}
        title="Receipt"
      />
      <iframe
        id="reports"
        src="/reports"
        style={{ display: 'none' }}
        title="Reports"
      />
      <iframe
        id="receipt"
        src="/dashboard"
        style={{ display: 'none' }}
        title="Receipt"
      />

      <button onClick={() => printIframe({ id })}>
        {isLoading ? 'Loading...' : 'Print'}
      </button>
    </>
  );
}

PagePrint.propTypes = {
  id: PropTypes.string.isRequired
};
