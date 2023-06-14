import React from 'react';
import usePageTitle from '../hooks/useTitle';
function Unauthorized() {
  usePageTitle(`GameLink | Unauthorized Access`);
  return <div>Unauthorized</div>;
}

export default Unauthorized;
