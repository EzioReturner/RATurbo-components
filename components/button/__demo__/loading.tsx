import React, { useState, useEffect } from 'react';
import Button from 'turbo-components/lib/button';
import RefreshCw from 'react-feather/dist/icons/refresh-cw';

import '../style';

export default () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (loading) {
      interval = window.setInterval(() => setLoading(false), 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="button-demo-container">
      <Button loading>Loading</Button>
      <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
        click me!!
      </Button>

      <Button type="dashed" loading>
        Loading
      </Button>
      <Button type="text" loading>
        Loading
      </Button>
      <Button type="link" href="#" loading>
        Link
      </Button>
    </div>
  );
};
