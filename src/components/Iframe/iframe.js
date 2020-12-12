import React from 'react';

const Iframe = ({ source }) => {

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    // basic bootstrap classes. you can change with yours.
    <div className="col-md-12">
      <div className="emdeb-responsive">
        <iframe
          src={source}
          title={source.substring(1)}
          id={source.substring(1)}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default Iframe;
