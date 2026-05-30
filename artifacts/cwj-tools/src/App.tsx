import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "./components/layout";
import Home from "./pages/home";
import Tools from "./pages/tools";
import About from "./pages/about";
import NotFound from "./pages/not-found";

import WeatherTool from "./pages/tools/weather";
import CurrencyTool from "./pages/tools/currency";
import WorldTimeTool from "./pages/tools/world-time";
import DateCalcTool from "./pages/tools/date-calc";
import PasswordGenTool from "./pages/tools/password-gen";
import JsonFormatTool from "./pages/tools/json-format";
import Base64Tool from "./pages/tools/base64";
import UrlEncodeTool from "./pages/tools/url-encode";
import TextFormatTool from "./pages/tools/text-format";
import PlaceholderTool from "./pages/tools/placeholder";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/about" component={About} />
        
        {/* Utility Tools */}
        <Route path="/tools/weather" component={WeatherTool} />
        <Route path="/tools/currency" component={CurrencyTool} />
        <Route path="/tools/world-time" component={WorldTimeTool} />
        <Route path="/tools/date-calc" component={DateCalcTool} />
        <Route path="/tools/password-gen" component={PasswordGenTool} />

        {/* Dev Tools */}
        <Route path="/tools/json-format" component={JsonFormatTool} />
        <Route path="/tools/base64" component={Base64Tool} />
        <Route path="/tools/url-encode" component={UrlEncodeTool} />
        <Route path="/tools/site-info">
          <PlaceholderTool title="Site Intelligence" />
        </Route>

        {/* File Tools */}
        <Route path="/tools/text-format" component={TextFormatTool} />
        <Route path="/tools/image-compress">
          <PlaceholderTool title="Image Compression" />
        </Route>
        <Route path="/tools/pdf-tools">
          <PlaceholderTool title="PDF Operations" />
        </Route>

        {/* AI Tools */}
        <Route path="/tools/ai-chat">
          <PlaceholderTool title="AI Protocol" />
        </Route>
        <Route path="/tools/ai-translate">
          <PlaceholderTool title="Neural Translation" />
        </Route>
        <Route path="/tools/ai-copy">
          <PlaceholderTool title="Copy Generation" />
        </Route>
        <Route path="/tools/ai-code">
          <PlaceholderTool title="Code Assistant" />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;