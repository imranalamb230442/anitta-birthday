"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* =========================================================
   STAR FIELD
========================================================= */

function StarField({ intense = false }: { intense?: boolean }) {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const starCount = 1200;
    const array = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      array[i * 3] = (Math.random() - 0.5) * 22;
      array[i * 3 + 1] = (Math.random() - 0.5) * 16;
      array[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    return array;
  }, []);

  useFrame((_, delta) => {
    if (!starsRef.current) return;

    starsRef.current.rotation.y +=
      delta * (intense ? 0.07 : 0.012);

    starsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={intense ? 0.045 : 0.035}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

/* =========================================================
   HEART
========================================================= */

function Heart() {
  const shape = useMemo(() => {
    const heart = new THREE.Shape();

    heart.moveTo(0, -0.3);

    heart.bezierCurveTo(
      -0.7,
      -0.9,
      -1.2,
      -0.1,
      -0.65,
      0.45
    );

    heart.bezierCurveTo(
      -0.3,
      0.8,
      0,
      0.45,
      0,
      0.25
    );

    heart.bezierCurveTo(
      0,
      0.45,
      0.3,
      0.8,
      0.65,
      0.45
    );

    heart.bezierCurveTo(
      1.2,
      -0.1,
      0.7,
      -0.9,
      0,
      -0.3
    );

    return heart;
  }, []);

  return (
    <mesh
      position={[0, 0.02, 1.12]}
      scale={0.27}
    >
      <extrudeGeometry
        args={[
          shape,
          {
            depth: 0.18,
            bevelEnabled: true,
            bevelSegments: 3,
            bevelSize: 0.06,
            bevelThickness: 0.04,
          },
        ]}
      />

      <meshStandardMaterial
        color="#ff6fae"
        emissive="#ff2f8f"
        emissiveIntensity={1.5}
        roughness={0.35}
      />
    </mesh>
  );
}

/* =========================================================
   TEDDY
========================================================= */

function Teddy({
  started,
  onClick,
}: {
  started: boolean;
  onClick: () => void;
}) {
  const teddyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!teddyRef.current) return;

    const time = state.clock.elapsedTime;

    teddyRef.current.position.y =
      Math.sin(time * 1.5) * 0.06;

    teddyRef.current.rotation.y =
      Math.sin(time * 0.7) * 0.07;

    if (started) {
      teddyRef.current.rotation.z =
        Math.sin(time * 7) * 0.045;

      const bounce =
        1 + Math.sin(time * 7) * 0.018;

      teddyRef.current.scale.setScalar(bounce);
    }
  });

  return (
    <group
      ref={teddyRef}
      position={[0, -1.65, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {/* Body */}
      <mesh>
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      {/* Belly */}
      <mesh
        position={[0, -0.08, 0.9]}
        scale={[0.64, 0.7, 0.25]}
      >
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial
          color="#d39a78"
          roughness={0.9}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[1.12, 40, 40]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.88, 1.82, 0]}>
        <sphereGeometry args={[0.43, 32, 32]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      <mesh position={[0.88, 1.82, 0]}>
        <sphereGeometry args={[0.43, 32, 32]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      {/* Inner ears */}
      <mesh
        position={[-0.88, 1.82, 0.34]}
        scale={[0.6, 0.6, 0.2]}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#d39a78"
          roughness={0.9}
        />
      </mesh>

      <mesh
        position={[0.88, 1.82, 0.34]}
        scale={[0.6, 0.6, 0.2]}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#d39a78"
          roughness={0.9}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.38, 1.38, 1.02]}>
        <sphereGeometry args={[0.115, 24, 24]} />
        <meshStandardMaterial
          color="#24130f"
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0.38, 1.38, 1.02]}>
        <sphereGeometry args={[0.115, 24, 24]} />
        <meshStandardMaterial
          color="#24130f"
          roughness={0.25}
        />
      </mesh>

      {/* Eye highlights */}
      <mesh position={[-0.35, 1.43, 1.11]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0.41, 1.43, 1.11]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Muzzle */}
      <mesh
        position={[0, 1.02, 1.02]}
        scale={[0.48, 0.36, 0.28]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#d39a78"
          roughness={0.9}
        />
      </mesh>

      {/* Nose */}
      <mesh
        position={[0, 1.08, 1.3]}
        scale={[0.18, 0.13, 0.12]}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#24130f"
          roughness={0.3}
        />
      </mesh>

      {/* Arms */}
      <mesh
        position={[-1, 0.05, 0]}
        rotation={[0, 0, -0.45]}
      >
        <capsuleGeometry args={[0.27, 0.85, 12, 24]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      <mesh
        position={[1, 0.05, 0]}
        rotation={[0, 0, 0.45]}
      >
        <capsuleGeometry args={[0.27, 0.85, 12, 24]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.82}
        />
      </mesh>

      {/* Feet */}
      <mesh
        position={[-0.5, -0.88, 0.25]}
        scale={[0.55, 0.38, 0.7]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.85}
        />
      </mesh>

      <mesh
        position={[0.5, -0.88, 0.25]}
        scale={[0.55, 0.38, 0.7]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#9a6347"
          roughness={0.85}
        />
      </mesh>

      {/* Heart */}
      <Heart />

      {/* Bow */}
      <mesh
        position={[-0.25, 2.12, 0.55]}
        rotation={[0, 0, -0.25]}
        scale={[0.42, 0.28, 0.12]}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#e879a9"
          roughness={0.45}
        />
      </mesh>

      <mesh
        position={[0.25, 2.12, 0.55]}
        rotation={[0, 0, 0.25]}
        scale={[0.42, 0.28, 0.12]}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#e879a9"
          roughness={0.45}
        />
      </mesh>

      <mesh
        position={[0, 2.12, 0.57]}
        scale={[0.16, 0.16, 0.12]}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#ff9bc4"
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   GIFT BOX
========================================================= */

function GiftBox({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  const giftRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (giftRef.current) {
      giftRef.current.position.y =
        Math.sin(time * 1.4) * 0.07;

      giftRef.current.rotation.y =
        Math.sin(time * 0.8) * 0.04;
    }

    if (lidRef.current) {
      const targetRotation = opened
        ? -0.65
        : 0;

      lidRef.current.rotation.z =
        THREE.MathUtils.lerp(
          lidRef.current.rotation.z,
          targetRotation,
          0.08
        );

      const targetY = opened ? 1.05 : 0.82;

      lidRef.current.position.y =
        THREE.MathUtils.lerp(
          lidRef.current.position.y,
          targetY,
          0.08
        );
    }
  });

  return (
    <group
      ref={giftRef}
      position={[0, -1.4, 0]}
      onClick={(event) => {
        event.stopPropagation();

        if (!opened) {
          onOpen();
        }
      }}
    >
      {/* Box */}
      <mesh>
        <boxGeometry args={[2.5, 1.8, 2.5]} />
        <meshStandardMaterial
          color="#c95d8f"
          roughness={0.55}
        />
      </mesh>

      {/* Vertical ribbon */}
      <mesh position={[0, 0, 1.27]}>
        <boxGeometry args={[0.38, 1.82, 0.05]} />
        <meshStandardMaterial
          color="#f7d38b"
          roughness={0.35}
        />
      </mesh>

      {/* Lid */}
      <group
        ref={lidRef}
        position={[0, 0.82, 0]}
      >
        <mesh>
          <boxGeometry args={[2.75, 0.35, 2.75]} />
          <meshStandardMaterial
            color="#df78a5"
            roughness={0.5}
          />
        </mesh>

        <mesh position={[0, 0.01, 1.39]}>
          <boxGeometry args={[0.38, 0.36, 0.05]} />
          <meshStandardMaterial
            color="#f7d38b"
            roughness={0.35}
          />
        </mesh>

        {/* Bow */}
        <mesh
          position={[-0.35, 0.3, 0]}
          rotation={[0, 0, -0.25]}
          scale={[0.55, 0.32, 0.18]}
        >
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#f2b7d1"
            roughness={0.4}
          />
        </mesh>

        <mesh
          position={[0.35, 0.3, 0]}
          rotation={[0, 0, 0.25]}
          scale={[0.55, 0.32, 0.18]}
        >
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#f2b7d1"
            roughness={0.4}
          />
        </mesh>

        <mesh
          position={[0, 0.3, 0]}
          scale={[0.2, 0.2, 0.2]}
        >
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#f7d38b"
            roughness={0.3}
          />
        </mesh>
      </group>

      {opened && (
        <pointLight
          position={[0, 1, 0]}
          intensity={5}
          distance={5}
        />
      )}
    </group>
  );
}


/* =========================================================
   3D BIRTHDAY CAKE
========================================================= */

function CandleFlame({
  wished,
  index,
}: {
  wished: boolean;
  index: number;
}) {
  const flameRef = useRef<THREE.Group>(null);
  const smokeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (flameRef.current) {
      if (!wished) {
        const pulse =
          1 + Math.sin(time * 12 + index * 1.8) * 0.13;

        flameRef.current.scale.set(
          pulse,
          1 + Math.sin(time * 15 + index) * 0.16,
          pulse
        );

        flameRef.current.rotation.z =
          Math.sin(time * 9 + index) * 0.08;
      } else {
        const current = flameRef.current.scale.x;
        const next = THREE.MathUtils.lerp(current, 0, 0.16);

        flameRef.current.scale.set(
          next,
          next,
          next
        );
      }
    }

    if (smokeRef.current) {
      if (wished) {
        smokeRef.current.visible = true;

        const target = 1;
        const current = smokeRef.current.scale.x;
        const next = THREE.MathUtils.lerp(
          current,
          target,
          0.08
        );

        smokeRef.current.scale.setScalar(next);
        smokeRef.current.position.y =
          THREE.MathUtils.lerp(
            smokeRef.current.position.y,
            1.05,
            0.025
          );
      } else {
        smokeRef.current.visible = false;
      }
    }
  });

  return (
    <>
      <group
        ref={flameRef}
        position={[0, 0.7, 0]}
      >
        <mesh scale={[0.16, 0.28, 0.16]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial
            color="#ff8a2d"
            emissive="#ff5b19"
            emissiveIntensity={2.7}
            roughness={0.18}
          />
        </mesh>

        <mesh
          position={[0, -0.07, 0]}
          scale={[0.075, 0.16, 0.075]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#fff7c7"
            emissive="#fff1a0"
            emissiveIntensity={2}
            roughness={0.12}
          />
        </mesh>
      </group>

      <group
        ref={smokeRef}
        position={[0, 0.76, 0]}
        scale={0}
        visible={false}
      >
        {[0, 0.18, 0.35].map((offset, smokeIndex) => (
          <mesh
            key={smokeIndex}
            position={[
              Math.sin(smokeIndex * 2.2) * 0.06,
              offset,
              0,
            ]}
            scale={0.09 + smokeIndex * 0.025}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#d9d0d9"
              transparent
              opacity={0.22}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

function CakeFlower({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = index * (Math.PI * 2 / 5);

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.13,
              0,
              Math.sin(angle) * 0.13,
            ]}
            scale={[0.12, 0.045, 0.18]}
          >
            <sphereGeometry args={[1, 18, 18]} />
            <meshStandardMaterial
              color="#f58eb7"
              roughness={0.38}
            />
          </mesh>
        );
      })}

      <mesh scale={0.065}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#ffd36b"
          emissive="#ffad35"
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function SideFlowerBranch({
  side,
}: {
  side: "left" | "right";
}) {
  const direction = side === "left" ? -1 : 1;

  return (
    <group
      position={[direction * 3.25, -1.0, -0.4]}
      rotation={[0, direction * 0.12, direction * 0.16]}
      scale={1.05}
    >
      {/* Branch */}
      <mesh
        position={[direction * 0.55, 0.5, 0]}
        rotation={[0, 0, direction * 0.35]}
      >
        <cylinderGeometry args={[0.035, 0.055, 2.1, 12]} />
        <meshStandardMaterial
          color="#6e493f"
          roughness={0.8}
        />
      </mesh>

      {/* Leaves */}
      {[
        [0.35, 0.25, 0.08, -0.65],
        [0.75, 0.7, -0.02, 0.55],
        [0.05, 0.95, 0.03, -0.45],
      ].map((item, index) => (
        <mesh
          key={`leaf-${side}-${index}`}
          position={[
            direction * (item[0] as number),
            item[1] as number,
            item[2] as number,
          ]}
          rotation={[
            0,
            0,
            direction * (item[3] as number),
          ]}
          scale={[0.24, 0.07, 0.12]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#6f8a67"
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Blossoms */}
      <CakeFlower
        position={[
          direction * 0.08,
          1.12,
          0.02,
        ]}
        scale={1.35}
      />

      <CakeFlower
        position={[
          direction * 0.72,
          0.72,
          0.04,
        ]}
        scale={1.05}
      />

      <CakeFlower
        position={[
          direction * 0.98,
          0.18,
          0.05,
        ]}
        scale={0.9}
      />
    </group>
  );
}

function PetalField() {
  const petals = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        x: (Math.random() - 0.5) * 11,
        y: (Math.random() - 0.5) * 7,
        z: -1.5 - Math.random() * 3,
        scale: 0.055 + Math.random() * 0.075,
        speed: 0.25 + Math.random() * 0.45,
        rotation: Math.random() * Math.PI,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    refs.current.forEach((petal, index) => {
      if (!petal) return;

      const data = petals[index];

      petal.position.y -=
        delta * data.speed * 0.32;

      petal.position.x +=
        Math.sin(time * 0.7 + data.phase) *
        delta *
        0.12;

      petal.rotation.x += delta * 0.6;
      petal.rotation.z += delta * 0.8;

      if (petal.position.y < -4) {
        petal.position.y = 4;
      }
    });
  });

  return (
    <group>
      {petals.map((petal, index) => (
        <mesh
          key={`petal-${index}`}
          ref={(element) => {
            refs.current[index] = element;
          }}
          position={[petal.x, petal.y, petal.z]}
          rotation={[0.3, petal.rotation, 0.5]}
          scale={[
            petal.scale * 1.5,
            petal.scale * 0.55,
            petal.scale,
          ]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#f18ab4"
            transparent
            opacity={0.8}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Cake({
  wished,
  onWish,
}: {
  wished: boolean;
  onWish: () => void;
}) {
  const cakeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cakeRef.current) return;

    const time = state.clock.elapsedTime;

    cakeRef.current.position.y =
      Math.sin(time * 1.05) * 0.025;

    cakeRef.current.rotation.y =
      Math.sin(time * 0.3) * 0.014;
  });

  return (
    <group
      ref={cakeRef}
      position={[0, 0.72, 0]}
      scale={0.58}
      onClick={(event) => {
        event.stopPropagation();

        if (!wished) {
          onWish();
        }
      }}
    >
      {/* Cake stand */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[2.48, 2.36, 0.11, 64]} />
        <meshStandardMaterial
          color="#f5dce8"
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, -0.64, 0]}>
        <cylinderGeometry args={[1.65, 1.42, 0.1, 64]} />
        <meshStandardMaterial
          color="#d39bb8"
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Bottom tier */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.82, 1.94, 0.72, 64]} />
        <meshStandardMaterial
          color="#e47ca9"
          roughness={0.45}
        />
      </mesh>

      {/* Bottom icing */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[1.88, 1.88, 0.15, 64]} />
        <meshStandardMaterial
          color="#fff4f8"
          roughness={0.25}
        />
      </mesh>

      {/* Bottom icing drips */}
      {[-1.35, -0.9, -0.45, 0, 0.45, 0.9, 1.35].map(
        (x, index) => (
          <mesh
            key={`drip-${index}`}
            position={[
              x,
              0.26 + (index % 2) * 0.035,
              1.49,
            ]}
            scale={[
              0.12,
              0.22 + (index % 3) * 0.055,
              0.12,
            ]}
          >
            <sphereGeometry args={[1, 18, 18]} />
            <meshStandardMaterial
              color="#fff4f8"
              roughness={0.25}
            />
          </mesh>
        )
      )}

      {/* Middle tier */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[1.42, 1.55, 0.68, 64]} />
        <meshStandardMaterial
          color="#ef94b9"
          roughness={0.44}
        />
      </mesh>

      <mesh position={[0, 1.07, 0]}>
        <cylinderGeometry args={[1.48, 1.48, 0.15, 64]} />
        <meshStandardMaterial
          color="#fff7fa"
          roughness={0.25}
        />
      </mesh>

      {/* Middle icing details */}
      {[-0.95, -0.48, 0, 0.48, 0.95].map(
        (x, index) => (
          <mesh
            key={`middle-drop-${index}`}
            position={[x, 0.98, 1.16]}
            scale={[
              0.09,
              0.2 + (index % 2) * 0.06,
              0.09,
            ]}
          >
            <sphereGeometry args={[1, 18, 18]} />
            <meshStandardMaterial
              color="#fff7fa"
              roughness={0.25}
            />
          </mesh>
        )
      )}

      {/* Top tier */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[1.04, 1.18, 0.55, 64]} />
        <meshStandardMaterial
          color="#e97eac"
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 1.64, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.14, 64]} />
        <meshStandardMaterial
          color="#fff8fb"
          roughness={0.23}
        />
      </mesh>

      {/* Cream rosettes */}
      {[
        [-1.28, 1.15, 0.55],
        [-0.78, 1.16, 0.92],
        [-0.26, 1.17, 1.08],
        [0.26, 1.17, 1.08],
        [0.78, 1.16, 0.92],
        [1.28, 1.15, 0.55],
        [-0.68, 1.72, 0.55],
        [0, 1.73, 0.78],
        [0.68, 1.72, 0.55],
      ].map((position, index) => (
        <mesh
          key={`cream-${index}`}
          position={position as [number, number, number]}
          scale={[0.19, 0.16, 0.19]}
        >
          <coneGeometry args={[1, 0.7, 24]} />
          <meshStandardMaterial
            color="#fff1f7"
            roughness={0.26}
          />
        </mesh>
      ))}

      {/* Flowers */}
      <CakeFlower
        position={[-0.82, 1.73, 0.63]}
        scale={0.72}
      />
      <CakeFlower
        position={[0.82, 1.73, 0.63]}
        scale={0.72}
      />
      <CakeFlower
        position={[-1.2, 1.13, 0.95]}
        scale={0.58}
      />
      <CakeFlower
        position={[1.2, 1.13, 0.95]}
        scale={0.58}
      />

      {/* Pearls */}
      {[
        [-1.3, 0.42, 1.48],
        [-0.9, 0.36, 1.68],
        [-0.45, 0.34, 1.78],
        [0, 0.33, 1.82],
        [0.45, 0.34, 1.78],
        [0.9, 0.36, 1.68],
        [1.3, 0.42, 1.48],
        [-0.9, 1.08, 1.28],
        [-0.45, 1.05, 1.38],
        [0, 1.04, 1.42],
        [0.45, 1.05, 1.38],
        [0.9, 1.08, 1.28],
      ].map((position, index) => (
        <mesh
          key={`pearl-${index}`}
          position={position as [number, number, number]}
          scale={0.085}
        >
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial
            color="#fff8fb"
            metalness={0.18}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Strawberries */}
      {[
        [-0.72, 1.91, 0.56],
        [0.72, 1.91, 0.56],
        [-1.15, 1.22, 0.96],
        [1.15, 1.22, 0.96],
      ].map((position, index) => (
        <group
          key={`berry-${index}`}
          position={position as [number, number, number]}
          scale={0.16}
        >
          <mesh scale={[0.85, 1.05, 0.85]}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial
              color="#e85d70"
              roughness={0.36}
            />
          </mesh>

          <mesh
            position={[0, 0.9, 0]}
            scale={[0.45, 0.12, 0.45]}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#658c63"
              roughness={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Heart topper */}
      <group position={[0, 2.02, 0.65]}>
        <Heart />
      </group>

      {/* Candles */}
      {[-0.55, 0, 0.55].map((x, index) => (
        <group
          key={`candle-${index}`}
          position={[x, 2.3, 0]}
        >
          <mesh>
            <cylinderGeometry args={[0.095, 0.095, 0.82, 24]} />
            <meshStandardMaterial
              color="#fff0f6"
              roughness={0.28}
            />
          </mesh>

          {/* diagonal stripe */}
          {[-0.23, 0, 0.23].map((y, stripe) => (
            <mesh
              key={stripe}
              position={[0, y, 0.098]}
              rotation={[0, 0, -0.5]}
            >
              <boxGeometry args={[0.075, 0.12, 0.018]} />
              <meshStandardMaterial
                color="#e77da8"
                roughness={0.3}
              />
            </mesh>
          ))}

          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.1, 12]} />
            <meshStandardMaterial
              color="#33242b"
              roughness={0.8}
            />
          </mesh>

          <CandleFlame
            wished={wished}
            index={index}
          />
        </group>
      ))}

      {!wished && (
        <pointLight
          position={[0, 2.95, 0.4]}
          intensity={3.2}
          distance={5.5}
        />
      )}
    </group>
  );
}

/* =========================================================
   SCENE 3 - CAKE
========================================================= */

function CakeScene({
  wished,
  onWish,
}: {
  wished: boolean;
  onWish: () => void;
}) {
  return (
    <>
      <ambientLight intensity={1.3} />

      <directionalLight
        position={[4, 7, 6]}
        intensity={4}
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={2.2}
        distance={12}
      />

      <pointLight
        position={[4, 2, 3]}
        intensity={1.8}
        distance={10}
      />

      <Float
        speed={0.7}
        rotationIntensity={0.025}
        floatIntensity={0.08}
      >
        <Cake
          wished={wished}
          onWish={onWish}
        />
      </Float>

      <SideFlowerBranch side="left" />
      <SideFlowerBranch side="right" />

      <PetalField />
      <StarField intense={wished} />
    </>
  );
}

/* =========================================================
   SCENE 1
========================================================= */

function IntroScene({
  started,
  onTeddyClick,
}: {
  started: boolean;
  onTeddyClick: () => void;
}) {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[4, 6, 6]}
        intensity={3.2}
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={2.5}
        distance={12}
      />

      <pointLight
        position={[4, 1, 2]}
        intensity={1.5}
        distance={10}
      />

      <Float
        speed={1.2}
        rotationIntensity={0.12}
        floatIntensity={0.3}
      >
        <group scale={0.7}>
          <Teddy
            started={started}
            onClick={onTeddyClick}
          />
        </group>
      </Float>

      <StarField />
    </>
  );
}

/* =========================================================
   SCENE 2
========================================================= */

function GiftScene({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 6, 6]}
        intensity={3}
      />

      <pointLight
        position={[-4, 3, 4]}
        intensity={3}
        distance={12}
      />

      <pointLight
        position={[4, 2, 3]}
        intensity={2}
        distance={10}
      />

      <Float
        speed={1}
        rotationIntensity={0.08}
        floatIntensity={0.25}
      >
        <GiftBox
          opened={opened}
          onOpen={onOpen}
        />
      </Float>

      <StarField intense={opened} />
    </>
  );
}

/* =========================================================
   BIRTHDAY CELEBRATION
========================================================= */

const celebrationParticles = [
  { symbol: "✦", x: "8%", y: "18%", delay: 0.1, size: 22 },
  { symbol: "✧", x: "18%", y: "32%", delay: 0.25, size: 18 },
  { symbol: "⭐", x: "27%", y: "12%", delay: 0.4, size: 20 },
  { symbol: "🌸", x: "38%", y: "25%", delay: 0.15, size: 24 },
  { symbol: "✨", x: "48%", y: "10%", delay: 0.5, size: 18 },
  { symbol: "💗", x: "61%", y: "20%", delay: 0.2, size: 20 },
  { symbol: "🌸", x: "73%", y: "14%", delay: 0.45, size: 24 },
  { symbol: "⭐", x: "87%", y: "25%", delay: 0.1, size: 20 },
  { symbol: "✨", x: "12%", y: "50%", delay: 0.35, size: 17 },
  { symbol: "💗", x: "24%", y: "68%", delay: 0.2, size: 19 },
  { symbol: "✦", x: "78%", y: "62%", delay: 0.3, size: 21 },
  { symbol: "🌸", x: "90%", y: "54%", delay: 0.15, size: 23 },
  { symbol: "⭐", x: "10%", y: "78%", delay: 0.5, size: 18 },
  { symbol: "✨", x: "32%", y: "85%", delay: 0.25, size: 18 },
  { symbol: "💗", x: "67%", y: "82%", delay: 0.4, size: 20 },
  { symbol: "🌸", x: "86%", y: "78%", delay: 0.2, size: 23 },
  { symbol: "✧", x: "4%", y: "42%", delay: 0.6, size: 16 },
  { symbol: "✦", x: "94%", y: "40%", delay: 0.35, size: 20 },
];

function BirthdayCelebration({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="celebration-scene">
      <motion.div
        className="celebration-flash"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      <div className="celebration-particles">
        {celebrationParticles.map((particle, index) => (
          <motion.div
            key={index}
            className="celebration-particle"
            style={{
              left: particle.x,
              top: particle.y,
              fontSize: particle.size,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0.45],
              scale: [0, 1.5, 1, 0.9],
              x:
                index % 2 === 0
                  ? [0, -25, 20, -10]
                  : [0, 25, -20, 10],
              y:
                index % 3 === 0
                  ? [30, -30, 15, -5]
                  : [-20, 25, -15, 10],
              rotate:
                index % 2 === 0
                  ? [0, 90, 180, 270]
                  : [0, -90, -180, -270],
            }}
            transition={{
              duration: 3.2,
              delay: particle.delay,
              ease: "easeOut",
            }}
          >
            {particle.symbol}
          </motion.div>
        ))}
      </div>

      <div className="central-burst">
        {Array.from({ length: 16 }).map((_, index) => (
          <motion.span
            key={index}
            className="burst-ray"
            style={{
              transform: `rotate(${index * 22.5}deg)`,
            }}
            initial={{
              scaleY: 0,
              opacity: 0,
            }}
            animate={{
              scaleY: [0, 1, 0.4],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.6,
              delay: 0.2 + index * 0.025,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="celebration-content"
        initial={{
          opacity: 0,
          scale: 0.65,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.35,
          type: "spring",
          stiffness: 80,
        }}
      >
        <motion.div
          className="celebration-small"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
        >
          ✦ TODAY IS YOUR DAY ✦
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.9,
            duration: 1,
          }}
        >
          HAPPY
          <br />
          BIRTHDAY
        </motion.h1>

        <motion.div
          className="celebration-name"
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1.35,
            duration: 1,
            type: "spring",
          }}
        >
          Anitta
        </motion.div>

        <motion.div
          className="celebration-divider"
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: "180px",
            opacity: 1,
          }}
          transition={{
            delay: 1.7,
            duration: 0.8,
          }}
        >
          ✦
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.9,
            duration: 0.8,
          }}
        >
          Today deserves a little extra magic. 💗
        </motion.p>

        {showButton && (
          <motion.button
            className="celebration-button"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onContinue}
          >
            Continue the Magic ✨
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="celebration-corner corner-left"
        initial={{
          opacity: 0,
          scale: 0,
          rotate: -30,
        }}
        animate={{
          opacity: 0.75,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 0.8,
          duration: 1,
        }}
      >
        🌸
      </motion.div>

      <motion.div
        className="celebration-corner corner-right"
        initial={{
          opacity: 0,
          scale: 0,
          rotate: 30,
        }}
        animate={{
          opacity: 0.75,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 1,
          duration: 1,
        }}
      >
        🌸
      </motion.div>
    </section>
  );
}




/* =========================================================
   SCENE 4 - LETTER
========================================================= */

function LetterScene({ onContinue }: { onContinue: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <section className={`letter-scene ${opened ? "letter-opened" : ""}`}>
      <div className="letter-stars">
        {Array.from({ length: 34 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 61) % 100}%`,
              animationDelay: `${(index % 8) * 0.35}s`,
              animationDuration: `${3 + (index % 5)}s`,
            }}
          >
            {index % 5 === 0 ? "✦" : "·"}
          </span>
        ))}
      </div>

      <motion.div
        className="letter-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="letter-eyebrow">✦ A little something from me ✦</div>
        {!opened && <h1>For You, Anitta 💌</h1>}
      </motion.div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            className="envelope-area"
            initial={{ opacity: 0, scale: 0.82, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.75 }}
          >
            <motion.button
              className="envelope"
              onClick={() => setOpened(true)}
              whileTap={{ scale: 0.94 }}
              aria-label="Open letter"
            >
              <div className="envelope-back" />

              <div className="envelope-paper">
                <span>♡</span>
              </div>

              <div className="envelope-flap" />
              <div className="envelope-front" />

              <div className="envelope-seal">♡</div>
            </motion.button>

            <motion.div
              className="envelope-hint"
              animate={{ opacity: [0.55, 1, 0.55], y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              Tap to open ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="letter-wrapper"
            initial={{ opacity: 0, scale: 0.88, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <div className="letter-card">
              <div className="letter-card-glow" />

              <div className="letter-content">
                <div className="letter-top">
                  <span>♡</span>
                  <span>A little note for you</span>
                  <span>♡</span>
                </div>

                <h2>Dear Anitta,</h2>

                <div className="letter-text">
                  <p>
                    Sometimes, the best friendships begin in places and
                    moments we never expect.
                  </p>

                  <p>
                    When I first met you at <strong>ISRO</strong>, I never
                    imagined that a simple meeting there would eventually turn
                    into such a beautiful friendship. We came from different
                    places, and one of the funniest challenges between us was
                    definitely the <strong>language barrier</strong>. 😄
                  </p>

                  <p>
                    At first, communicating wasn't always easy. Sometimes we
                    had to repeat things, explain them differently, or simply
                    understand each other through expressions and gestures.
                    But somehow, that barrier never stopped us from becoming
                    friends.
                  </p>

                  <p>And slowly, those small conversations became memories.</p>

                  <p>
                    From meeting at ISRO to spending time together, visiting
                    different places, laughing at random things, and creating
                    memories along the way, every experience became a little
                    chapter of our friendship.
                  </p>

                  <p>
                    Looking back, it's amazing how a friendship can grow from
                    something so unexpected. We didn't need to have everything
                    in common. We just enjoyed the time we spent together,
                    explored new places, and made memories that are worth
                    keeping.
                  </p>

                  <p>
                    As you step into another year of your life, I genuinely
                    hope you achieve everything you dream about in your{" "}
                    <strong>career and future</strong>. May you find amazing
                    opportunities, meet people who inspire you, and accomplish
                    things that make you truly proud of yourself.
                  </p>

                  <p>
                    There will be difficult days and unexpected turns, but I
                    hope you always believe in yourself, keep learning, keep
                    growing, and keep moving forward.
                  </p>

                  <p>
                    Maybe years from now, we'll look back and laugh about how
                    we first met at ISRO, how difficult our conversations
                    sometimes were because of the language barrier, and how
                    somehow we still became good friends and explored different
                    places together.
                  </p>

                  <p>Those are the memories worth keeping.</p>

                  <p className="letter-highlight">
                    May your future be brighter than you imagine, your career
                    more successful than you expect, and your life filled with
                    beautiful places, experiences, and memories.
                  </p>

                  <p>Keep dreaming. Keep growing. Keep exploring.</p>

                  <p>
                    And most importantly, <strong>keep being yourself.</strong>
                  </p>

                  <p className="letter-birthday">
                    <strong>Happy Birthday, Anitta! 🎂✨</strong>
                  </p>

                  <p>
                    I'm really glad our paths crossed at ISRO, and even more
                    glad that somewhere along the way, that meeting turned
                    into a friendship.
                  </p>

                  <p>
                    <strong>
                      Wishing you an amazing year ahead and an even more amazing
                      journey ahead of that.
                    </strong>
                  </p>

                  <div className="letter-signature">
                    <span>With warm wishes,</span>
                    <strong>Imran Alam</strong>
                    <span>🤍</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              className="surprise-button letter-continue"
              onClick={onContinue}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              See Our Memories 📸
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   PHOTO DATA
========================================================= */

const memories = [
  {
    image: "/images/anitta-01.jpeg",
    title: "A beautiful moment",
    message: "Some moments deserve to stay forever. ✨",
  },
  {
    image: "/images/anitta-02.jpeg",
    title: "That smile",
    message: "A smile that can brighten an ordinary day. 💗",
  },
  {
    image: "/images/anitta-03.jpeg",
    title: "One to remember",
    message: "Just another little memory worth keeping.",
  },
  {
    image: "/images/anitta-04.jpeg",
    title: "A little happiness",
    message: "Because the smallest moments can mean the most.",
  },
];

/* =========================================================
   SCENE 6 — FINAL MESSAGE
========================================================= */

function FinalScene() {
  const finalStars = Array.from({ length: 34 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    top: `${(index * 61) % 100}%`,
    delay: (index % 8) * 0.35,
    size: index % 5 === 0 ? 4 : 2,
  }));

  return (
    <section className="final-scene">
      <div className="final-orb final-orb-one" />
      <div className="final-orb final-orb-two" />

      <div className="final-stars" aria-hidden="true">
        {finalStars.map((star, index) => (
          <motion.span
            key={index}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.15, 0.85, 0.2],
              scale: [0.7, 1.4, 0.7],
            }}
            transition={{
              duration: 2.8 + (index % 4) * 0.5,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="final-birthday-decor" aria-hidden="true">
        <motion.div
          className="birthday-balloon balloon-one"
          animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>🎈</span>
        </motion.div>

        <motion.div
          className="birthday-balloon balloon-two"
          animate={{ y: [0, 14, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>🎈</span>
        </motion.div>

        <motion.div
          className="birthday-balloon balloon-three"
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>🎈</span>
        </motion.div>

        <motion.div
          className="birthday-gift gift-one"
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          🎁
        </motion.div>

        <motion.div
          className="birthday-gift gift-two"
          animate={{ y: [0, 7, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          🎁
        </motion.div>

        <div className="birthday-confetti confetti-one">✦</div>
        <div className="birthday-confetti confetti-two">✧</div>
        <div className="birthday-confetti confetti-three">•</div>
        <div className="birthday-confetti confetti-four">✦</div>
        <div className="birthday-confetti confetti-five">•</div>
        <div className="birthday-confetti confetti-six">✧</div>
      </div>

      <motion.div
        className="final-content"
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.div
          className="final-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          ✦ ONE LAST THING ✦
        </motion.div>

        <motion.div
          className="final-cake-icon"
          initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.55, duration: 0.8, type: "spring" }}
        >
          🎂
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
        >
          HAPPY BIRTHDAY
          <span>Anitta</span>
        </motion.h1>

        <motion.div
          className="final-divider"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "170px", opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          <span>✦</span>
        </motion.div>

        <motion.div
          className="final-message-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          <p>
            I'm really glad our paths crossed at <strong>ISRO</strong>, and
            even more glad that somewhere along the way, that meeting turned
            into a friendship.
          </p>

          <p>
            I hope this new chapter brings you <strong>happiness, success,
            beautiful places</strong> and countless reasons to smile.
          </p>

          <p className="final-wishes">
            Keep dreaming.<br />
            Keep growing.<br />
            Keep exploring. 🤍
          </p>
        </motion.div>

        <motion.div
          className="final-signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.8 }}
        >
          <span>With warm wishes,</span>
          <strong>Imran Alam</strong>
        </motion.div>

        <motion.div
          className="final-sparkle-line"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          ✦　🎈　✦　🎁　✦
        </motion.div>
      </motion.div>
    </section>
  );
}


/* =========================================================
   SCENE 5 — LITTLE MEMORIES
========================================================= */

function MemoryScene({ onContinue }: { onContinue: () => void }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const memory = memories[current];
  const isLast = current === memories.length - 1;

  const goNext = () => {
    if (isLast) {
      onContinue();
      return;
    }

    setDirection(1);
    setCurrent((value) => value + 1);
  };

  const goPrevious = () => {
    if (current === 0) return;

    setDirection(-1);
    setCurrent((value) => value - 1);
  };

  return (
    <section className="memories-scene-v2">
      <div className="memories-v2-stars">
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 43) % 100}%`,
              top: `${(index * 67) % 100}%`,
              animationDelay: `${(index % 9) * 0.4}s`,
            }}
          >
            {index % 4 === 0 ? "✦" : "·"}
          </span>
        ))}
      </div>

      <motion.div
        className="memories-v2-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="memory-v2-eyebrow">
          ✦ A few little memories ✦
        </div>
        <h2>
          Moments worth
          <br />
          remembering
        </h2>
        <p>Some moments, some smiles, one little collection. 🤍</p>
      </motion.div>

      <div className="memory-v2-stage">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={current}
            className="memory-v2-card"
            custom={direction}
            initial={{
              opacity: 0,
              x: direction * 70,
              rotate: direction * 3,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction * -70,
              rotate: direction * -3,
              scale: 0.94,
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="memory-v2-photo-wrap">
              <img
                src={memory.image}
                alt={`Anitta memory ${current + 1}`}
                className="memory-v2-photo"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="memory-v2-placeholder">
                <span>📸</span>
                <small>Add photo</small>
              </div>
              <div className="memory-v2-photo-shine" />
            </div>

            <div className="memory-v2-caption">
              <div className="memory-v2-caption-top">
                <span>✦</span>
                <span>{String(current + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}</span>
                <span>✦</span>
              </div>

              <h3>{memory.title}</h3>
              <p>{memory.message}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="memory-v2-controls">
        <motion.button
          className="memory-v2-arrow"
          onClick={goPrevious}
          disabled={current === 0}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous memory"
        >
          ←
        </motion.button>

        <div className="memory-v2-dots">
          {memories.map((_, index) => (
            <button
              key={index}
              className={`memory-v2-dot ${index === current ? "active" : ""}`}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              aria-label={`Go to memory ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          className="memory-v2-arrow"
          onClick={goNext}
          whileTap={{ scale: 0.9 }}
          aria-label={isLast ? "Continue" : "Next memory"}
        >
          {isLast ? "→" : "→"}
        </motion.button>
      </div>

      <motion.div
        className="memory-v2-swipe-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {isLast ? "One last thing awaits ✨" : "Tap the arrows to explore ✨"}
      </motion.div>

      {isLast && (
        <motion.button
          className="surprise-button memory-v2-continue"
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
        >
          One Last Thing ✨
        </motion.button>
      )}
    </section>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function Home() {
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  const [started, setStarted] = useState(false);

  const [giftOpened, setGiftOpened] =
    useState(false);

  const [cakeWished, setCakeWished] =
    useState(false);

  const handleStart = () => {
    setStarted(true);

    setTimeout(() => {
      setScene(2);
    }, 900);
  };

  const handleGiftOpen = () => {
    setGiftOpened(true);
  };

  const handleWish = () => {
    setCakeWished(true);
  };

  const handleContinue = () => {
    setScene(3);
  };

  return (
    <main className="birthday-page">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      {/* =================================================
          3D WORLD
      ================================================= */}

      {(scene === 1 ||
        (scene === 2 && !giftOpened) ||
        scene === 3) && (
        <div className="three-container">
          <Canvas
            camera={{
              position: [0, 0.2, 8],
              fov: 45,
            }}
            dpr={[1, 1.5]}
          >
            {scene === 1 && (
              <IntroScene
                started={started}
                onTeddyClick={handleStart}
              />
            )}

            {scene === 2 && !giftOpened && (
              <GiftScene
                opened={giftOpened}
                onOpen={handleGiftOpen}
              />
            )}

            {scene === 3 && (
              <CakeScene
                wished={cakeWished}
                onWish={handleWish}
              />
            )}
          </Canvas>
        </div>
      )}

      {/* =================================================
          SCENE 1
      ================================================= */}

      {scene === 1 && (
        <motion.div
          className="content"
          initial={{ opacity: 1 }}
          animate={{
            opacity: started ? 0 : 1,
          }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="eyebrow"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
            }}
          >
            ✦ A little something for you ✦
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              delay: 0.3,
            }}
          >
            Hey, Anitta...
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.8,
            }}
          >
           🎁 A little birthday surprise, just for you. 🎁
            <br />
            just for you. ✨
          </motion.p>

          {!started && (
            <motion.button
              className="surprise-button"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.4,
              }}
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={handleStart}
            >
              Open Your Surprise ✨
            </motion.button>
          )}
        </motion.div>
      )}

      {/* =================================================
          SCENE 2
      ================================================= */}

      {scene === 2 && !giftOpened && (
        <motion.div
          className="content gift-content"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div className="eyebrow">
            ✦ Something is waiting for you ✦
          </div>

          <h1>A little gift...</h1>

          <p>
            It has been waiting patiently
            <br />
            for you. 🎁
          </p>

          <div className="gift-hint">
            Tap the gift ✨
          </div>
        </motion.div>
      )}

      {scene === 2 && giftOpened && (
        <BirthdayCelebration
          onContinue={handleContinue}
        />
      )}

      {/* =================================================
          SCENE 4 - LETTER
      ================================================= */}

      {scene === 4 && (
        <LetterScene onContinue={() => setScene(5)} />
      )}

      {/* =================================================
          SCENE 5 - LITTLE MEMORIES
      ================================================= */}

      {scene === 5 && (
        <MemoryScene onContinue={() => setScene(6)} />
      )}


      {/* =================================================
          SCENE 6 - FINAL MESSAGE
      ================================================= */}

      {scene === 6 && <FinalScene />}

      {/* =================================================
          SCENE 3 - BIRTHDAY CAKE
      ================================================= */}

      {scene === 3 && (
        <motion.div
          className="content cake-content"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "auto",
            bottom: "3.5vh",
            width: "min(92vw, 760px)",
            margin: "0 auto",
            zIndex: 20,
            textAlign: "center",
            padding: "0 16px",
            boxSizing: "border-box",
          }}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          {!cakeWished ? (
            <>
              <div className="eyebrow">
                ✦ Make a little wish ✦
              </div>

              <h1>
                Make a Wish,
                <br />
                Anitta...
              </h1>

              <p>
                Close your eyes, make a wish,
                <br />
                and let the magic begin. ✨
              </p>

              <motion.button
                className="surprise-button"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.8,
                }}
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                onClick={handleWish}
              >
                Make a Wish ✨
              </motion.button>
            </>
          ) : (
            <>
              <div className="eyebrow">
                ✦ Wish made ✦
              </div>

              <h1>
                May it come true,
                <br />
                Anitta. 💗
              </h1>

              <p>
                The candles heard your wish. ✨
                <br />
                Now let the magic carry it into the stars.
              </p>

              <motion.button
                className="surprise-button"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1,
                }}
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setScene(4)}
              >
                There's a Letter for You 💌
              </motion.button>
            </>
          )}
        </motion.div>
      )}
    </main>
  );
}