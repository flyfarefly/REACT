import React from 'react';
import { useAddPostMutation } from '../store/slices/apiSlice';
import { useNavigate } from 'react-router-dom';
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

const AddPost = () => {
    const [addPost] = useAddPostMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required!'),
        body: Yup.string().required('Body is required!'),
    });

    return (
        <Container>
            <Formik
                initialValues={{ title: '', body: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await addPost(values);
                    navigate('/');
                }}
            >
                {({ errors, touched }) => (
                    <Form css={formStyle}>
                        <h1 css={titleStyle}>Add Post</h1>
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
                            Add
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddPost;
