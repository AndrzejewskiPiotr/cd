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
  Heading,
  OpenModalBtn,
  Text
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
  const containerRef = useRef()
  const openModalBtnRef = useRef()
  const headerRef = useRef()
  const fieldsRef = useRef()
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
  const { width, height, ...rest } = useSpring({
    // @ts-ignore
    ref: containerRef,
    config: config.stiff,
    from: { width: '9%', height: '5%', background: 'white' },
    to: { width: open ? '100%' : '9%', height: open ? '80%' : '5%', background: open ? 'white' : 'white' }
  })
  // @ts-ignore
  const fieldsAnimation = useTransition(
    open ? formFields : [],
    (item: any) => item.key,
    {
      // @ts-ignore
      ref: fieldsRef,
      // @ts-ignore
      trail: 1,
      // @ts-ignore
      from: { opacity: 0, transform: 'scale(0)' },
      // @ts-ignore
      enter: { opacity: 1, transform: 'scale(1)' },
      // @ts-ignore
      leave: { opacity: 0, transform: 'scale(0)', display: open ? 'block' : 'none' }
    }
  );
  // @ts-ignore
  const openBtnAnimation = useSpring({
    // @ts-ignore
    ref:openModalBtnRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({display: open ? 'none' : 'flex', opacity: open ? 0: 1 })
    },
    from: {opacity: 1}
  })
  // @ts-ignore
  const headingAnimation = useSpring({
    // @ts-ignore
    ref:headerRef,
    config: config.stiff,
    to: async (next: any) => {
      await next({display: open ? 'flex': 'none'})
      await next({opacity: open ? 1: 0 })
    },
    from: {opacity: open ? 1:0,display: open ? 'flex': 'none'}
  })
  // @ts-ignore
  useChain(open ?
    [openModalBtnRef,containerRef,headerRef,fieldsRef]:
    [fieldsRef,headerRef,containerRef,openModalBtnRef],
    [0,0.3,0.4,0.7]
  )
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
              <Text>
                Opis Medyczny
              </Text>
            </OpenModalBtn>
            <Header style={headingAnimation}>
              <Heading text={heading}/>
              <Exit onClick={handleToggleModal}/>
            </Header>
            {
              fieldsAnimation.map(({ item, key, props }:any) => (
                <Item key={key} style={props}>
                  {createElement(item.category, item, formik)}
                </Item>
              ))}
          </>
        )}
      />
    </Wrapper>
  );
}
