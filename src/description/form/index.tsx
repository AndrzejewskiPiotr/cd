import * as React from 'react';
import DescriptionForm from './form';
import { fetchDescription } from '../../api/description';
import { usePromise } from '../../hook/index';
import { data, createElement } from './form-fields';
import { OpenBtn, Wrapper, Item, Header, Heading } from './form-styled';
import { config, useChain, useSpring, useTransition } from 'react-spring';
import ExitSvg from '../../svg/exit/exit-svg';

type PAnimatedForm = {
  heading: string;
  id: string;
};

function AnimatedForm({ heading, id }: PAnimatedForm) {
  const url = `/repository/slides/${id}/description`;
  const openBtnRef: any = React.useRef(null);
  const containerRef: any = React.useRef(null);
  const transRef: any = React.useRef(null);
  const [description, isError, isPending] = usePromise(
    fetchDescription(url),
    []
  );
  const [open, set] = React.useState(false);
  const handleToggleModal = () => {
    set((open: boolean) => !open);
  };
  // @ts-ignore
  const { width, height, background, display, ...rest }: any = useSpring({
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
  const { ...btn }: any = useSpring({
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
  const transitions: any = useTransition(
    open ? data : [],
    (item: any) => item.key,
    {
      ref: transRef,
      unique: true,
      trail: 40,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0)' }
    }
  );

  useChain(
    open
      ? [openBtnRef, containerRef, transRef]
      : [transRef, containerRef, openBtnRef],
    [0, open ? 0.1 : 0.5, open ? 0.1 : 0.5]
  );

  return (
    <Wrapper>
      <OpenBtn ref={openBtnRef} style={btn} onClick={handleToggleModal}>
        Opis Medyczny
      </OpenBtn>
      <DescriptionForm
        style={{ ...rest, width, height, background, display }}
        description={description}
        render={(formikProps: any) => (
          <>
            <Header>
              <Heading>{heading}</Heading>
              <ExitSvg onClick={handleToggleModal} />
            </Header>
            {transitions.map(({ item, key, animation }: any) => (
              <Item key={key} style={animation}>
                {createElement(item.category, item, formikProps)}
              </Item>
            ))}
          </>
        )}
      />
    </Wrapper>
  );
}
export default AnimatedForm;
