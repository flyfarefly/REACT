import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostsQuery, useUpdatePostMutation } from '../store/slices/apiSlice';
import { TextField, Button, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/react';

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const titleStyle = css`
  text-align: center;
`;

const buttonStyle = css`
  align-self: center;
`;

const EditPost = () => {
    const { id } = useParams();
    const { data: posts } = useGetPostsQuery();
    const post = posts?.find((post) => post.id === parseInt(id));
    const [updatePost] = useUpdatePostMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!post) {
            navigate('/');
        }
    }, [post, navigate]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required!'),
        body: Yup.string().required('Body is required!'),
    });

    return (
        <Container>
            <Formik
                initialValues={{
                    title: post ? post.title : '',
                    body: post ? post.body : '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await updatePost({ id: parseInt(id), ...values });
                    navigate('/');
                }}
            >
                {({ errors, touched }) => (
                    <Form css={formStyle}>
                        <h1 css={titleStyle}>Edit Post</h1>
                        <Field
                            name="title"
                            as={TextField}
                            label="Title"
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                        />
                        <Field
                            name="body"
                            as={TextField}
                            label="Body"
                            multiline
                            rows={4}
                            error={touched.body && !!errors.body}
                            helperText={touched.body && errors.body}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            css={buttonStyle}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditPost;
