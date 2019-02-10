import React from 'react';
import Error from './Error';

interface ProcessingInfo {
  isLoading: boolean;
  isEmptyData: boolean;
  error: string;
}

export default function ProcessingInfo({ isLoading, error, isEmptyData }: ProcessingInfo) {
  return (
    <React.Fragment>
      {isLoading && 'Loading...'}

      {!error && !isLoading && isEmptyData && 'No Results'}

      {Boolean(error) && <Error>{'Ooops, something went wrong'}</Error>}
    </React.Fragment>
  );
}
