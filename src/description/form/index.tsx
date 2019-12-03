import * as React from 'react';
import DescriptionForm from './form';
import fetchDescription from '../../api/description';
import { usePromise } from '../../hook';
import { data, createElement } from './form-fields';
import { OpenBtn, Wrapper, Item, ExitBtn } from './form-styled';
import { config, useChain, useSpring, useTransition } from 'react-spring';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function AnimatedForm() {
  const openBtnRef: any = React.useRef(null);
  const containerRef: any = React.useRef(null);
  const transRef: any = React.useRef(null);
  const [description, isError, isPending] = usePromise(fetchDescription(), []);
  const [open, set] = React.useState(false);
  const handleToggleModal = () => {
    set(open => !open);
  };
  const { size, background, display, ...rest }: any = useSpring({
    ref: containerRef,
    config: config.stiff,
    from: { size: '10%', background: 'rgba(0, 0, 0, 0)', display: 'none' },
    to: {
      display: open ? 'flex' : 'none',
      size: open ? `70%` : '10%',
      background: open ? 'white' : 'rgba(0, 0, 0, 0)'
    }
  });

  const { ...btn }: any = useSpring({
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
  const transitions: any = useTransition(open ? data : [], item => item.key, {
    ref: transRef,
    unique: true,
    trail: 40,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  });

  useChain(
    open
      ? [openBtnRef, containerRef, transRef]
      : [transRef, containerRef, openBtnRef],
    [0, open ? 0.1 : 0.6, open ? 0.1 : 0.6]
  );

  return (
    <Wrapper>
      <OpenBtn ref={openBtnRef} style={btn} onClick={handleToggleModal}>
        Opis Medyczny
      </OpenBtn>
      <DescriptionForm
        style={{
          ...rest,
          width: size,
          height: size,
          background: background,
          display: display
        }}
        description={description}
        render={(formikProps: any) => (
          <>
            <ExitBtn onClick={handleToggleModal}>
              <HighlightOffIcon style={{ fontSize: 40, color: '#00406b' }} />
            </ExitBtn>
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
