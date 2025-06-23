import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

const Review = ({ editorRef }) => {
  const toast = useToast();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const reviewCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      console.log(sourceCode);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code: sourceCode,
      });

      setReview(response.data.split("\n"));
      response.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to review code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="25%">
      <Text mb={2} fontSize="lg">
        Review :
      </Text>
      <Button
        variant="outline"
        colorScheme="yellow"
        mb={4}
        isLoading={isLoading}
        onClick={reviewCode}
      >
        Review Code
      </Button>
      <Box
        height="83vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {review
          ? review.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Review Code" to see the Model Human Generic Reveiw here'}
      </Box>
    </Box>
  );
};
export default Review;
