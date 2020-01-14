import React, { useRef, useState, SyntheticEvent } from 'react';
import { config, useChain, useSpring, useTransition } from 'react-spring';
import * as yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';

import {
  Item,
  Exit,
  Container,
  Wrapper,
  OpenModalBtn,
  Text,
  Header,
  Heading,
  MaterialSnackBar
} from './descriptionForm-styled';
import { usePromise } from '../../hook/usePromise';
import { API } from '../../api';
import { createElement, formFields } from './fields';

type PAnimatedForm = {
  heading: string;
  id: string;
};

const FormSchema = yup.object().shape({
  classification: yup.object().shape({
    code: yup.string().required('Pole jest wymagane !'),
    standard: yup.string().required('Pole jest wymagane !')
  })
});

type FormValues = {
  classification: {
    standard: string;
    code: string;
  };
};

const createDescription = (formValues: FormValues, id: string) => ({
  ...formValues,
  slide_id: id
});

const createFormInitialValues = (describtion: any, isDescription: boolean) => ({
  classification: {
    code: isDescription ? describtion.description.classification.code : '',
    standard: isDescription
      ? describtion.description.classification.standard
      : ''
  }
});

function Alert({ msg, variant, ...props }: any) {
  return (
    <MuiAlert elevation={6} variant="filled" severity={variant} {...props}>
      {msg}
    </MuiAlert>
  );
}

const RESPONSE = {
  success: {
    variant: 'success',
    msg: 'Formularz został zaktualizowany !'
  },
  error: {
    variant: 'error',
    msg: 'Wystąpił błąd podczas próby zapisu !'
  }
};

export function DescriptionForm({ heading, id }: PAnimatedForm) {
  const api = new API();
  const url = `/repository/slides/${id}/description`;
  const autoHiddenDurationNotification = 4000;
  const [updateResponse, setUpdateResponse] = useState({
    variant: '',
    msg: ''
  });
  const [showApiResponse, setApiResponse] = useState(false);
  const [description] = usePromise(api.get(url), []);
  const [open, set] = useState(false);
  const handleToggleModal = () => {
    setApiResponse(false);
    set((open: boolean) => !open);
  };
  const handleSubmit = async (formValues: FormValues) => {
    const updatedDescription = JSON.stringify(
      createDescription(formValues, id)
    );
    try {
      await api.put(url, { body: updatedDescription });
      setUpdateResponse(RESPONSE.success);
      setApiResponse(true);
    } catch (err) {
      setUpdateResponse(RESPONSE.error);
      setApiResponse(true);
    }
  };
  const handleInitialValues = () => {
    const isDescription = description.length !== 0;
    return createFormInitialValues(description, isDescription);
  };

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setApiResponse(false);
  };

  const containerRef = useRef() as any;
  const openModalBtnRef = useRef() as any;
  const headerRef = useRef() as any;
  const fieldsRef = useRef() as any;
  // @ts-ignore
  const { width, height, ...rest } = useSpring({
    // @ts-ignore
    ref: containerRef,
    config: config.stiff,
    from: { width: '9%', height: '5%', background: 'white' },
    to: {
      width: open ? '100%' : '9%',
      height: open ? '80%' : '5%',
      background: open ? 'white' : 'white'
    }
  });
  const fieldsAnimation = useTransition(
    open ? formFields : [],
    (item: any) => item.key,
    {
      // @ts-ignore
      ref: fieldsRef,
      trail: 1,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: {
        opacity: 0,
        transform: 'scale(0)',
        display: open ? 'block' : 'none'
      }
    }
  );
  // @ts-ignore
  const openBtnAnimation = useSpring({
    // @ts-ignore
    ref: openModalBtnRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({ display: open ? 'none' : 'flex', opacity: open ? 0 : 1 });
    },
    from: { opacity: 1 }
  });
  // @ts-ignore
  const headingAnimation = useSpring({
    // @ts-ignore
    ref: headerRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({ display: open ? 'flex' : 'none' });
      await next({ opacity: open ? 1 : 0 });
    },
    from: { opacity: open ? 1 : 0, display: open ? 'flex' : 'none' }
  });
  // @ts-ignore
  useChain(
    open
      ? [openModalBtnRef, containerRef, headerRef, fieldsRef]
      : [fieldsRef, headerRef, containerRef, openModalBtnRef],
    [0, 0.3, 0.4, 0.7]
  );
  return (
    <Wrapper>
      <Container
        style={{ ...rest, width, height }}
        initialValues={handleInitialValues()}
        validationSchema={FormSchema}
        handleSubmit={handleSubmit}
        render={(formik: any) => (
          <>
            <OpenModalBtn style={openBtnAnimation} onClick={handleToggleModal}>
              <Text>Opis Medyczny</Text>
            </OpenModalBtn>
            <Header style={headingAnimation}>
              <Heading text={heading} />
              <Exit onClick={handleToggleModal} />
            </Header>
            {fieldsAnimation.map(({ item, key, props }: any) => (
              <Item key={key} style={props}>
                {createElement(item.category, item, formik)}
              </Item>
            ))}
            <MaterialSnackBar
              open={showApiResponse}
              autoHideDuration={autoHiddenDurationNotification}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                variant={updateResponse.variant}
                msg={updateResponse.msg}
              />
            </MaterialSnackBar>
          </>
        )}
      />
    </Wrapper>
  );
}
