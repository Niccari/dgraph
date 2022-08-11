interface Props {
  isLoading: boolean;
  error: Error | null;
}

const StateMessage: (props: Props) => JSX.Element = ({ isLoading, error }) => (
  <>
    {isLoading && <span>⏰</span>}
    {error && <span>❌</span>}
    {!isLoading && !error && <span>✅</span>}
  </>
);

export default StateMessage;
