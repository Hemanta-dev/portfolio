import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const SKILLS = [
  {
    name: "JavaScript",
    slug: "javascript",
    brandColor: "#F7DF1E",
    bgAlpha: 0.15,
  },
  {
    name: "TypeScript",
    slug: "typescript",
    brandColor: "#3178C6",
    bgAlpha: 0.15,
  },
  { name: "React", slug: "react", brandColor: "#61DAFB", bgAlpha: 0.12 },
  { name: "Next.js", slug: "nextdotjs", brandColor: "#ffffff", bgAlpha: 0.1 },
  { name: "Node.js", slug: "nodedotjs", brandColor: "#339933", bgAlpha: 0.15 },
  { name: "Python", slug: "python", brandColor: "#3776AB", bgAlpha: 0.15 },
  { name: "GraphQL", slug: "graphql", brandColor: "#E10098", bgAlpha: 0.15 },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    brandColor: "#4169E1",
    bgAlpha: 0.15,
  },
  { name: "Docker", slug: "docker", brandColor: "#2496ED", bgAlpha: 0.15 },
  { name: "Linux", slug: "linux", brandColor: "#FCC624", bgAlpha: 0.12 },
  { name: "Git", slug: "git", brandColor: "#F05032", bgAlpha: 0.15 },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    brandColor: "#326CE5",
    bgAlpha: 0.15,
  },
  { name: "Oracle", slug: "oracle", brandColor: "#F80000", bgAlpha: 0.15 },
  {
    name: "OpenSearch",
    slug: "opensearch",
    brandColor: "#005EB8",
    bgAlpha: 0.15,
  },
  { name: "Nginx", slug: "nginx", brandColor: "#009639", bgAlpha: 0.15 },
];

const INLINE_SVGS: Record<string, string> = {
  __wazuh__: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="#00A9E5" opacity="0.15"/>
    <text x="50" y="38" text-anchor="middle" font-family="Arial Black,sans-serif"
      font-size="22" font-weight="900" fill="#00A9E5">WAZUH</text>
    <path d="M20 58 L35 70 L50 52 L65 70 L80 52" stroke="#00A9E5"
      stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="75" r="4" fill="#00A9E5"/>
  </svg>`,
};

async function makeIconTexture(
  slug: string,
  brandColor: string,
  bgAlpha: number,
) {
  const SIZE = 512;

  try {
    let svgRaw =
      INLINE_SVGS[slug] ??
      (await fetch(`https://cdn.simpleicons.org/${slug}`).then((r) =>
        r.text(),
      ));

    const hasBrandFill =
      /fill="#(?!000000)[0-9a-fA-F]{6}"/i.test(svgRaw) ||
      /fill="(?!black|#000)[a-zA-Z0-9#()., ]+"/i.test(svgRaw);

    if (!hasBrandFill) {
      svgRaw = svgRaw
        .replace(/fill="#000(000)?"/gi, `fill="${brandColor}"`)
        .replace(/fill="black"/gi, `fill="${brandColor}"`);
      if (!svgRaw.includes("fill="))
        svgRaw = svgRaw.replace("<svg", `<svg fill="${brandColor}"`);
    }

    const blob = new Blob([svgRaw], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    return new Promise<THREE.CanvasTexture>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = SIZE;
        const ctx = canvas.getContext("2d")!;

        const half = SIZE / 2;
        const [r, g, b] = [
          brandColor.slice(1, 3),
          brandColor.slice(3, 5),
          brandColor.slice(5, 7),
        ].map((h) => parseInt(h, 16));

        const grad = ctx.createRadialGradient(
          half,
          half,
          SIZE * 0.02,
          half,
          half,
          half * 0.88,
        );
        grad.addColorStop(0, `rgba(${r},${g},${b},${bgAlpha * 2})`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},${bgAlpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(half, half, half, 0, Math.PI * 2);
        ctx.fill();

        const PAD = SIZE * 0.1;
        ctx.drawImage(img, PAD, PAD, SIZE - PAD * 2, SIZE - PAD * 2);

        URL.revokeObjectURL(url);
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.generateMipmaps = true;
        resolve(texture);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  } catch {
    return null;
  }
}

function spherePoints(n: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return [
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ] as [number, number, number];
  });
}

const LogoTag = ({
  texture,
  position,
  speed,
  phase,
}: {
  texture: THREE.CanvasTexture;
  position: [number, number, number];
  speed: number;
  phase: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.set(
      origin.x + Math.sin(t * speed + phase) * 0.45,
      origin.y + Math.cos(t * speed * 0.7 + phase) * 0.35,
      origin.z + Math.sin(t * speed * 0.5 + phase * 1.3) * 0.4,
    );
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.3, 1.3]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};

const LogoCloud = () => {
  const [items, setItems] = useState<(any | null)[]>(() =>
    Array(SKILLS.length).fill(null),
  );
  const pts = useMemo(() => spherePoints(SKILLS.length, 5.4), []);

  useEffect(() => {
    let cancelled = false;

    SKILLS.forEach(async (skill, i) => {
      const tex = await makeIconTexture(
        skill.slug,
        skill.brandColor,
        skill.bgAlpha,
      );
      if (!tex || cancelled) return;
      setItems((prev) => {
        const next = [...prev];
        next[i] = {
          id: i,
          texture: tex,
          position: pts[i],
          speed: 0.13 + (i % 6) * 0.03,
          phase: (i / SKILLS.length) * Math.PI * 2,
        };
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pts]);

  const cloudRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.elapsedTime * 0.04;
      cloudRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.08;
    }
  });

  return (
    <group ref={cloudRef}>
      {items.map((i) => i && <LogoTag key={i.id} {...i} />)}
    </group>
  );
};

const Scene3D = () => (
  <div className="absolute inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <LogoCloud />
    </Canvas>
  </div>
);

export default Scene3D;
