import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion"
import { useRef, useState } from "react";
import { builtinModules } from "module";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vh;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;
const BigBox = styled(motion.div)`
  
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  hover: {
    opacity: 0;
  }
`;

const Circle = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  height: 50px;
  width: 50px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: static;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Switch = styled(motion.button)`
  padding-top: 0;
`;

const btn = {
  entry: (btnClick: boolean) => ({
    scale: btnClick ? 1.2 : 1,
    color: btnClick ? "rgba(0, 168, 255,1.0)" : "rgba(232, 65, 24,1.0)"
  }),
  center: {
    scale: 1,
    color: "rgba(232, 65, 24,1.0)"
  },
}

const boxVariants = {
  hover: {
    scale: 1.1
  }
}

const overlay = {
  hidden: {backgroundColor: "rgba(0,0,0,0)"},
  visible: {backgroundColor: "rgba(0,0,0,0.5)"},
  exit: {backgroundColor: "rgba(0,0,0,0)"},
}

const button = {
  hidden: {
    color: "rgba(0, 168, 255,1.0)"
  },
  visible: {
    color:"rgba(232, 65, 24,1.0)"
  }
  
}

const btnCircle = {
  click: {
    opacity: 1
  },
  visible: {
    opcity: 0
  }
}


function App() {
  const [id, setId] = useState<null | string>(null);
  const [circle, setCircle] = useState<null | string>(null);
  const [btnClick, setBtnClick] = useState(false);
  const [ishover, setIsHover] = useState(false);
  const toggleBtn = () => {
    setBtnClick(prev => !prev)
  };

  return (
    <Wrapper>
      <Grid>
          {["1","2","3","4"].map(n => (
            <BigBox 
            initial="hidden"
            animate="visible"
            exit="exit">
              <Box onClick={() => setId(n)} variants={boxVariants} whileHover="hover" key={n} layoutId={n} >
        
                  {(!btnClick&&n==="2")?<Circle layoutId="c"/> :null}
                  {(btnClick&&n==="3")?<Circle layoutId="c"/> :null}
          
              </Box>   
            </BigBox>
          ))}
      
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{width: 400, height: 200}} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      {btnClick ? (<Switch onClick={toggleBtn}  style={{color: "rgba(232, 65, 24,1.0)", scale: 1.2}} >Switch</Switch>) : (<Switch onClick={toggleBtn} style={{color: "rgba(0, 168, 255,1.0)", scale: 1}} >Switch</Switch>)}

      
    </Wrapper>
  );
} 

export default App;