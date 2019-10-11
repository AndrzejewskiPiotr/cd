import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import {connect} from "react-redux";

// @ts-ignore
const mapDispatchToProps = dispatch => ({
  close: () => dispatch({type: 'decrement'})
})
// @ts-ignore
const mapStateToProps = state => ({
  count: state.reducer.count
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

interface FadeProps {
  children: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

// @ts-ignore
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

// @ts-ignore
function SpringModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.close()
  };

  return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.count}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.count}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">takie tam</h2>
            <p id="spring-modal-description">lekarz</p>
          </div>
        </Fade>
      </Modal>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(SpringModal)
