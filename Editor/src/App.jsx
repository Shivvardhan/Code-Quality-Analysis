import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={4} py={4}>
      <CodeEditor />
    </Box>
  );
}

export default App;
