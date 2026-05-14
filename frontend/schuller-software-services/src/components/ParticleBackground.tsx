import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const config = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, area: 800 },
    },
    color: {
      value: ['#7dd8f0', '#40e0d0', '#167096'],
    },
    opacity: {
      value: { min: 0.1, max: 0.35 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#7dd8f0',
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none' as const,
      outModes: 'bounce' as const,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: {
        distance: 180,
        links: { opacity: 0.5 },
      },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

function ParticleBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      options={config}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default ParticleBackground;
