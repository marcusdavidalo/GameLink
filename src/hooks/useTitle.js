import { useEffect } from 'react';

const usePageTitle = (pageTitle) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
};

export default usePageTitle;
