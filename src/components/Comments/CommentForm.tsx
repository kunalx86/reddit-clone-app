import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { SpinnerIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../../hooks/auth";
import { useCreateComment } from "../../hooks/comments";

export const CommentForm: React.FC<{
  parent?: number;
  postId: string;
  reply?: boolean;
}> = ({ parent = null, reply = false, postId }) => {
  const { isLoggedIn, user } = useAuth();
  const createComment = useCreateComment();
  return (
    <Flex direction="column" p={2}>
      <Formik
        initialValues={{
          comment: "",
        }}
        validate={({ comment }) => {
          const errors: Record<string, string> = {};
          if (comment.length == 0) errors.comment = "Comment cannot be empty";
          return errors;
        }}
        onSubmit={async ({ comment }, actions) => {
          actions.setSubmitting(true);
          await createComment.mutateAsync({
            comment,
            postId,
            parent,
          });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field name="comment">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.comment && form.touched.comment}
                >
                  <FormLabel>
                    {isLoggedIn ? `Comment as ${user.username}` : "Comment"}
                  </FormLabel>
                  <Textarea
                    {...field}
                    resize="both"
                    border="1px"
                    borderColor="black"
                    placeholder="Type your comment..."
                    id="comment"
                  />
                  <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex p={2} justifyContent="center">
              <Button disabled={isSubmitting || !isValid} type="submit">
                {isSubmitting && <SpinnerIcon />} {reply ? "Reply" : "Comment"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
