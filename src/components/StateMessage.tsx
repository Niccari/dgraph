import React from "react";

interface Props {
  isLoading: boolean;
  error?: Error;
}

const StateMessage = ({ isLoading, error }: Props) => (
  <>
    {isLoading && <span>⏰</span>}
    {error && <span>❌</span>}
    {!isLoading && !error && <span>✅</span>}
  </>
);

export default StateMessage;
