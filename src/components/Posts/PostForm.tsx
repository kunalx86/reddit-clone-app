import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Spinner, useToast } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { Field, Form, Formik, FormikProvider } from "formik";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/axios";
import { useCreatePost } from "../../hooks/posts";

const initialValues: {
  title: string;
  group?: number;
  type: "TEXT" | "IMAGE" | "GIF";
  text?: string;
  post?: File;
} = {
  title: "",
  type: "TEXT",
  text: "",
  post: null,
};

/*
 * Flow:
 * Select Group to post in (only followed group) or self for no group
 * Give title
 * Switch type for either TEXT or IMAGE
 * If TEXT show Textarea
 * If IMAGE show filepicker
 * During submission, build appropriate object to post
 * If type image, use post id to upload the image
 * Once done redirect user to that post detail page
 */
export const PostForm = () => {
  const { mutateAsync } = useCreatePost();
  const axios = useAxios();
  const router = useRouter();
  const toast = useToast();
  return (
    <Flex mb={2} border="1px" borderColor="black" borderRadius="md" p={2}>
      <Formik
        initialValues={initialValues}
        onSubmit={async ({ title, type, text, post }, actions) => {
          actions.setSubmitting(true);
          const { data } = await mutateAsync({
            title,
            media: {
              type,
              text: type === "TEXT" ? text : undefined,
            },
          });

          // Post IMAGE to /:postId/image for final touch
          if (type === "IMAGE") {
            const formData = new FormData();
            formData.append("post", post);
            const response = await axios.post(
              `/posts/${data.id}/image`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
              }
            );
            data.media.mediaUrl = response.data.data.media.mediaUrl;
          }
          actions.setSubmitting(false);
          toast({
            status: "success",
            title: "Post created! ????",
            isClosable: true,
            description: "Post has been created successfully!",
          });
          router.push(`posts/${data.id}`);
        }}
      >
        {({ isSubmitting, values: { type, post }, setFieldValue }) => (
          <Form>
            <Flex
              direction="column"
              justifyItems="center"
              alignItems="center"
              p={2}
            >
              <Field name="title">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Title of post</FormLabel>
                    <Input
                      {...field}
                      borderColor="black"
                      placeholder="Title of your post..."
                      type="text"
                      id="title"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="type">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Type of Post</FormLabel>
                    <RadioGroup>
                      <Radio
                        disabled={isSubmitting}
                        p={2}
                        {...field}
                        value="TEXT"
                      >
                        Text
                      </Radio>
                      <Radio
                        disabled={isSubmitting}
                        p={2}
                        {...field}
                        value="IMAGE"
                      >
                        Image
                      </Radio>
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
              {type === "TEXT" ? (
                <Field name="text">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Body of post</FormLabel>
                      <Textarea
                        {...field}
                        p={2}
                        name="text"
                        placeholder="Give some body to your post..."
                      />
                    </FormControl>
                  )}
                </Field>
              ) : (
                <Field>
                  {({ field, form }) => (
                    <>
                      <FormControl>
                        <FormLabel>Select Image for your post</FormLabel>
                        <input
                          onChange={(e) =>
                            setFieldValue("post", e.target.files[0])
                          }
                          name="post"
                          type="file"
                        />
                      </FormControl>
                      {post && <ImagePreview file={post} />}
                    </>
                  )}
                </Field>
              )}
              <Button mt={2} disabled={isSubmitting} type="submit">
                {isSubmitting && <Spinner />}Post!
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

const ImagePreview: React.FC<{ file: File }> = ({ file }) => {
  const [img, setImg] = useState<string>(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => setImg(reader.result as string);
  return img && <Image p={2} width="500px" height="500px" src={img} />;
};
