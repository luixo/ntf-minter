import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppType } from "next/dist/shared/lib/utils";
import { globalCss } from "../src/styles";

const globalStyles = globalCss({
  "html, body": {
    padding: 0,
    margin: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
  },
  "*": {
    boxSizing: "border-box",
  },
});

const App: AppType = ({ Component, pageProps }) => {
  globalStyles();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 0,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
