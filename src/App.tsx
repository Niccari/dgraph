import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Canvas from "./components/Canvas";
import QueryUpdater from "./components/QueryUpdater";
import SettingForm from "./components/SettingForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <SettingForm />
    <Canvas />
    <QueryUpdater />
  </QueryClientProvider>
);

export default App;
