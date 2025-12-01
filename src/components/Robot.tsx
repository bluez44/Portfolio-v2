import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { ModelsProps } from "../types";
import { useFrame } from "@react-three/fiber";
import { AnimationAction, LoopOnce, Mesh } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const getRandomAction = (
  actions: Record<string, AnimationAction | null>,
  currentActionName: string | null
): string => {
  const actionNames = Object.keys(actions).filter(
    (name) => actions[name] && name !== currentActionName
  );
  if (actionNames.length === 0) return "";
  const randomIndex = Math.floor(Math.random() * actionNames.length);
  return actionNames[randomIndex];
};

const Robot = (props: ModelsProps) => {
  const { scene, animations } = useGLTF("/models/robot.glb");
  const robotRef = useRef<Mesh>(null);
  const { actions, mixer } = useAnimations(animations, robotRef);

  const [currentActionName, setCurrentActionName] = useState<string>("Dance");

  const playAction = (name: string) => {
    const currentAction = actions[currentActionName];
    const nextAction = actions[name];

    if (currentAction && nextAction) {
      currentAction.fadeOut(0.5);
      nextAction.reset().fadeIn(0.5).play();
      setCurrentActionName(name);
    } else if (nextAction) {
      nextAction.reset().fadeIn(0.5).play();
      setCurrentActionName(name);
    }
  };

  useEffect(() => {
    if (mixer) {
      const onActionFinished = (e: { action: AnimationAction }) => {
        const finishedActionName = e.action.getClip().name;

        if (finishedActionName === currentActionName) {
          const nextActionName = getRandomAction(actions, currentActionName);

          if (nextActionName) {
            playAction(nextActionName);
          }
        }
      };

      mixer.addEventListener("finished", onActionFinished);

      Object.values(actions).forEach((action) => {
        if (action) {
          action.setLoop(LoopOnce, 1);
          action.clampWhenFinished = true;
        }
      });

      Promise.resolve().then(() => {
        playAction(currentActionName);
      });

      return () => {
        mixer.removeEventListener("finished", onActionFinished);
      };
    }
  }, [mixer, actions, currentActionName]);

  useGSAP(() => {
    if (robotRef.current) {
      gsap.to(robotRef.current.position, {
        y: robotRef.current.position.y + 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
      });
    }
  });

  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y += 0.01;
    }
  });

  const handlePointerOver = () => {
    document.body.style.cursor = "grab";
  };

  const handlePointerDown = () => {
    document.body.style.cursor = "grabbing";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <mesh
      {...props}
      ref={robotRef}
      onPointerOver={handlePointerOver}
      onPointerDown={handlePointerDown}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Robot;
