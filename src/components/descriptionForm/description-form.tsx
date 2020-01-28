import React, { useRef, useState, SyntheticEvent } from 'react';
import { useSpring, config, useChain, useTransition } from 'react-spring';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Wrapper,
  OpenModalBtn,
  Text,
  Header,
  Heading,
  Exit,
  Item,
  MaterialAlert,
  MaterialSnackBar
} from './description-form-styled';
import { usePromise } from '../../hook';
import { DescriptionFormService, FormValues } from './description-form-service';
import { createElement, formFields } from './fields';

type PDescriptionForm = {
  id: string;
  heading: string;
  className?: string;
};

type Severity = 'error' | 'info' | 'success' | 'warning';

type Response = {
  severity: Severity;
  msg: string;
};

const FormSchema = yup.object().shape({
  classification: yup.object().shape({
    code: yup.string().required('Pole jest wymagane !'),
    standard: yup.string().required('Pole jest wymagane !')
  })
});

const RESPONSE = {
  success: {
    severity: 'success' as Severity,
    msg: 'Formularz został zaktualizowany !'
  },
  error: {
    severity: 'error' as Severity,
    msg: 'Wystąpił błąd podczas próby zapisu !'
  }
};

export function DescriptionForm({ id, heading ,...rest}: PDescriptionForm) {
  const autoHiddenDurationNotification = 4000;
  const descriptionFormService = new DescriptionFormService(id);
  const [description] = usePromise(descriptionFormService.getDescription(), []);
  const initialValue = descriptionFormService.createInitialFormValues(
    description
  );

  const [open, set] = useState(false);
  const [updateResponse, setUpdateResponse] = useState<Response>({
    severity: 'error',
    msg: ''
  });
  const [showApiResponse, setApiResponse] = useState(false);

  const containerRef = useRef() as any;
  const openModalBtnRef = useRef() as any;
  const headerRef = useRef() as any;
  const fieldsRef = useRef() as any;

  const handleToggleModal = () => {
    setApiResponse(false);
    set((open: boolean) => !open);
  };

  const handleSubmit = async (formValues: FormValues) => {
    try {
      await descriptionFormService.updateDescription(formValues);
      setUpdateResponse(RESPONSE.success);
    } catch (err) {
      setUpdateResponse(RESPONSE.error);
    }
    setApiResponse(true);
  };

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setApiResponse(false);
  };
  // @ts-ignore
  const containerAnimation = useSpring({
    ref: containerRef,
    config: config.stiff,
    from: { width: '9%', height: '5%' },
    to: {
      width: open ? '100%' : '9%',
      height: open ? '80%' : '5%'
    }
  });

  // @ts-ignore
  const openBtnAnimation = useSpring({
    ref: openModalBtnRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({ display: open ? 'none' : 'flex' });
      await next({ opacity: open ? 0 : 1 });
    },
    from: { opacity: 1 }
  });
  // @ts-ignore
  const headingAnimation = useSpring({
    ref: headerRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({ display: open ? 'flex' : 'none' });
      await next({ opacity: open ? 1 : 0 });
    },
    from: { opacity: open ? 1 : 0, display: open ? 'flex' : 'none' }
  });
  // @ts-ignore
  const fieldsAnimation = useTransition(
    open ? formFields : [],
    (item: any) => item.key,
    {
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

  useChain(
    open
      ? [openModalBtnRef, containerRef, headerRef, fieldsRef]
      : [fieldsRef, headerRef, containerRef, openModalBtnRef],
    [0, 0.3, 0.4, 0.7]
  );

  return (
    <Wrapper {...rest}>
      <Formik
        enableReinitialize={true}
        validationSchema={FormSchema}
        initialValues={initialValue}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Container style={containerAnimation} onSubmit={handleSubmit}>
            <>
              <OpenModalBtn
                style={openBtnAnimation}
                onClick={handleToggleModal}
              >
                <Text text={`Opis Medyczny`} />
              </OpenModalBtn>
              <Header style={headingAnimation}>
                <Heading text={heading} />
                <Exit onClick={handleToggleModal} />
              </Header>
              {fieldsAnimation.map(({ item, key, props }: any) => (
                <Item key={key} style={props}>
                  {createElement(item.category, item)}
                </Item>
              ))}
              <MaterialSnackBar
                open={showApiResponse}
                autoHideDuration={autoHiddenDurationNotification}
                onClose={handleClose}
              >
                <MaterialAlert
                  onClose={handleClose}
                  severity={updateResponse.severity}
                  msg={updateResponse.msg}
                />
              </MaterialSnackBar>
            </>
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
}
