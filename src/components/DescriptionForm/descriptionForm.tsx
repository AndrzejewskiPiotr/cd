import React, { useRef, useState } from 'react';
import { config, useChain, useSpring, useTransition } from 'react-spring';
import * as yup from 'yup';

import {
  Item,
  Exit,
  Container,
  Wrapper,
  OpenBtn,
  Header,
  Heading
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

export function DescriptionForm({ heading, id }: PAnimatedForm) {
  const api = new API();
  const url = `/repository/slides/${id}/description`;
  const openBtnRef = useRef(null);
  const containerRef = useRef(null);
  const transRef = useRef(null);
  const [description, isError, isPending] = usePromise(api.get(url), []);
  const [open, set] = useState(false);
  const handleToggleModal = () => {
    set((open: boolean) => !open);
  };
  const handleSubmit = async (formValues: FormValues) => {
    const updatedDescription = JSON.stringify(
      createDescription(formValues, id)
    );
    await api.put(url, { body: updatedDescription });
  };
  const handleInitialValues = () => {
    const isDescription = description.length !== 0;
    return createFormInitialValues(description, isDescription);
  };
  // @ts-ignore
  const { width, height, background, display, ...rest } = useSpring({
    // @ts-ignore
    ref: containerRef,
    config: config.stiff,
    from: {
      width: '10%',
      heigh: '10%',
      background: 'rgba(0, 0, 0, 0)',
      display: 'none'
    },
    to: {
      display: open ? 'flex' : 'none',
      width: open ? `100%` : '10%',
      height: open ? `100%` : '10%',
      background: open ? 'white' : 'rgba(0, 0, 0, 0)'
    }
  });
  // @ts-ignore
  const { ...btn } = useSpring({
    // @ts-ignore
    ref: openBtnRef,
    config: config.stiff,
    from: {
      opacity: 1,
      display: 'block'
    },
    to: {
      opacity: open ? 0 : 1,
      display: open ? 'none' : 'block'
    }
  });
  const transitions = useTransition(
    open ? formFields : [],
    (item: any) => item.key,
    {
      // @ts-ignore
      ref: transRef,
      unique: true,
      trail: 1,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0)' }
    }
  );
  // @ts-ignore
  useChain(
    open
      ? [openBtnRef, containerRef, transRef]
      : [transRef, containerRef, openBtnRef],
    [0, open ? 0.1 : 0.6, open ? 0.1 : 0.6]
  );

  return (
    <Wrapper>
      <OpenBtn
        ref={openBtnRef}
        style={btn}
        onClick={handleToggleModal}
        text="Opis Medyczny"
      />
      <Container
        style={{ ...rest, width, height, background, display }}
        initialValues={handleInitialValues()}
        validationSchema={FormSchema}
        handleSubmit={handleSubmit}
        render={(formik: any) => (
          <>
            <Header>
              <Heading onClick={handleToggleModal} text={heading} />
              <Exit onClick={handleToggleModal} />
            </Header>
            {transitions.map(({ item, key, animation }: any) => (
              <Item key={key} style={animation}>
                {createElement(item.category, item, formik)}
              </Item>
            ))}
          </>
        )}
      />
    </Wrapper>
  );
}
